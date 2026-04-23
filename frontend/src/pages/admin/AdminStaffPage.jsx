import AdminUserManagement from './AdminUserManagement';

export default function AdminStaffPage() {
  return (
    <AdminUserManagement 
      title="Quản Lý Nhân Viên (Staff)" 
      subtitle="Quản lý đội ngũ nhân viên, theo dõi trạng thái và phân quyền hệ thống."
      targetRole="STAFF"
    />
  );
}
