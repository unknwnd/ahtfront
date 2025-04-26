import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTonConnect } from '../hooks/useTonConnect';
import { useTMA } from '../hooks/useTMA';
import GradientButton from '../components/ui/GradientButton';
import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';

// Если у вас есть новый логотип в PNG формате, раскомментируйте эту строку
// import logoPng from '../assets/images/logo.png';

// Компонент свечения для эффекта глубины моря
const DeepGlow = ({ index }: { index: number }) => {
  // Разные параметры для разных экземпляров свечения
  const sizes = ['20vw', '15vw', '25vw', '18vw', '22vw'];
  const positions = [
    { bottom: '5%', left: '10%' },
    { bottom: '15%', left: '35%' },
    { bottom: '8%', right: '15%' },
    { bottom: '20%', right: '30%' },
    { bottom: '12%', left: '60%' }
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

const Home = () => {
  const { isConnected, connect } = useTonConnect();
  const { isReady } = useTMA();
  const navigate = useNavigate();
  
  // Ref для основного контейнера (для эффекта скролла)
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Хук для отслеживания скролла
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Трансформация значений скролла для анимации логотипа
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [30, 45]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1.4, 1.3]);

  // useEffect для отслеживания готовности TMA
  useEffect(() => {
    if (isReady) {
      console.log('Telegram Mini App готово к использованию');
      // Здесь можно выполнить код, который должен запускаться только в контексте TMA
    }
  }, [isReady]);

  // Refs для анимации при скроллинге
  const manifestRef = useRef(null);
  const tokenStatsRef = useRef(null);
  const votingStatsRef = useRef(null);
  const holdersRef = useRef(null);

  // Анимация счетчиков
  const [animatedStats, setAnimatedStats] = useState({
    totalSupply: 0,
    purchased: 0,
    holders: 0,
    nftIssued: 0,
    sheltersInVoting: 0,
    sheltersHelped: 0
  });

  // Анимация счетчиков токенов
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        ...prev,
        // totalSupply больше не анимируется, так как указан статично как 1T
        purchased: Math.min(prev.purchased + 2000, 540000),
        holders: Math.min(prev.holders + 50, 3250),
        nftIssued: Math.min(prev.nftIssued + 5, 450),
        sheltersInVoting: Math.min(prev.sheltersInVoting + 1, 24),
        sheltersHelped: Math.min(prev.sheltersHelped + 1, 16)
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Обработчик клика по кнопке
  const handleButtonClick = () => {
    if (!isConnected) {
      connect();
    }
  };

  // Переход на страницу профиля
  const navigateToProfile = () => {
    navigate('/profile');
  };

  // Анимация появления (улучшенная на 30%)
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.04, // +30% от 0.8
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  // Анимация для заголовков (улучшенная на 30%)
  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.78, // +30% от 0.6
        ease: "easeOut"
      }
    }
  };

  // Анимация для чисел статистики (улучшенная на 30%)
  const countUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.65, // +30% от 0.5
        ease: "easeOut"
      }
    }
  };

  // URL изображения для фона (прямая ссылка на изображение)
  const logoImageUrl = "https://i.ibb.co/GBQrN2B/image.png";

  // Простая анимация всплывания для текста заголовка (улучшенная на 30%)
  const simplePopupVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: (delay = 0) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.91, // +30% от 0.7
        delay,
        ease: "easeOut"
      }
    })
  };

  return (
    <PageTransition>
      <div 
        ref={containerRef} 
        className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden"
      >
        {/* Эффект свечения из глубины */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Создаем пять случайных источников свечения */}
          {[0, 1, 2, 3, 4].map((index) => (
            <DeepGlow key={index} index={index} />
          ))}
        </div>
        
        {/* Фоновый логотип с эффектом скролла */}
        <motion.div 
          className="absolute top-[1.5%] right-[10%] w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] z-0"
          style={{
            y: logoY,
            rotate: logoRotate,
            scale: logoScale,
          }}
        >
          <div className="relative w-full h-full">
            {/* Логотип с затемнением */}
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
        
        <div className="max-w-4xl mx-auto px-5 py-12 relative z-10">
          {/* Заголовок и подзаголовок с простой анимацией всплывания */}
          <div className="mb-24 mt-8 md:mt-16">
            {/* Верхний мини-заголовок */}
            <motion.div 
              className="mb-6 text-gray-300 text-xs uppercase tracking-widest"
              variants={simplePopupVariants}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
            >
              Blockchain Charity Platform
            </motion.div>
            
            {/* Основной заголовок Animal */}
            <motion.div 
              className="mb-2 text-5xl md:text-7xl font-light tracking-tight leading-tight"
              variants={simplePopupVariants}
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
            >
              Animal
            </motion.div>
            
            {/* Основной заголовок Helper */}
            <motion.div 
              className="mb-10 text-5xl md:text-7xl font-light tracking-tight leading-tight"
              variants={simplePopupVariants}
              custom={0.5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
            >
              Helper
            </motion.div>
            
            {/* Подзаголовок с уменьшенным на 35% размером и полной шириной */}
            <motion.p 
              className="text-base md:text-lg text-gray-300 mb-8 w-full"
              style={{ fontSize: "calc(1rem * 1.7 * 0.65)" }}
              variants={simplePopupVariants}
              custom={0.7}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
            >
              Благотворительная платформа с прозрачностью и контролем средств через блокчейн TON
            </motion.p>
          </div>

          {/* Манифест проекта */}
          <motion.section
            ref={manifestRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-32 md:mb-40 backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8"
          >
            <div className="border-l border-white/20 pl-6 md:pl-8">
              <motion.h2 variants={textReveal} className="text-3xl md:text-4xl font-light mb-8">
                Наши цели
              </motion.h2>
              <div className="space-y-6">
                <motion.p variants={textReveal} className="text-xl md:text-2xl font-light leading-relaxed">
                  Мы верим в мир, где каждое живое существо заслуживает заботы и защиты. 
                </motion.p>
                
                <motion.p variants={textReveal} className="text-base text-gray-300">
                  Animal Helper объединяет технологии блокчейн и желание помогать. Мы создаем сообщество, где каждый 
                  может внести вклад в благополучие бездомных животных. Прозрачно. Эффективно. Без границ.
                </motion.p>
                
                <motion.p variants={textReveal} className="text-base text-gray-300">
                  Наша миссия — трансформировать систему помощи приютам, сделав её прозрачной и подотчетной.
                  Где бы вы ни находились, вы можете быть уверены: ваша помощь дойдет до адресата.
                </motion.p>
                
                <motion.p variants={textReveal} className="text-base text-gray-300">
                  Каждая помощь имеет значение. Даже небольшая поддержка может изменить жизнь животного. 
                  Наша платформа позволяет отслеживать результаты вашей помощи и видеть реальные истории животных, 
                  которым вы помогли.
                </motion.p>
                
                <motion.p variants={textReveal} className="text-base text-gray-300">
                  Мы ценим открытость и прозрачность. На нашей платформе вы можете увидеть, как именно 
                  используются средства, просматривать отчеты и фотографии из приютов. Это создает доверие 
                  и уверенность в том, что ваша поддержка приносит реальную пользу.
                </motion.p>
                
                <motion.p variants={textReveal} className="text-base text-gray-300">
                  Присоединяйтесь к нашему сообществу любителей животных, где каждый день мы вместе делаем 
                  мир добрее. Наблюдайте за историями успеха, делитесь опытом и вдохновляйте других на добрые дела.
                </motion.p>
              </div>
              
              {/* Кнопка "Начать помогать" удалена по запросу */}
            </div>
          </motion.section>

          {/* Данные о монете AHT */}
          <motion.section
            ref={tokenStatsRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-32 md:mb-40 backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8"
          >
            <motion.h2 variants={textReveal} className="text-3xl md:text-4xl font-light mb-8">
              AHT Token
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div variants={countUp} className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-50"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-6 relative h-full">
                  <p className="text-4xl font-light mb-2">1T</p>
                  <p className="text-xs text-gray-400">Общий сапплай</p>
                </div>
              </motion.div>
              
              <motion.div variants={countUp} className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-50"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-6 relative h-full">
                  <p className="text-4xl font-light mb-2">{(animatedStats.purchased / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-400">Токенов продано</p>
                </div>
              </motion.div>
              
              <motion.div variants={countUp} className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-50"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-6 relative h-full">
                  <p className="text-4xl font-light mb-2">{animatedStats.holders}</p>
                  <p className="text-xs text-gray-400">Держателей</p>
                </div>
              </motion.div>
              
              <motion.div variants={countUp} className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-50"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-6 relative h-full">
                  <p className="text-4xl font-light mb-2">{animatedStats.nftIssued}</p>
                  <p className="text-xs text-gray-400">NFT выпущено</p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Статистика голосований */}
          <motion.section
            ref={votingStatsRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-32 md:mb-40 backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8"
          >
            <motion.h2 variants={textReveal} className="text-3xl md:text-4xl font-light mb-8">
              Статистика голосований
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={countUp} className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-50"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-8 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-6xl font-light mb-2">{animatedStats.sheltersInVoting}</p>
                    <p className="text-sm text-gray-400 mb-8">Приютов в голосовании</p>
                    
                    <GradientButton 
                      onClick={navigateToProfile}
                      isSmall
                    >
                      Голосовать
                    </GradientButton>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={countUp} className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-50"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-8 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p className="text-6xl font-light mb-2">{animatedStats.sheltersHelped}</p>
                    <p className="text-sm text-gray-400 mb-8">Приютам помогли</p>
                    
                    <GradientButton 
                      onClick={navigateToProfile}
                      isSmall
                    >
                      Помочь приюту
                    </GradientButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Возможности для держателей */}
          <motion.section
            ref={holdersRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-20 backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8"
          >
            <motion.h2 variants={textReveal} className="text-3xl md:text-4xl font-light mb-8">
              Держателям AHT
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                variants={fadeInUp}
                className="relative group"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-6 relative h-full">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Управление ресурсами</h3>
                  <p className="text-sm text-gray-300">
                    Держатели токенов AHT получают право участвовать в принятии решений о распределении 
                    средств между приютами. Ваш голос имеет вес, пропорциональный количеству ваших токенов.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="relative group"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-6 relative h-full">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Уникальные NFT</h3>
                  <p className="text-sm text-gray-300">
                    За активное участие в развитии платформы держатели получают эксклюзивные NFT с 
                    изображениями животных из поддерживаемых приютов, которые могут расти в ценности.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="relative group"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-6 relative h-full">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Сообщество единомышленников</h3>
                  <p className="text-sm text-gray-300">
                    Возможность общаться с людьми, которым не всё равно. Вместе мы делимся опытом, 
                    историями спасения животных и поддерживаем друг друга в добрых начинаниях.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="relative group"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="bg-neutral-900/80 rounded-2xl p-6 relative h-full">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Инвестиционный потенциал</h3>
                  <p className="text-sm text-gray-300">
                    С ростом платформы и расширением экосистемы, токены AHT имеют потенциал для роста в цене, 
                    что делает благотворительность также и формой инвестиции.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Финальный призыв к действию (без кнопки "Стать частью сообщества") */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
            variants={fadeInUp}
            className="mt-20 mb-20 text-center backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8"
          >
            <motion.h2 variants={textReveal} className="text-3xl md:text-4xl font-light mb-6">
              Присоединяйтесь к нам
            </motion.h2>
            <motion.p variants={textReveal} className="text-gray-300 mb-4 max-w-xl mx-auto">
              Вместе мы можем изменить систему помощи животным, сделав её прозрачной, 
              эффективной и доступной для каждого.
            </motion.p>
            <motion.p variants={textReveal} className="text-gray-300 mb-4 max-w-xl mx-auto">
              Каждый день в наше сообщество вступают новые участники, которые делятся своими историями помощи животным.
              Это не просто платформа — это пространство, где собираются единомышленники и творят добро вместе.
            </motion.p>
            <motion.p variants={textReveal} className="text-gray-300 mb-8 max-w-xl mx-auto">
              Приютам нужна наша поддержка. Животным нужен наш голос. И вместе мы сможем сделать больше,
              чем поодиночке. Давайте менять мир к лучшему — один токен, одна история, одна жизнь за раз.
            </motion.p>
          </motion.div>

          {/* Замена обычной кнопки на GradientButton при наличии TMA */}
          {isReady ? (
            <motion.div 
              variants={simplePopupVariants}
              custom={0.6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
              className="mb-8"
            >
              <GradientButton 
                onClick={handleButtonClick}
              >
                {isConnected ? 'Кошелек подключен' : 'Подключить кошелек'}
              </GradientButton>
            </motion.div>
          ) : null}
        </div>
      </div>
    </PageTransition>
  );
};

export default Home; 