import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Компонент для автоматического сброса позиции прокрутки при навигации.
 * Сбрасывает скролл вверх страницы при каждом изменении маршрута.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Сбрасываем позицию прокрутки вверх при изменении маршрута
    window.scrollTo(0, 0);
    
    // Также сбрасываем позицию прокрутки для всех элементов с переполнением
    const scrollableElements = document.querySelectorAll('.scrollable');
    scrollableElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.scrollTop = 0;
      }
    });
  }, [pathname]);

  return null; // Компонент не рендерит ничего в DOM
};

export default ScrollToTop; 