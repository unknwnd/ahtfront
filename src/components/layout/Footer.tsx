import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  BuildingStorefrontIcon, 
  CheckBadgeIcon, 
  UserIcon 
} from '../ui/icons';

const navItems = [
  { 
    path: '/', 
    name: 'Главная', 
    icon: HomeIcon 
  },
  { 
    path: '/community', 
    name: 'Сообщество', 
    icon: BuildingStorefrontIcon 
  },
  { 
    path: '/voting', 
    name: 'Голосование', 
    icon: CheckBadgeIcon 
  },
  { 
    path: '/profile', 
    name: 'Профиль', 
    icon: UserIcon 
  }
];

const Footer = () => {
  return (
    <motion.footer 
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-white/40 dark:bg-dark-700/60
        backdrop-blur-lg
        border-t border-brand-blue-light/30 dark:border-dark-600
        shadow-lg w-full
        transition-colors duration-300
      "
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="w-full my-1">
        <ul className="grid grid-cols-4 h-16 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `h-full w-full flex flex-col items-center justify-center transition-all ${
                      isActive
                        ? 'text-brand-blue-dark dark:text-slate-50'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full mb-0 transition-all duration-200 ${isActive ? 'bg-brand-blue-light/10 dark:bg-slate-700/30 shadow-depth-sm' : 'bg-transparent hover:bg-brand-blue-light/10 dark:hover:bg-dark-700'}`}
                      >
                        <Icon className="w-5 h-5" />
                        {isActive && (
                          <motion.div
                            layoutId="footerIndicator"
                            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-brand-blue-dark dark:bg-slate-50 rounded-full"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                      </div>
                      <span className="text-xs font-medium">{item.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.footer>
  );
};

export default Footer; 