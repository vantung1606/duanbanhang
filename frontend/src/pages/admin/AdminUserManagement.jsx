import { useState, useEffect } from 'react';
import AdminDataGrid from '../../components/layout/admin/AdminDataGrid';
import { adminService } from '../../services/api/adminService';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, KeyRound, AlertTriangle } from 'lucide-react';

export default function AdminUserManagement({ title, subtitle, targetRole }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await adminService.getAllUsers();
        let allUsers = Array.isArray(data) ? data : (data?.users || []);
        
        // Filter by role if specified
        if (targetRole) {
          allUsers = allUsers.filter(u => u.roles && u.roles.includes(targetRole));
        }
        
        setUsers(allUsers);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [targetRole]);

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setIsResetModalOpen(true);
  };

  const confirmResetPassword = () => {
    // Audit Log logic here
    console.log(`[AUDIT LOG] Admin reset password for user: ${selectedUser.username}`);
    alert(`Đã gửi đường dẫn cấp lại mật khẩu tới email: ${selectedUser.email}`);
    setIsResetModalOpen(false);
  };

  const columns = [
    {
      header: 'Tài Khoản',
      accessor: 'user',
      render: (row) => (
        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 shrink-0 border border-slate-200">
            {row.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-800 truncate">{row.username}</p>
            <p className="text-xs font-medium text-slate-500 truncate">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Vai Trò',
      accessor: 'roles',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {(row.roles || ['USER']).map(r => (
            <span key={r} className={cn(
              "px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest whitespace-nowrap",
              r === 'ADMIN' ? 'bg-red-50 text-red-600' :
              r === 'MANAGER' ? 'bg-indigo-50 text-indigo-600' :
              r === 'STAFF' ? 'bg-emerald-50 text-emerald-600' :
              'bg-slate-100 text-slate-600'
            )}>
              {r}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Trạng Thái',
      accessor: 'active',
      render: (row) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap",
          row.active ? "bg-emerald-50 text-emerald-500 border border-emerald-100" : "bg-red-50 text-red-500 border border-red-100"
        )}>
          {row.active ? 'Hoạt Động' : 'Bị Khóa'}
        </span>
      )
    }
  ];

  return (
    <div className="w-full flex flex-col items-start pb-20">
      
      <AdminDataGrid 
        title={title}
        subtitle={subtitle}
        searchPlaceholder="Tìm kiếm tài khoản..."
        columns={columns}
        data={users}
        onAdd={() => alert("Mở form thêm mới")}
        onEdit={(row) => alert("Sửa thông tin: " + row.username)}
        onResetPassword={handleResetPassword}
        onDelete={(row) => alert("Xóa bản ghi: " + row.username)}
      />

      {/* Reset Password Modal */}
      <AnimatePresence>
        {isResetModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsResetModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full relative z-10"
            >
              <button 
                onClick={() => setIsResetModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <KeyRound className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-slate-800 mb-2">Cấp Lại Mật Khẩu</h3>
              <p className="text-sm font-medium text-slate-500 mb-6">
                Bạn có chắc chắn muốn tạo mật khẩu mới cho tài khoản <strong className="text-slate-800">{selectedUser?.username}</strong>? Hành động này sẽ vô hiệu hóa mật khẩu hiện tại của họ.
              </p>

              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl mb-8">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-amber-700 leading-relaxed">
                  Một bản ghi <strong>Audit Log</strong> sẽ được tạo tự động để lưu lại hành động can thiệp bảo mật này của bạn.
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsResetModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button 
                  onClick={confirmResetPassword}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-800/20 transition-colors"
                >
                  Xác Nhận Cấp Lại
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
