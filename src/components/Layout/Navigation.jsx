import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/',        label: 'Inicio',   emoji: '🏠' },
  { to: '/scanner', label: 'Escanear', emoji: '📷' },
  { to: '/guide',   label: 'Guía',     emoji: '♻️' },
  { to: '/bins',    label: 'Canecas',  emoji: '🗑️' },
  { to: '/info',    label: 'Info',     emoji: 'ℹ️' },
];

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="glass border-t border-gray-200/80 px-1 pt-1 pb-1">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {TABS.map(({ to, label, emoji }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all duration-200 btn-press min-w-[56px] ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'
                }`
              }
            >
              <span className="text-xl leading-none">{emoji}</span>
              <span className="text-[10px] font-semibold leading-none">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
