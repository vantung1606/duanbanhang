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
  Fingerprint,
  RefreshCcw,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { adminService } from '../services/api/adminService';
import { useTranslation } from 'react-i18next';

export default function AdminUsersPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [processingId, setProcessingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllUsers();
      setUsers(Array.isArray(data) ? data : (data?.users || []));
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    setProcessingId(userId);
    try {
      await adminService.updateUserStatus(userId, !currentStatus);
      setUsers(users.map(u => u.id === userId ? { ...u, active: !currentStatus } : u));
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredUsers = Array.isArray(users) ? users.filter(u => 
    (u.username?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
    (u.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            {t('admin.users.management_title')} <span className="text-primary-light">{t('admin.users.title_accent')}</span>
          </h1>
          <p className="text-slate-500 font-medium">{t('admin.users.subtitle')}</p>
        </div>
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchUsers}
            disabled={loading}
            className="p-4 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 hover:text-primary-light transition-all"
          >
            <RefreshCcw className={cn("w-5 h-5", loading && "animate-spin")} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-light to-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary-light/25 transition-all"
          >
            <UserPlus className="w-5 h-5" /> {t('admin.users.add_user')}
          </motion.button>
        </div>
      </motion.div>

      {/* User Search & Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex-1 group"
        >
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-primary-light transition-colors" />
          <input 
            type="text" 
            placeholder={t('admin.users.search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none px-16 py-5 rounded-[2rem] text-sm font-bold shadow-3d-soft focus:border-primary-light/50 transition-all text-slate-700 dark:text-white"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-white/10 px-8 py-4 shadow-3d-soft"
        >
           <div className="text-center px-4 border-r border-white/10">
              <p className="text-[10px] font-black uppercase text-slate-400">{t('admin.users.stats.total')}</p>
              <p className="text-xl font-black text-slate-800 dark:text-white">{users.length}</p>
           </div>
           <div className="text-center px-4 border-r border-white/10">
              <p className="text-[10px] font-black uppercase text-slate-400">{t('admin.users.stats.active')}</p>
              <p className="text-xl font-black text-emerald-500">{users.filter(u => u.active).length}</p>
           </div>
           <div className="text-center px-4">
              <p className="text-[10px] font-black uppercase text-slate-400">{t('admin.users.stats.banned')}</p>
              <p className="text-xl font-black text-red-500">{users.filter(u => !u.active).length}</p>
           </div>
        </motion.div>
      </div>

      {/* Users Table */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden shadow-3d-soft"
      >
        {loading && users.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-primary-light animate-spin" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-primary-light animate-pulse">{t('admin.users.loading.synchronizing')}</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-transparent">
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('admin.users.table.identity')}</th>
                <th className="px-10 py-8 text-[10px) font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('admin.users.table.authority')}</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('admin.users.table.status')}</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('admin.users.table.registry')}</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('admin.users.table.operations')}</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user, idx) => (
                  <motion.tr 
                    key={user.id} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-white/80 dark:hover:bg-white/[0.03] transition-colors border-b border-slate-100 dark:border-white/5 last:border-0"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-light/20 to-indigo-500/20 flex items-center justify-center font-black text-primary-light border border-primary-light/10 shadow-sm group-hover:scale-110 transition-transform">
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
                         {(user.roles || []).map(r => (
                           <span key={r} className={cn(
                             "px-3 py-1.5 rounded-lg text-[8px] font-black tracking-widest uppercase border transition-all",
                             r === 'ADMIN' ? "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]" :
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
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                          user.active ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                        )}
                      >
                         <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", user.active ? "bg-emerald-500" : "bg-red-500")} />
                         {user.active ? t('admin.users.stats.active') : t('admin.users.stats.banned')}
                      </motion.div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-slate-600 dark:text-gray-300">Verified System</span>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Identity Hash Valid</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                         <motion.button 
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.9 }}
                           className="w-10 h-10 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/20 flex items-center justify-center hover:bg-primary-light hover:text-white transition-all shadow-sm"
                         >
                            <Edit3 className="w-4 h-4" />
                         </motion.button>
                         <motion.button 
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.9 }}
                           disabled={processingId === user.id}
                           onClick={() => handleToggleStatus(user.id, user.active)}
                           className={cn(
                             "w-10 h-10 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/20 flex items-center justify-center transition-all shadow-sm",
                             user.active ? "hover:bg-red-500" : "hover:bg-emerald-500",
                             "hover:text-white"
                           )}
                         >
                            {processingId === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                             (user.active ? <Ban className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />)}
                         </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}

