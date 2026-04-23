import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/admin/AdminLayout';
import ManagerLayout from './layouts/manager/ManagerLayout';
import StaffLayout from './layouts/staff/StaffLayout';
import CustomerLayout from './layouts/customer/CustomerLayout';

// Home Pages
import NeuralynHome from './pages/customer/NeuralynHome';
import Catalog from './pages/customer/Catalog';
import ProductDetail from './pages/customer/ProductDetail';
import CustomerHome from './pages/customer/CustomerHome';
import OrderSuccessPage from './pages/customer/OrderSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import CartSidebar from './components/customer/CartSidebar';
import CheckoutPage from './pages/customer/CheckoutPage';
import ProfilePage from './pages/customer/ProfilePage';
import StaffOrdersPage from './pages/StaffOrdersPage';
import StaffOrderDetailPage from './pages/StaffOrderDetailPage';
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminManagersPage from './pages/admin/AdminManagersPage';
import AdminStaffPage from './pages/admin/AdminStaffPage';
import ManagerPromotionsPage from './pages/ManagerPromotionsPage';
import ManagerCategoriesPage from './pages/ManagerCategoriesPage';
import ManagerLogsPage from './pages/ManagerLogsPage';
import StaffOrdersListPage from './pages/StaffOrdersListPage';
import StaffAnalyticsPage from './pages/StaffAnalyticsPage';
import StaffReportsPage from './pages/StaffReportsPage';
import ManagerProductsPage from './pages/ManagerProductsPage';
import ShopperHubPage from './pages/customer/ShopperHubPage';
import ShopperProfilePage from './pages/customer/ShopperProfilePage';

// Auth Pages
import AuthPage from './pages/auth/AuthPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Mock Pages for each role
const AdminHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Admin Hub</h1><div className="h-64 rounded-3xl bg-primary-light/10 border-2 border-dashed border-primary-light/30 flex items-center justify-center font-bold text-primary-light">System Control Room Mockup</div></div>;
const ManagerHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Manager Insights</h1><div className="h-64 rounded-3xl bg-indigo-500/10 border-2 border-dashed border-indigo-500/30 flex items-center justify-center font-bold text-indigo-500">Business Reports Mockup</div></div>;
const StaffHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Staff Operations</h1><div className="h-64 rounded-3xl bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 flex items-center justify-center font-bold text-emerald-500">Active Tasks Mockup</div></div>;

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CartSidebar />
      <Routes>
        {/* Admin Section */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminCustomersPage />} />
          <Route path="staff" element={<AdminStaffPage />} />
          <Route path="managers" element={<AdminManagersPage />} />
          <Route path="products" element={<ManagerProductsPage />} />
          <Route path="categories" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">Quản Lý Danh Mục (Đang Phát Triển)</div>} />
          <Route path="orders" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">Quản Lý Đơn Hàng (Đang Phát Triển)</div>} />
          <Route path="warranties" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">Quản Lý Bảo Hành (Đang Phát Triển)</div>} />
          <Route path="logs" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">Nhật Ký Hệ Thống (Đang Phát Triển)</div>} />
          <Route path="settings" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">Cài Đặt Hệ Thống (Đang Phát Triển)</div>} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Manager Section */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<ManagerDashboardPage />} />
          <Route path="sales" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-white/10 rounded-[3rem]">Sales Reports Module Soon</div>} />
          <Route path="categories" element={<ManagerCategoriesPage />} />
          <Route path="promotions" element={<ManagerPromotionsPage />} />
          <Route path="logs" element={<ManagerLogsPage />} />
          <Route path="*" element={<Navigate to="/manager" replace />} />
        </Route>

        {/* Staff Section */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffOrdersPage />} />
          <Route path="analytics" element={<StaffAnalyticsPage />} />
          <Route path="reports" element={<StaffReportsPage />} />
          <Route path="orders" element={<StaffOrdersListPage />} />
          <Route path="order/:id" element={<StaffOrderDetailPage />} />
          <Route path="inventory" element={<ManagerProductsPage />} />
          <Route path="deliveries" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-white/10 rounded-[3rem]">Deliveries Module Soon</div>} />
          <Route path="history" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-white/10 rounded-[3rem]">Action History Module Soon</div>} />
          <Route path="*" element={<Navigate to="/staff" replace />} />
        </Route>

        {/* Landing Page (Standalone) */}
        <Route path="/home" element={<NeuralynHome />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<OrderSuccessPage />} />
        <Route path="/shop/app" element={<CustomerLayout />}>
          <Route index element={<ShopperHubPage />} />
          <Route path="me" element={<ShopperProfilePage />} />
          <Route path="*" element={<Navigate to="/shop/app" replace />} />
        </Route>

        <Route path="/account" element={<Navigate to="/shop/app/me" replace />} />
        <Route path="/profile" element={<Navigate to="/shop/app/me" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Root Redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
