import { NavLink } from 'react-router-dom';
import { Home, Star, TrendingUp, Calendar } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/popular', label: 'Popular', icon: Star, end: false },
  { to: '/top-rated', label: 'Top Rated', icon: TrendingUp, end: false },
  { to: '/upcoming', label: 'Upcoming', icon: Calendar, end: false },
];

export default function Sidebar() {
  return (
    <aside className="w-[220px] min-h-screen bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="7" height="7" rx="1.5" fill="white" />
            <rect x="11" y="2" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6" />
            <rect x="2" y="11" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6" />
            <rect x="11" y="11" width="7" height="7" rx="1.5" fill="white" />
          </svg>
        </div>
        <span className="font-bold text-[17px] text-gray-900 tracking-tight">MovieHub</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
