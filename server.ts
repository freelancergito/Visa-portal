import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("visa_portal.db");
const JWT_SECRET = process.env.JWT_SECRET || "vfs-secret-key-2026";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    passport_no TEXT NOT NULL,
    visa_type TEXT NOT NULL,
    destination TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    centre TEXT NOT NULL,
    appointment_date TEXT NOT NULL,
    appointment_time TEXT NOT NULL,
    status TEXT DEFAULT 'Scheduled',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Seed Admin if not exists
const adminEmail = "admin@vfsglobal.com";
const existingAdmin = db.prepare("SELECT * FROM users WHERE email = ?").get(adminEmail);
if (!existingAdmin) {
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)").run(
    "System Admin",
    adminEmail,
    hashedPassword,
    "admin"
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Auth Middleware ---
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  const isAdmin = (req: any, res: any, next: any) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
    next();
  };

  // --- API Routes ---

  // Auth
  app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const result = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, hashedPassword);
      res.json({ success: true, userId: result.lastInsertRowid });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Applications
  app.post("/api/applications", authenticate, (req: any, res) => {
    const { passport_no, visa_type, destination } = req.body;
    const result = db.prepare("INSERT INTO applications (user_id, passport_no, visa_type, destination) VALUES (?, ?, ?, ?)")
      .run(req.user.id, passport_no, visa_type, destination);
    res.json({ success: true, id: result.lastInsertRowid });
  });

  app.get("/api/applications/my", authenticate, (req: any, res) => {
    const apps = db.prepare("SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC").all(req.user.id);
    res.json(apps);
  });

  // Appointments
  app.post("/api/appointments", authenticate, (req: any, res) => {
    const { centre, appointment_date, appointment_time } = req.body;
    const result = db.prepare("INSERT INTO appointments (user_id, centre, appointment_date, appointment_time) VALUES (?, ?, ?, ?)")
      .run(req.user.id, centre, appointment_date, appointment_time);
    res.json({ success: true, id: result.lastInsertRowid });
  });

  app.get("/api/appointments/my", authenticate, (req: any, res) => {
    const appointments = db.prepare("SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date ASC").all(req.user.id);
    res.json(appointments);
  });

  // Admin Routes
  app.get("/api/admin/stats", authenticate, isAdmin, (req, res) => {
    const userCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'user'").get() as any;
    const appCount = db.prepare("SELECT COUNT(*) as count FROM applications").get() as any;
    const pendingApps = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'Pending'").get() as any;
    const appointmentCount = db.prepare("SELECT COUNT(*) as count FROM appointments").get() as any;
    res.json({
      users: userCount.count,
      applications: appCount.count,
      pending: pendingApps.count,
      appointments: appointmentCount.count
    });
  });

  app.get("/api/admin/applications", authenticate, isAdmin, (req, res) => {
    const apps = db.prepare(`
      SELECT a.*, u.name as user_name, u.email as user_email 
      FROM applications a 
      JOIN users u ON a.user_id = u.id 
      ORDER BY a.created_at DESC
    `).all();
    res.json(apps);
  });

  app.patch("/api/admin/applications/:id", authenticate, isAdmin, (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE applications SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ success: true });
  });

  app.get("/api/admin/users", authenticate, isAdmin, (req, res) => {
    const users = db.prepare("SELECT id, name, email, role FROM users").all();
    res.json(users);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
