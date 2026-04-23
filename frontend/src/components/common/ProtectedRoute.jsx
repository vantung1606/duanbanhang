import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * ProtectedRoute – chặn truy cập nếu chưa đăng nhập.
 * Nếu chưa login → chuyển về /login (lưu lại URL hiện tại để redirect sau khi login)
 * Nếu đã login nhưng không đúng role → chuyển về trang chính của role đó
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Chưa login → về /login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Đã login, kiểm tra role nếu có yêu cầu
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Điều hướng về trang đúng với role
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'MANAGER') return <Navigate to="/manager" replace />;
    if (user.role === 'STAFF') return <Navigate to="/staff" replace />;
    return <Navigate to="/shop/app" replace />;
  }

  return children;
}
