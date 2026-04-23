import AdminUserManagement from './AdminUserManagement';

export default function AdminManagersPage() {
  return (
    <AdminUserManagement 
      title="Quản Lý Quản Trị Viên (Manager)" 
      subtitle="Quản lý danh sách các tài khoản cấp Quản lý, phân quyền và cấp lại mật khẩu."
      targetRole="MANAGER"
    />
  );
}
