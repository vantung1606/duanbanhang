import AdminUserManagement from './AdminUserManagement';

export default function AdminCustomersPage() {
  return (
    <AdminUserManagement 
      title="Quản Lý Người Dùng (Khách Hàng)" 
      subtitle="Quản lý danh sách khách hàng, thông tin liên hệ và trạng thái hoạt động."
      targetRole="USER"
    />
  );
}
