import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { PawPrintIcon, HeartIcon, ArrowRightIcon } from '../components/ui/icons';

const ButtonDemo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => {
    setIsLoading(prev => !prev);
    if (!isLoading) {
      // Автоматически выключить состояние загрузки через 2 секунды
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="title-lg text-center mb-12">Демонстрация стилей кнопок</h1>

      {/* Плоские кнопки с эффектом глубины (Flat Design) */}
      <section className="card mb-10">
        <h2 className="title-md">Кнопки в стиле Flat Design</h2>
        <p className="text-brand-blue-medium dark:text-dark-300 mb-6">
          Эти кнопки имеют эффект глубины и анимацию нажатия, характерные для Flat Design.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="flat-primary" 
            leftIcon={<PawPrintIcon />}
          >
            Помочь приюту
          </Button>
          
          <Button 
            variant="flat-secondary"
            rightIcon={<ArrowRightIcon />}
          >
            Голосовать
          </Button>
          
          <Button 
            variant="flat-primary" 
            isLoading={isLoading}
            onClick={toggleLoading}
          >
            {isLoading ? 'Загрузка...' : 'Нажми на меня'}
          </Button>
          
          <Button 
            variant="flat-secondary" 
            disabled
          >
            Недоступно
          </Button>
        </div>
      </section>

      {/* Основные варианты кнопок */}
      <section className="card mb-10">
        <h2 className="title-md">Основные варианты</h2>
        <p className="text-brand-blue-medium dark:text-dark-300 mb-6">
          Стандартные стили кнопок для различных действий.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="primary">Основная</Button>
          <Button variant="secondary">Вторичная</Button>
          <Button variant="outline">Контурная</Button>
          <Button variant="ghost">Прозрачная</Button>
          <Button variant="danger">Опасная</Button>
          <Button 
            variant="primary" 
            leftIcon={<HeartIcon />}
          >
            С иконкой
          </Button>
        </div>
      </section>

      {/* Размеры кнопок */}
      <section className="card mb-10">
        <h2 className="title-md">Размеры кнопок</h2>
        <p className="text-brand-blue-medium dark:text-dark-300 mb-6">
          Кнопки доступны в трех размерах для различных сценариев использования.
        </p>
        
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="flat-primary" size="sm">Маленькая</Button>
          <Button variant="flat-primary" size="md">Средняя</Button>
          <Button variant="flat-primary" size="lg">Большая</Button>
        </div>
      </section>

      {/* Состояния кнопок */}
      <section className="card">
        <h2 className="title-md">Состояния кнопок</h2>
        <p className="text-brand-blue-medium dark:text-dark-300 mb-6">
          Кнопки имеют различные состояния: обычное, при наведении, при нажатии, загрузка, отключено.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card-sm">
            <h3 className="text-brand-blue-dark dark:text-dark-100 font-medium mb-3">Загрузка</h3>
            <Button 
              variant="primary" 
              isLoading={isLoading}
              onClick={toggleLoading}
            >
              {isLoading ? 'Загрузка...' : 'Показать загрузку'}
            </Button>
          </div>
          
          <div className="card-sm">
            <h3 className="text-brand-blue-dark dark:text-dark-100 font-medium mb-3">Отключенное состояние</h3>
            <Button 
              variant="primary" 
              disabled
            >
              Недоступная кнопка
            </Button>
          </div>
          
          <div className="card-sm">
            <h3 className="text-brand-blue-dark dark:text-dark-100 font-medium mb-3">На всю ширину</h3>
            <Button 
              variant="flat-secondary" 
              fullWidth
            >
              Кнопка на всю ширину
            </Button>
          </div>
          
          <div className="card-sm">
            <h3 className="text-brand-blue-dark dark:text-dark-100 font-medium mb-3">С иконками</h3>
            <Button 
              variant="outline" 
              leftIcon={<PawPrintIcon />}
              rightIcon={<ArrowRightIcon />}
            >
              Между иконками
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonDemo; 