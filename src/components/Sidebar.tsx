import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Calendar,
  KeyRound,
  Users,
  FileText,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'ダッシュボード', icon: LayoutDashboard, exact: true },
  { to: '/search', label: '検索', icon: Search },
  { to: '/reservation', label: '鍵予約', icon: Calendar },
  { to: '/keys/register', label: '鍵登録', icon: KeyRound },
  { to: '/users', label: 'ユーザー管理', icon: Users },
  { to: '/log', label: 'ログ', icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="bg-white border-r border-[#e5e8ed] flex flex-col h-screen w-[240px] shrink-0 sticky top-0">
      <div className="flex items-center gap-2 p-6 border-b border-[#e5e8ed]">
        <KeyRound className="text-[#2663eb] shrink-0" size={28} />
        <div>
          <p className="font-bold text-[#17171c] text-[20px] leading-tight">カギバン</p>
          <p className="text-[#8c949e] text-[11px]">管理者用</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-colors ${
                isActive
                  ? 'bg-[#2663eb] text-white'
                  : 'text-[#4d5466] hover:bg-[#f2f5f5]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} className={isActive ? 'text-white' : 'text-[#4d5466]'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
