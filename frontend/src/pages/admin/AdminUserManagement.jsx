import { useState, useEffect } from 'react';
import AdminDataGrid from '../../components/layout/admin/AdminDataGrid';
import { adminService } from '../../services/api/adminService';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../components/common/Toast';
import { X, KeyRound, AlertTriangle, UserPlus, Mail, Lock, User, ToggleRight, Check, Shield, Trash2, Edit3 } from 'lucide-react';

// Move ModalLayout outside to prevent re-mounting on every keystroke
const ModalLayout = ({ isOpen, onClose, children, icon: Icon, title, subtitle, colorClass = "indigo" }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full relative z-10 overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-6", 
            colorClass === "red" ? "bg-red-50 text-red-500" : 
            colorClass === "emerald" ? "bg-emerald-50 text-emerald-500" : 
            "bg-indigo-50 text-indigo-600")}>
            <Icon className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-black text-slate-800 mb-2">{title}</h3>
          {subtitle && <p className="text-sm font-medium text-slate-500 mb-6">{subtitle}</p>}

          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function AdminUserManagement({ title, subtitle, targetRole }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { addToast } = useToast();
  
  const [formLoading, setFormLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const [addForm, setAddForm] = useState({
    username: '',
    email: '',
    password: '',
    roles: targetRole ? [targetRole] : ['USER'],
    enabled: true
  });

  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    roles: [],
    active: true
  });

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

  useEffect(() => {
    fetchUsers();
  }, [targetRole]);

  const handleAddNew = () => {
    setAddForm({
      username: '',
      email: '',
      password: '',
      roles: targetRole ? [targetRole] : ['USER'],
      enabled: true
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      roles: user.roles || [],
      active: user.active
    });
    setIsEditModalOpen(true);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setNewPassword('');
    setIsResetModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await adminService.createUser(addForm);
      await fetchUsers();
      setIsAddModalOpen(false);
      addToast('Thêm người dùng thành công!', 'success');
    } catch (error) {
      addToast('Lỗi: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await adminService.updateUser(selectedUser.id, editForm);
      await fetchUsers();
      setIsEditModalOpen(false);
      addToast('Cập nhật thông tin thành công!', 'success');
    } catch (error) {
      addToast('Lỗi: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const confirmDelete = async () => {
    setFormLoading(true);
    try {
      await adminService.deleteUser(selectedUser.id);
      await fetchUsers();
      setIsDeleteModalOpen(false);
      addToast('Đã xóa người dùng vĩnh viễn!', 'success');
    } catch (error) {
      addToast('Lỗi: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const confirmResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      alert('Mật khẩu phải ít nhất 6 ký tự');
      return;
    }
    setFormLoading(true);
    try {
      await adminService.resetPassword(selectedUser.id, newPassword);
      // Audit Log logic here (Backend handled or frontend log)
      console.log(`[AUDIT LOG] Admin reset password for user: ${selectedUser.username}`);
      addToast(`Đã cấp lại mật khẩu cho ${selectedUser.username}`, 'success');
      setIsResetModalOpen(false);
    } catch (error) {
      addToast('Lỗi: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setFormLoading(false);
    }
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
        onAdd={handleAddNew}
        onEdit={handleEdit}
        onResetPassword={handleResetPassword}
        onDelete={handleDelete}
      />

      {/* Add User Modal */}
      <ModalLayout 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        icon={UserPlus}
        title="Thêm Người Dùng Mới"
        subtitle="Điền đầy đủ thông tin để cấp tài khoản mới."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Tên Đăng Nhập</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required
                className="w-full bg-slate-50 border-none px-12 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-500/20 transition-all"
                placeholder="username"
                value={addForm.username}
                onChange={e => setAddForm({...addForm, username: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required
                type="email"
                className="w-full bg-slate-50 border-none px-12 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-500/20 transition-all"
                placeholder="example@mail.com"
                value={addForm.email}
                onChange={e => setAddForm({...addForm, email: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Mật Khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required
                type="password"
                className="w-full bg-slate-50 border-none px-12 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-500/20 transition-all"
                placeholder="••••••••"
                value={addForm.password}
                onChange={e => setAddForm({...addForm, password: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-colors"
            >
              Hủy
            </button>
            <button 
              disabled={formLoading}
              type="submit"
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-800/20 transition-all disabled:opacity-50"
            >
              {formLoading ? 'Đang tạo...' : 'Tạo Tài Khoản'}
            </button>
          </div>
        </form>
      </ModalLayout>

      {/* Edit User Modal */}
      <ModalLayout 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        icon={Edit3}
        title="Chỉnh Sửa Thông Tin"
        subtitle={`Cập nhật thông tin cho ${selectedUser?.username}`}
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required
                type="email"
                className="w-full bg-slate-50 border-none px-12 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-500/20 transition-all"
                value={editForm.email}
                onChange={e => setEditForm({...editForm, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Trạng Thái</label>
            <button 
              type="button"
              onClick={() => setEditForm({...editForm, active: !editForm.active})}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all",
                editForm.active ? "border-emerald-500/20 bg-emerald-50/30 text-emerald-700" : "border-red-500/20 bg-red-50/30 text-red-700"
              )}
            >
              <span className="text-sm font-bold">{editForm.active ? "Hoạt Động" : "Bị Khóa"}</span>
              <div className={cn(
                "w-10 h-5 rounded-full relative transition-colors",
                editForm.active ? "bg-emerald-500" : "bg-red-400"
              )}>
                <div className={cn(
                  "w-3 h-3 bg-white rounded-full absolute top-1 transition-all",
                  editForm.active ? "right-1" : "left-1"
                )} />
              </div>
            </button>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-colors"
            >
              Hủy
            </button>
            <button 
              disabled={formLoading}
              type="submit"
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-800/20 transition-all disabled:opacity-50"
            >
              {formLoading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
            </button>
          </div>
        </form>
      </ModalLayout>

      {/* Reset Password Modal */}
      <ModalLayout 
        isOpen={isResetModalOpen} 
        onClose={() => setIsResetModalOpen(false)}
        icon={KeyRound}
        title="Cấp Lại Mật Khẩu"
        subtitle={`Bạn đang cấp lại mật khẩu cho tài khoản ${selectedUser?.username}`}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Mật Khẩu Mới</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="password"
                className="w-full bg-slate-50 border-none px-12 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-500/20 transition-all"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-amber-700 leading-relaxed">
              Hành động này sẽ thay đổi mật khẩu hiện tại của người dùng. Một bản ghi <strong>Audit Log</strong> sẽ được tạo.
            </p>
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              onClick={() => setIsResetModalOpen(false)}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-colors"
            >
              Hủy
            </button>
            <button 
              disabled={formLoading}
              onClick={confirmResetPassword}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-800/20 transition-colors disabled:opacity-50"
            >
              {formLoading ? 'Đang cập nhật...' : 'Xác Nhận'}
            </button>
          </div>
        </div>
      </ModalLayout>

      {/* Delete Confirmation Modal */}
      <ModalLayout 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        icon={Trash2}
        title="Xóa Tài Khoản"
        subtitle={`Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản ${selectedUser?.username}?`}
        colorClass="red"
      >
        <div className="space-y-6">
          <div className="p-4 bg-red-50 rounded-2xl">
            <p className="text-xs font-bold text-red-600 leading-relaxed">
              Cảnh báo: Hành động này không thể hoàn tác. Mọi dữ liệu liên quan đến người dùng này có thể bị ảnh hưởng.
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-colors"
            >
              Hủy
            </button>
            <button 
              disabled={formLoading}
              onClick={confirmDelete}
              className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 transition-colors disabled:opacity-50"
            >
              {formLoading ? 'Đang xóa...' : 'Xác Nhận Xóa'}
            </button>
          </div>
        </div>
      </ModalLayout>

    </div>
  );
}
