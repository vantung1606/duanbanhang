import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  KeyRound,
  Filter
} from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function AdminDataGrid({ 
  title, 
  subtitle,
  columns, 
  data, 
  onAdd, 
  onEdit, 
  onDelete, 
  onResetPassword,
  searchPlaceholder = "Tìm kiếm..."
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col w-full"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs font-medium text-slate-400 mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative group w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50/80 hover:bg-slate-100 focus:bg-slate-100 border-none px-10 py-2.5 rounded-full text-sm font-bold text-slate-700 placeholder:text-slate-400 transition-all outline-none"
            />
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shrink-0">
            <Filter className="w-4 h-4" />
          </button>
          {onAdd && (
            <button 
              onClick={onAdd}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 rounded-full text-sm font-bold text-white shadow-lg shadow-slate-800/20 hover:bg-slate-900 transition-colors shrink-0 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Thêm Mới
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="pb-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  {col.header}
                </th>
              ))}
              <th className="pb-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 text-right">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="group hover:bg-slate-50/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="py-4 px-4 border-b border-slate-50 text-sm font-semibold text-slate-700">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                <td className="py-4 px-4 border-b border-slate-50 text-right relative">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === rowIndex ? null : rowIndex)}
                    className="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenu === rowIndex && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 p-2 z-50 flex flex-col gap-1">
                      {onEdit && (
                        <button 
                          onClick={() => { onEdit(row); setActiveMenu(null); }}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-colors"
                        >
                          <Edit3 className="w-4 h-4" /> Sửa Thông Tin
                        </button>
                      )}
                      {onResetPassword && (
                        <button 
                          onClick={() => { onResetPassword(row); setActiveMenu(null); }}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-colors"
                        >
                          <KeyRound className="w-4 h-4" /> Cấp Lại Mật Khẩu
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => { onDelete(row); setActiveMenu(null); }}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Xóa Bản Ghi
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="py-12 text-center text-slate-400 font-medium text-sm">
            Không tìm thấy dữ liệu nào.
          </div>
        )}
      </div>
      
      {/* Pagination Placeholder */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
        <span className="text-xs font-bold text-slate-400">Đang hiển thị {data.length} trên {data.length} kết quả</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors">Trước</button>
          <button className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white shadow-md shadow-slate-800/20">1</button>
          <button className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors">Sau</button>
        </div>
      </div>

    </motion.div>
  );
}
