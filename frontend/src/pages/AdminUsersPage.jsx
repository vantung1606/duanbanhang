import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Edit3, 
  Ban, 
  CheckCircle,
  MoreVertical,
  ChevronDown,
  UserPlus,
  Mail,
  Fingerprint
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock user data for Admin portal
    const mockUsers = [
      { id: 1, username: 'admin_root', email: 'root@techchain.com', roles: ['ADMIN'], active: true, registeredAt: '2025-01-01' },
      { id: 2, username: 'marcus_staff', email: 'marcus@techchain.com', roles: ['STAFF'], active: true, registeredAt: '2025-02-15' },
      { id: 3, username: 'sarah_mgr', email: 'sarah@techchain.com', roles: ['MANAGER'], active: true, registeredAt: '2025-03-20' },
      { id: 4, username: 'john_customer', email: 'john@gmail.com', roles: ['USER'], active: true, registeredAt: '2025-04-10' },
      { id: 5, username: 'bad_bot', email: 'bot@spam.com', roles: ['USER'], active: false, registeredAt: '2025-04-16' },
    ];
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Account <span className="text-primary-light">Management</span>
          </h1>
          <p className="text-slate-500 font-medium">Configure global user roles, access levels, and security status.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-primary-light text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary-light/20 hover:scale-105 active:scale-95 transition-all">
          <UserPlus className="w-5 h-5" /> Add Master User
        </button>
      </div>

      {/* User Search & Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-primary-light transition-colors" />
          <input 
            type="text" 
            placeholder="Search by username, email, or role..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 outline-none px-16 py-5 rounded-[2rem] text-sm font-bold shadow-sm focus:border-primary-light/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-4 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/20 dark:border-white/10 px-8 py-4">
           <div className="text-center px-4 border-r border-white/10">
              <p className="text-[10px] font-black uppercase text-slate-400">Total</p>
              <p className="text-xl font-black text-slate-800 dark:text-white">{users.length}</p>
           </div>
           <div className="text-center px-4 border-r border-white/10">
              <p className="text-[10px] font-black uppercase text-slate-400">Active</p>
              <p className="text-xl font-black text-emerald-500">{users.filter(u => u.active).length}</p>
           </div>
           <div className="text-center px-4">
              <p className="text-[10px] font-black uppercase text-slate-400">Banned</p>
              <p className="text-xl font-black text-red-500">{users.filter(u => !u.active).length}</p>
           </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[3rem] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity</th>
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Authority</th>
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Registry</th>
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Operations</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((user) => (
                <motion.tr 
                  key={user.id} 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group hover:bg-white/10 dark:hover:bg-white/[0.03] transition-colors border-b border-white/5 last:border-0"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-light/20 to-indigo-500/20 flex items-center justify-center font-black text-primary-light border border-primary-light/10">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-slate-800 dark:text-white">{user.username}</p>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Mail className="w-3 h-3" />
                          <span className="text-[10px] font-bold">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-wrap gap-2">
                       {user.roles.map(r => (
                         <span key={r} className={cn(
                           "px-3 py-1.5 rounded-lg text-[8px] font-black tracking-widest uppercase border",
                           r === 'ADMIN' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                           r === 'MANAGER' ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" :
                           r === 'STAFF' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                           "bg-slate-500/10 text-slate-500 border-slate-500/20"
                         )}>
                            {r}
                         </span>
                       ))}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      user.active ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                    )}>
                       <div className={cn("w-1.5 h-1.5 rounded-full", user.active ? "bg-emerald-500" : "bg-red-500")} />
                       {user.active ? "Active" : "Banned"}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{user.registeredAt}</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Verified Meta</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                       <button className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-light hover:text-white transition-all">
                          <Edit3 className="w-4 h-4" />
                       </button>
                       <button className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                          {user.active ? <Ban className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
