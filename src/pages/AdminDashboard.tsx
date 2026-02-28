import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LayoutDashboard, Users, FileText, Calendar, LogOut, Check, X, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("applications");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchStats();
    fetchApplications();
  }, [navigate]);

  const fetchStats = async () => {
    const res = await fetch("/api/admin/stats", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    const data = await res.json();
    setStats(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
  }, [activeTab]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ status }),
    });
    fetchApplications();
    fetchStats();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-vfs-blue text-white flex flex-col">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-xl font-bold tracking-tight">Admin Portal</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "dashboard" ? 'bg-vfs-gold text-vfs-blue' : 'hover:bg-white/10'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-semibold">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab("applications")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "applications" ? 'bg-vfs-gold text-vfs-blue' : 'hover:bg-white/10'}`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-semibold">Applications</span>
          </button>
          <button 
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "users" ? 'bg-vfs-gold text-vfs-blue' : 'hover:bg-white/10'}`}
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Users</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-vfs-blue capitalize">{activeTab}</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-bold text-vfs-blue">System Admin</p>
              <p className="text-xs text-slate-400">admin@vfsglobal.com</p>
            </div>
            <div className="w-10 h-10 bg-vfs-gold rounded-full flex items-center justify-center text-vfs-blue font-bold">
              SA
            </div>
          </div>
        </header>

        {activeTab === "dashboard" && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Total Users</p>
              <h3 className="text-4xl font-bold text-vfs-blue">{stats.users}</h3>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Applications</p>
              <h3 className="text-4xl font-bold text-vfs-blue">{stats.applications}</h3>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Pending</p>
              <h3 className="text-4xl font-bold text-vfs-blue">{stats.pending}</h3>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Appointments</p>
              <h3 className="text-4xl font-bold text-vfs-blue">{stats.appointments}</h3>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Applicant</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Passport</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-vfs-blue">{app.user_name}</p>
                      <p className="text-xs text-slate-400">{app.user_email}</p>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-slate-600">{app.passport_no}</td>
                    <td className="px-8 py-6 text-sm font-medium text-slate-600">{app.visa_type} to {app.destination}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                        app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => updateStatus(app.id, "Approved")}
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => updateStatus(app.id, "Rejected")}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "users" && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6 font-bold text-vfs-blue">{user.name}</td>
                    <td className="px-8 py-6 text-sm text-slate-600">{user.email}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
