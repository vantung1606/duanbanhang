import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/admin/AdminLayout';
import ManagerLayout from './layouts/manager/ManagerLayout';
import StaffLayout from './layouts/staff/StaffLayout';
import CustomerLayout from './layouts/customer/CustomerLayout';

// Mock Pages for each role
const AdminHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Admin Hub</h1><div className="h-64 rounded-3xl bg-primary-light/10 border-2 border-dashed border-primary-light/30 flex items-center justify-center font-bold text-primary-light">System Control Room Mockup</div></div>;
const ManagerHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Manager Insights</h1><div className="h-64 rounded-3xl bg-indigo-500/10 border-2 border-dashed border-indigo-500/30 flex items-center justify-center font-bold text-indigo-500">Business Reports Mockup</div></div>;
const StaffHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Staff Operations</h1><div className="h-64 rounded-3xl bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 flex items-center justify-center font-bold text-emerald-500">Active Tasks Mockup</div></div>;
const CustomerHome = () => <div className="space-y-4"><h1 className="text-4xl font-black text-slate-800 dark:text-white">Shop Tech</h1><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="h-48 rounded-3xl bg-rose-500/10 border-2 border-dashed border-rose-500/30 flex items-center justify-center font-bold text-rose-500">Featured Mobile</div><div className="h-48 rounded-3xl bg-rose-500/10 border-2 border-dashed border-rose-500/30 flex items-center justify-center font-bold text-rose-500">Featured Laptop</div><div className="h-48 rounded-3xl bg-rose-500/10 border-2 border-dashed border-rose-500/30 flex items-center justify-center font-bold text-rose-500">New Audio</div></div></div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Section */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Manager Section */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<ManagerHome />} />
          <Route path="*" element={<Navigate to="/manager" replace />} />
        </Route>

        {/* Staff Section */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffHome />} />
          <Route path="*" element={<Navigate to="/staff" replace />} />
        </Route>

        {/* Customer/Public Section */}
        <Route path="/shop" element={<CustomerLayout />}>
          <Route index element={<CustomerHome />} />
          <Route path="*" element={<Navigate to="/shop" replace />} />
        </Route>

        {/* Root Redirect */}
        <Route path="/" element={<Navigate to="/shop" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
