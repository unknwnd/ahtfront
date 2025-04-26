import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Компонент свечения для эффекта глубины моря - скопирован с Home.tsx
const DeepGlow = ({ index }: { index: number }) => {
  // Разные параметры для разных экземпляров свечения
  const sizes = ['20vw', '15vw', '25vw', '18vw', '22vw'];
  
  // Сдвинуты на 30% ближе к низу экрана
  const positions = [
    { bottom: '-5%', left: '10%' },   // было 5%, сдвинуто ниже
    { bottom: '0%', left: '35%' },    // было 15%, сдвинуто ниже
    { bottom: '-7%', right: '15%' },  // было 8%, сдвинуто ниже
    { bottom: '5%', right: '30%' },   // было 20%, сдвинуто ниже
    { bottom: '-3%', left: '60%' }    // было 12%, сдвинуто ниже
  ];
  
  const colors = [
    'from-blue-500/10 via-cyan-400/15 to-transparent',
    'from-purple-500/10 via-indigo-400/15 to-transparent',
    'from-teal-500/10 via-blue-400/15 to-transparent',
    'from-blue-600/10 via-purple-400/15 to-transparent',
    'from-indigo-500/10 via-teal-400/15 to-transparent'
  ];

  // Анимация пульсации
  const pulseVariants = {
    initial: { opacity: 0.3, scale: 0.9 },
    animate: { 
      opacity: [0.3, 0.5, 0.3], 
      scale: [0.9, 1.1, 0.9],
      transition: { 
        duration: 6 + index, 
        ease: "easeInOut", 
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-t ${colors[index]} blur-[60px]`}
      style={{ 
        width: sizes[index],
        height: sizes[index],
        ...positions[index]
      }}
      initial="initial"
      animate="animate"
      variants={pulseVariants}
    />
  );
};

const SplashScreen: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [textIndex, setTextIndex] = useState<number>(0);
  const [hideLoader, setHideLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const textTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Рассчет общего времени анимации для более точного распределения загрузки
  const calculateTotalTime = () => {
    let totalTime = 0;
    
    // Уменьшаем общее время на 4 секунды (4000 мс): 3 секунды предыдущие + 1 секунда новая
    const timeReduction = 4000;
    
    // Время для отображения каждого текста
    for (const text of motivationTexts) {
      const wordCount = text.split(' ').length;
      // Основная формула расчета времени для текста
      const textTime = Math.max(3000, (wordCount / 3.3) * 1000);
      totalTime += textTime;
    }
    
    // Дополнительное время для последнего текста (множитель 1.5)
    const lastText = motivationTexts[motivationTexts.length - 1];
    const lastWordCount = lastText.split(' ').length;
    const lastTextTime = Math.max(3000, (lastWordCount / 3.3) * 1000);
    totalTime += lastTextTime * 0.5; // Дополнительные 50% для последнего текста
    
    // Задержка для появления кнопки + время анимации кнопки + дополнительные 0.3 секунды
    const buttonDelay = 700; // мс
    const buttonAnimationTime = 1400; // мс (duration в buttonAnimation)
    const additionalDelay = 300; // мс (запрошенная дополнительная задержка)
    
    totalTime += buttonDelay + buttonAnimationTime + additionalDelay;
    
    // Применяем снижение времени, но убеждаемся, что общее время не станет меньше 3 секунд
    return Math.max(3000, totalTime - timeReduction);
  };
  
  // Логотип приложения
  const logoImageUrl = "https://i.ibb.co/GBQrN2B/image.png";

  // Мотивационный текст для первого запуска
  // Рассчитан на среднюю скорость чтения 300 слов в минуту (примерно 5 слов в секунду)
  const motivationTexts = [
    "Помощь братьям нашим меньшим может быть простой и приятной.",
    "Вместе мы можем создать лучшие условия для животных в приютах.",
    "Даже небольшой вклад делает мир добрее и светлее.",
    "Технологии блокчейн делают благотворительность прозрачной и понятной для всех.",
    "Animal Helper — это сообщество единомышленников, где каждый может участвовать.",
    "Следите за своими пожертвованиями и видите реальные результаты помощи.",
    "Хотите присоединиться к нам и сделать доброе дело вместе?"
  ];

  useEffect(() => {
    // Отметим, что первый запуск уже был
    // Не сохраняем в localStorage если это тестовый режим
    if (window.location.pathname !== '/test-splash') {
      localStorage.setItem('hasVisitedAnimalHelper', 'true');
    }
    
    // Рассчитываем общее время для распределения прогресса
    const totalAnimationTime = calculateTotalTime();
    console.log(`Общее время анимации: ${totalAnimationTime/1000} секунд`);
    
    // Запускаем показ текста и анимацию прогресса
    startTextDisplay(totalAnimationTime);
    
    return () => {
      // Очищаем таймеры при размонтировании
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (textTimeoutRef.current) {
        clearTimeout(textTimeoutRef.current);
      }
    };
  }, []);

  // Функция для последовательного отображения текста
  const startTextDisplay = (totalTime: number) => {
    let currentIndex = 0;
    
    // Запускаем плавное заполнение прогресса на все время анимации
    const startTime = Date.now();
    const animateProgressOverTime = () => {
      if (hideLoader) return; // Останавливаем анимацию если загрузчик скрыт
      
      const elapsed = Date.now() - startTime;
      // Линейное заполнение до 100% за все время анимации
      const progress = Math.min(elapsed / totalTime * 100, 100);
      
      // Устанавливаем прогресс с плавной функцией для более естественного заполнения
      // Используем easeInOutQuad
      const easeProgress = progress < 50 
        ? 2 * Math.pow(progress / 100, 2) * 100
        : (1 - Math.pow(-2 * progress / 100 + 2, 2) / 2) * 100;
      
      setLoadingProgress(Math.floor(easeProgress));
      
      if (progress < 100) {
        requestAnimationFrame(animateProgressOverTime);
      } else {
        // Когда достигли 100%, ждем 300 мс и плавно скрываем загрузчик
        setTimeout(() => {
          // Плавное исчезновение загрузчика
          setHideLoader(true);
        }, 300);
      }
    };
    
    requestAnimationFrame(animateProgressOverTime);
    
    const showNextText = () => {
      if (currentIndex < motivationTexts.length) {
        setTextIndex(currentIndex);
        
        const text = motivationTexts[currentIndex];
        const wordCount = text.split(' ').length;
        // Скорость чтения: чуть медленнее - 200 слов в минуту -> ~3.3 слова в секунду
        const readTime = Math.max(3000, (wordCount / 3.3) * 1000); 
        
        // Увеличиваем время для последнего вопроса
        const displayTime = currentIndex === motivationTexts.length - 1 
          ? readTime * 1.5 
          : readTime;
        
        currentIndex++;
        
        if (currentIndex < motivationTexts.length) {
          // Показываем следующий текст через время, необходимое для прочтения
          textTimeoutRef.current = setTimeout(showNextText, displayTime);
        } else {
          // Показываем кнопку через РОВНО 0.7 секунды после последнего текста
          textTimeoutRef.current = setTimeout(() => {
            setShowButton(true);
            
            // Добавляем дополнительные 0.3 секунды после полного появления кнопки
            // Завершение загрузки и исчезновение загрузчика будет контролироваться
            // основной анимацией прогресса выше
          }, 700);
        }
      }
    };
    
    // Начинаем показывать тексты с нулевого прогресса
    setLoadingProgress(0);
    showNextText();
  };

  // Обработчик нажатия кнопки "Попробовать"
  const handleTryButtonClick = () => {
    // Отладочное сообщение
    console.log('Кнопка нажата, переходим на главную страницу');
    
    // Сохраняем флаг посещения, если это не тестовый режим
    if (window.location.pathname !== '/test-splash') {
      localStorage.setItem('hasVisitedAnimalHelper', 'true');
    }
    
    // Программно переходим на главную страницу с заменой истории
    navigate('/', { replace: true });
    
    // Обновляем страницу для гарантированного применения изменений
    // и сброса состояния приложения
    setTimeout(() => {
      console.log('Принудительное обновление страницы');
      window.location.href = '/';
    }, 100);
  };

  // Анимация для логотипа (точно как на главной странице)
  const logoAnimation: Variants = {
    initial: { opacity: 0.3, rotate: 30 },
    visible: { 
      opacity: [0.3, 0.5, 0.3], 
      rotate: 30,
      filter: ["brightness(0.3)", "brightness(0.4)", "brightness(0.3)"],
      transition: { 
        duration: 5, 
        ease: "easeInOut", 
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Анимация для текстов мотивации
  const textAnimation: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: {
        duration: 0.5
      }
    }
  };

  // Анимация для круга загрузки
  const circleAnimation = {
    hidden: {
      pathLength: 0,
      rotate: -90
    },
    visible: (progress: number) => ({
      pathLength: progress / 100,
      transition: { duration: 0.3, ease: "easeOut" }
    })
  };

  // Анимация для исчезновения загрузчика
  const loaderContainerAnimation = {
    visible: { opacity: 1, y: 0 },
    hidden: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Создаем глубокий черный фон, который переходит в свечение ближе к середине страницы вниз */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900"
        style={{
          background: "linear-gradient(to bottom, #000000 0%, #000000 60%, #111827 100%)"
        }}
      />
      
      {/* Эффект свечения из глубины */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Создаем пять случайных источников свечения, как на главной странице */}
        {[0, 1, 2, 3, 4].map((index) => (
          <DeepGlow key={index} index={index} />
        ))}
      </div>
      
      {/* Фоновый логотип в том же положении как на главной странице и с тем же поворотом */}
      <motion.div 
        className="absolute top-[-3.5%] left-[53%] transform -translate-x-1/2 w-[33.6vw] h-[33.6vw] md:w-[25.2vw] md:h-[25.2vw] z-0"
        variants={logoAnimation}
        initial="initial"
        animate="visible"
      >
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-black/20" 
            style={{
              backgroundImage: `url(${logoImageUrl})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: 'scale(1.05)',
              backgroundBlendMode: 'multiply',
              filter: 'contrast(1.1) brightness(0.3) drop-shadow(0 0 10px rgba(0,0,0,0.2))',
              mixBlendMode: 'normal'
            }}
          />
        </div>
      </motion.div>
      
      {/* Центральный контент */}
      <div className="max-w-4xl mx-auto px-5 py-12 relative z-10 min-h-screen flex flex-col justify-center items-center">
        {/* Мотивационный текст - адаптирован для мобильных устройств */}
        <div className="min-h-[180px] sm:min-h-[200px] flex items-center justify-center mb-8 sm:mb-16 w-[60%] mx-auto">
          <motion.p 
            key={textIndex}
            className="text-2xl sm:text-3xl md:text-4xl font-light text-white text-center px-2 sm:px-4 max-w-[90%]"
            variants={textAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {motivationTexts[textIndex]}
          </motion.p>
        </div>
        
        {/* Круг загрузки - смещён на 20% ниже и идет перед кнопкой */}
        <motion.div 
          className="mt-16 sm:mt-24 flex flex-col items-center translate-y-[20%]"
          variants={loaderContainerAnimation}
          initial="visible"
          animate={hideLoader ? "hidden" : "visible"}
        >
          <div className="relative w-14 sm:w-16 h-14 sm:h-16">
            {/* Фоновый круг */}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                className="stroke-gray-700" 
                fill="none" 
                strokeWidth="8"
              />
            </svg>
            
            {/* Прогресс круг */}
            <motion.svg 
              className="absolute top-0 left-0 w-full h-full -rotate-90" 
              viewBox="0 0 100 100"
              initial={{ rotate: -90 }}
            >
              <motion.circle 
                cx="50" 
                cy="50" 
                r="40" 
                className="stroke-gradient-circle" 
                style={{
                  stroke: 'url(#gradient)',
                  strokeLinecap: 'round'
                }}
                fill="none" 
                strokeWidth="8"
                custom={loadingProgress}
                variants={circleAnimation}
                initial="hidden"
                animate="visible"
              />
              
              {/* Градиент для круга */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF7E1D" /> {/* оранжевый */}
                  <stop offset="35%" stopColor="#121212" /> {/* черный */}
                  <stop offset="65%" stopColor="#FFFFFF" /> {/* белый */}
                  <stop offset="100%" stopColor="#8860d0" /> {/* лавандовый */}
                </linearGradient>
              </defs>
            </motion.svg>
            
            {/* Процент загрузки */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs sm:text-sm font-medium text-gray-300">{loadingProgress}%</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-3">Загрузка</p>
        </motion.div>
        
        {/* Кнопка "Попробовать" - теперь ниже шкалы загрузки */}
        <motion.div 
          className="mt-8 sm:mt-12 relative"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: {
                delay: 0.3, // Добавляем задержку 0.3 секунды после появления
                duration: 0.5,
                ease: "easeOut"
              }
            }
          }}
          initial="hidden"
          animate={showButton ? "visible" : "hidden"}
        >
          {/* Добавляем более явное свечение под кнопкой для привлечения внимания */}
          <motion.div 
            className="absolute -z-10 blur-xl rounded-full bg-gradient-to-r from-orange-500/50 via-gray-900/50 to-purple-500/50" 
            style={{ 
              width: '120%', 
              height: '150%', 
              top: '-25%', 
              left: '-10%'
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.button
            className="relative overflow-hidden rounded-full px-12 py-4 text-white text-base sm:text-lg font-medium group cursor-pointer"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 25px rgba(255, 126, 29, 0.4), 0 0 50px rgba(136, 96, 208, 0.3)" 
            }}
            whileTap={{ 
              scale: 0.95, 
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.4)" 
            }}
            // Добавляем анимацию привлечения внимания
            animate={{
              boxShadow: ["0 0 10px rgba(255, 126, 29, 0.3)", "0 0 20px rgba(136, 96, 208, 0.4)", "0 0 10px rgba(255, 126, 29, 0.3)"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            onClick={handleTryButtonClick}
            // Добавляем дополнительные события для надежности
            onTouchStart={handleTryButtonClick}
            onKeyPress={(e) => e.key === 'Enter' && handleTryButtonClick()}
            tabIndex={0}
            style={{
              background: "rgba(25, 30, 45, 0.9)",  // темный фон с прозрачностью
              backdropFilter: "blur(8px)",          // размытие фона
              border: "1px solid rgba(255, 255, 255, 0.2)" // тонкая рамка
            }}
          >
            {/* Градиентная полоса внизу кнопки */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(to right, #FF7E1D, #121212, #FFFFFF, #8860d0)",
                boxShadow: "0 0 8px rgba(136, 96, 208, 0.6)"
              }}
              initial={{ scaleX: 0.3, opacity: 0.6 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
            
            {/* Анимация наведения - градиентная заливка */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-500/40 via-gray-900/40 to-purple-500/40 z-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.span className="relative z-10">
              Попробовать
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Градиентная нижняя рамка */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(to right, #FF7E1D, #121212, #FFFFFF, #8860d0)",
          boxShadow: "0 0 10px rgba(255, 126, 29, 0.5), 0 0 20px rgba(136, 96, 208, 0.3)"
        }}
      />
    </div>
  );
};

export default SplashScreen; 