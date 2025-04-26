import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PawPrintIcon } from '../ui/icons';
import Button from '../ui/Button';
import { useTonConnect } from '../../hooks/useTonConnect';
import { useTheme } from '../../hooks/useTheme';
import { formatAddress } from '../../utils/formatters';

const Header: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const { connected, wallet, connect, disconnect } = useTonConnect();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Приюты', path: '/shelters' },
    { name: 'Голосования', path: '/voting' },
    { name: 'Кнопки', path: '/buttons' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
        ? `${theme === 'dark' 
          ? 'bg-dark-800/95 backdrop-blur-md shadow-depth-sm' 
          : 'bg-white/95 backdrop-blur-md shadow-depth-sm'}`
        : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center bg-brand-blue-dark rounded-full text-white shadow-primary-glow group-hover:shadow-lg transition-shadow duration-300">
            <PawPrintIcon className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-brand-blue-dark dark:text-white">PawToken</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors relative ${
                location.pathname === link.path 
                ? 'text-brand-blue-dark dark:text-primary-200' 
                : 'text-brand-blue-medium/80 hover:text-brand-blue-dark dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-blue-dark dark:bg-primary-300 rounded-full" />
              )}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          {connected && wallet ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className={`font-medium transition-colors ${
                  location.pathname === '/profile' 
                  ? 'text-brand-blue-dark dark:text-primary-200' 
                  : 'text-brand-blue-medium/80 hover:text-brand-blue-dark dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                Профиль
              </Link>
              <Button 
                variant="flat-primary" 
                size="sm" 
                onClick={disconnect}
              >
                {formatAddress(wallet.account.address)}
              </Button>
            </div>
          ) : (
            <Button 
              variant="flat-primary"
              size="sm"
              onClick={connect} 
            >
              Подключить кошелек
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 