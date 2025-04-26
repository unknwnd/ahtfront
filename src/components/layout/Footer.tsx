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
    path: '/shelters', 
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
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-800/95 backdrop-blur-md border-t border-brand-blue-light/20 dark:border-dark-700 shadow-depth"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="max-w-5xl mx-auto">
        <ul className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="h-full">
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => 
                    `h-full flex flex-col items-center justify-center transition-all ${
                      isActive 
                        ? 'text-brand-blue-dark dark:text-brand-blue-light' 
                        : 'text-brand-blue-medium/60 hover:text-brand-blue-medium dark:text-gray-400 dark:hover:text-gray-200'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className={`
                        relative flex items-center justify-center w-10 h-10 rounded-full mb-1
                        transition-all duration-200
                        ${isActive 
                          ? 'bg-brand-blue-light/20 dark:bg-brand-blue-dark/40 shadow-depth-sm' 
                          : 'bg-transparent hover:bg-brand-blue-light/10 dark:hover:bg-dark-700'}
                      `}>
                        <Icon className="w-5 h-5" />
                        {isActive && (
                          <motion.div 
                            layoutId="footerIndicator"
                            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-brand-blue-dark dark:bg-brand-blue-light rounded-full"
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