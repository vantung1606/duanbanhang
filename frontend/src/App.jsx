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
import FloatingContact from './components/customer/FloatingContact';
import StaffOrdersPage from './pages/staff/StaffOrdersPage';
import StaffOrderDetailPage from './pages/staff/StaffOrderDetailPage';
import ManagerDashboardPage from './pages/manager/ManagerDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminManagersPage from './pages/admin/AdminManagersPage';
import AdminStaffPage from './pages/admin/AdminStaffPage';
import AdminBlogManagementPage from './pages/admin/AdminBlogManagementPage';
import AdminServicesManagementPage from './pages/admin/AdminServicesManagementPage';
import AdminAboutManagementPage from './pages/admin/AdminAboutManagementPage';
import AdminContactManagementPage from './pages/admin/AdminContactManagementPage';
import AdminHomeManagementPage from './pages/admin/AdminHomeManagementPage';
import ManagerPromotionsPage from './pages/manager/ManagerPromotionsPage';
import ManagerCategoriesPage from './pages/manager/ManagerCategoriesPage';
import ManagerLogsPage from './pages/manager/ManagerLogsPage';
import StaffOrdersListPage from './pages/staff/StaffOrdersListPage';
import StaffAnalyticsPage from './pages/staff/StaffAnalyticsPage';
import StaffReportsPage from './pages/staff/StaffReportsPage';
import ManagerProductsPage from './pages/manager/ManagerProductsPage';
import AdminAttributesPage from './pages/admin/AdminAttributesPage';
import AdminBrandsPage from './pages/admin/AdminBrandsPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import ShopperHubPage from './pages/customer/ShopperHubPage';
import AboutUs from './pages/customer/AboutUs';
import Services from './pages/customer/Services';
import Blog from './pages/customer/Blog';
import Contact from './pages/customer/Contact';

// Auth
import ProtectedRoute from './components/common/ProtectedRoute';
import ToastContainer from './components/common/Toast';

// Mock Pages for each role
const AdminHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Admin Hub</h1><div className="h-64 rounded-3xl bg-primary-light/10 border-2 border-dashed border-primary-light/30 flex items-center justify-center font-bold text-primary-light">System Control Room Mockup</div></div>;
const ManagerHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Manager Insights</h1><div className="h-64 rounded-3xl bg-indigo-500/10 border-2 border-dashed border-indigo-500/30 flex items-center justify-center font-bold text-indigo-500">Business Reports Mockup</div></div>;
const StaffHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Staff Operations</h1><div className="h-64 rounded-3xl bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 flex items-center justify-center font-bold text-emerald-500">Active Tasks Mockup</div></div>;

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastContainer />
      <CartSidebar />
      <FloatingContact />
      <Routes>
        {/* Admin Section */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminCustomersPage />} />
          <Route path="staff" element={<AdminStaffPage />} />
          <Route path="managers" element={<AdminManagersPage />} />
          <Route path="products" element={<ManagerProductsPage />} />
          <Route path="categories" element={<ManagerCategoriesPage />} />
          <Route path="attributes" element={<AdminAttributesPage />} />
          <Route path="brands" element={<AdminBrandsPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
          <Route path="orders" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">Quản Lý Đơn Hàng (Đang Phát Triển)</div>} />
          <Route path="warranties" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">Quản Lý Bảo Hành (Đang Phát Triển)</div>} />
          <Route path="logs" element={<ManagerLogsPage />} />
          <Route path="website/home" element={<AdminHomeManagementPage />} />
          <Route path="website/about" element={<AdminAboutManagementPage />} />
          <Route path="website/services" element={<AdminServicesManagementPage />} />
          <Route path="website/blog" element={<AdminBlogManagementPage />} />
          <Route path="website/contact" element={<AdminContactManagementPage />} />
          <Route path="settings" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">Cài Đặt Hệ Thống (Đang Phát Triển)</div>} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Manager Section */}
        <Route path="/manager" element={<ProtectedRoute allowedRoles={['MANAGER', 'ADMIN']}><ManagerLayout /></ProtectedRoute>}>
          <Route index element={<ManagerDashboardPage />} />
          <Route path="sales" element={<div className="p-10 text-center font-black uppercase tracking-widest text-slate-400 border-2 border-dashed border-white/10 rounded-[3rem]">Sales Reports Module Soon</div>} />
          <Route path="categories" element={<ManagerCategoriesPage />} />
          <Route path="promotions" element={<ManagerPromotionsPage />} />
          <Route path="logs" element={<ManagerLogsPage />} />
          <Route path="*" element={<Navigate to="/manager" replace />} />
        </Route>

        {/* Staff Section */}
        <Route path="/staff" element={<ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}><StaffLayout /></ProtectedRoute>}>
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
        <Route path="/about" element={<AboutUs />} />
        <Route path="/support" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
