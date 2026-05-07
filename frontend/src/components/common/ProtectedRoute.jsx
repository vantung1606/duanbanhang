import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * ProtectedRoute – chặn truy cập nếu chưa đăng nhập.
 * Nếu chưa login → chuyển về /login (lưu lại URL hiện tại để redirect sau khi login)
 * Nếu đã login nhưng không đúng role → chuyển về trang chính của role đó
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, token } = useAuthStore();
  const location = useLocation();

  // Log for debugging
  console.log('ProtectedRoute Check:', { isAuthenticated, hasToken: !!token, userRole: user?.role, path: location.pathname });

  // Chưa login hoặc thiếu token → về trang chủ
  if ((!isAuthenticated || !user) && !localStorage.getItem('duongdiy-auth')) {
    console.log('Redirecting to Home: Not authenticated');
    return <Navigate to="/" replace />;
  }

  // Đã login, kiểm tra role nếu có yêu cầu
  const currentUser = user || JSON.parse(localStorage.getItem('duongdiy-auth') || 'null')?.state?.user;
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const userRole = currentUser.role?.toUpperCase();
  const normalizedAllowedRoles = allowedRoles?.map(r => r.toUpperCase());

  if (normalizedAllowedRoles && !normalizedAllowedRoles.includes(userRole)) {
    console.log('Redirecting based on role mismatch:', { userRole, normalizedAllowedRoles });
    // Điều hướng về trang đúng với role
    if (userRole === 'ADMIN') return <Navigate to="/admin" replace />;
    if (userRole === 'MANAGER') return <Navigate to="/manager" replace />;
    if (userRole === 'STAFF') return <Navigate to="/staff" replace />;
    return <Navigate to="/home" replace />;
  }

  return children;
}
