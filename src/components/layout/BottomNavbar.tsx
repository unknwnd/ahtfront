import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Главная', icon: 'home' },
  { path: '/shelters', label: 'Комьюнити', icon: 'shelter' },
  { path: '/voting', label: 'Голосования', icon: 'vote' },
  { path: '/profile', label: 'Профиль', icon: 'profile' },
];

// Компонент иконки
const NavIcon = ({ icon, isActive }: { icon: string; isActive: boolean }) => {
  const activeClass = isActive ? 'text-brand-blue-dark' : 'text-dark-300';
  
  const renderIcon = () => {
    switch (icon) {
      case 'home':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${activeClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'shelter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${activeClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'vote':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${activeClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'profile':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${activeClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return renderIcon();
};

const BottomNavbar = () => {
  const location = useLocation();
  
  return (
    <motion.nav 
      className="bottom-nav"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <ul className="flex w-full justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <li key={item.path} className="w-1/4">
              <Link
                to={item.path}
                className="flex flex-col items-center justify-center py-1"
              >
                <div className={`${isActive ? 'text-brand-blue-dark' : 'text-dark-300'}`}>
                  <NavIcon icon={item.icon} isActive={isActive} />
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'font-medium text-brand-blue-dark' : 'text-dark-300'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="w-6 h-1 bg-brand-blue-dark rounded-full mt-1"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default BottomNavbar; 