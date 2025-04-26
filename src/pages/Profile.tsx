import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GradientButton from '../components/ui/GradientButton';
import PageTransition from '../components/PageTransition';

// Моковые данные для токенов и транзакций
const MOCK_USER_DATA = {
  ahtBalance: 75000000,
  tonBalance: 125.45,
  ahtPrice: 0.00001, // в TON (100000 AHT = 1 TON)
  userName: "Александр Петров",
  userAddress: 'EQD4FPq-PRDieyQKkizFTRtSDyucUIqrj0v_Mg_CyBQNZv99',
  isWalletConnected: true, // Для заглушки всегда true
  tonUsdtRate: {
    current: 3.25,
    change: 0.18, // положительное значение = рост
    changePercentage: 5.86
  },
  transactions: [
    {
      id: '1',
      type: 'donation',
      amount: 10,
      token: 'TON',
      date: '2023-10-01',
      destination: 'Приют "Добрые лапы"',
      hash: '97f03c8429d0605d86c59a15c91ca4a5d3c30e70f46cf15a386c9caacfc9a723'
    },
    {
      id: '2',
      type: 'purchase',
      amount: 25,
      token: 'AHT',
      date: '2023-09-25',
      destination: 'AHT Token Contract',
      hash: 'a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2'
    },
    {
      id: '3',
      type: 'vote',
      amount: 0,
      token: 'AHT',
      date: '2023-09-20',
      destination: 'Голосование #2: Программа стерилизации',
      hash: 'b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3'
    },
    {
      id: '4',
      type: 'donation',
      amount: 5,
      token: 'TON',
      date: '2023-09-15',
      destination: 'Приют "Кошкин дом"',
      hash: 'c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4'
    }
  ]
};

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

  // Улучшенная анимация пульсации с повышенной плавностью
  const pulseVariants = {
    initial: { opacity: 0.3, scale: 0.9 },
    animate: { 
      opacity: [0.3, 0.5, 0.3], 
      scale: [0.9, 1.1, 0.9],
      transition: { 
        duration: 12 + index * 2, // Увеличено вдвое для большей плавности
        ease: "easeInOut", 
        repeat: Infinity,
        repeatType: "mirror" as const, // mirror вместо reverse для более плавного перехода
        times: [0, 0.5, 1] // Контрольные точки для более равномерного распределения анимации
      }
    }
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-t ${colors[index % colors.length]} blur-[60px]`}
      style={{ 
        width: sizes[index % sizes.length],
        height: sizes[index % sizes.length],
        ...positions[index % positions.length]
      }}
      initial="initial"
      animate="animate"
      variants={pulseVariants}
    />
  );
};

const Profile = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'transactions' | 'settings' | 'nft'>('transactions');
  
  // Ref для основного контейнера (для эффекта скролла)
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Хук для отслеживания скролла
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Трансформация значений скролла для анимации логотипа с плавными переходами
  const logoY = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [0, 25, 75, 100]
  );
  const logoRotate = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.7, 1], 
    [30, 35, 40, 45]
  );
  const logoScale = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.75, 1], 
    [1.5, 1.45, 1.35, 1.3]
  );
  
  // Обработчик покупки токенов AHT
  const handleBuyTokens = async () => {
    alert(`Вы успешно приобрели ${purchaseAmount} AHT токенов!`);
  };
  
  // URL изображения для фона (прямая ссылка на изображение)
  const logoImageUrl = "https://i.ibb.co/GBQrN2B/image.png";
  
  // Если показываем заглушку для отключенного кошелька
  const showDisconnectedWallet = false; // Переключите на true, чтобы увидеть экран отключенного кошелька
  
  if (showDisconnectedWallet) {
    return (
      <PageTransition>
        <div 
          ref={containerRef}
          className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden"
        >
          {/* Эффект свечения из глубины */}
          <div className="absolute inset-0 z-0 pointer-events-none">
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
          
          <div className="text-center py-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-white mb-4">Профиль не доступен</h1>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Для доступа к профилю и управления токенами, пожалуйста, подключите TON кошелек.
              </p>
              <GradientButton 
                onClick={() => alert('Открытие модального окна для подключения кошелька')}
                isSmall
              >
                Подключить кошелек
              </GradientButton>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  // Улучшенная анимация с повышенной плавностью
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
        duration: 1.4, // Увеличено вдвое для большей плавности
        delay,
        ease: [0.16, 1, 0.3, 1], // Кривая cubic-bezier для более плавного движения
        opacity: { duration: 1.6 } // Отдельная настройка для прозрачности
      }
    })
  };
  
  return (
    <PageTransition>
      <div 
        ref={containerRef}
        className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900 text-white relative overflow-hidden"
        style={{ backgroundPosition: "0% 130%" }}
      >
        {/* Эффект свечения из глубины */}
        <div className="absolute inset-0 z-0 pointer-events-none">
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
          {/* Заголовок и подзаголовок с анимацией всплывания */}
          <div className="mb-12 mt-8 md:mt-16">
            {/* Верхний мини-заголовок */}
            <motion.div 
              className="mb-6 text-gray-300 text-xs uppercase tracking-widest"
              variants={simplePopupVariants}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
            >
              User Profile Dashboard
            </motion.div>
            
            {/* Контейнер для заголовка и карточки с курсом */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              {/* Основной заголовок */}
              <motion.div 
                className="text-5xl md:text-7xl font-light tracking-tight leading-tight"
                variants={simplePopupVariants}
                custom={0.3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.8 }}
              >
                {MOCK_USER_DATA.userName}
              </motion.div>
              
              {/* Контейнер для выравнивания карточки */}
              <div className="self-start md:mt-[0.45em]">
                {/* Карточка с курсом TON/USDT */}
                <motion.div
                  variants={simplePopupVariants}
                  custom={0.4}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.8 }}
                  className="card-sm w-[130px] h-[130px] flex flex-col justify-center items-center mt-2 md:mt-0"
                  style={{ aspectRatio: '1/1' }}
                >
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="text-gray-300 text-sm font-medium">TON/USDT</span>
                    <span className="text-white text-xl font-medium">${MOCK_USER_DATA.tonUsdtRate.current.toFixed(2)}</span>
                    <span className={`text-sm ${MOCK_USER_DATA.tonUsdtRate.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {MOCK_USER_DATA.tonUsdtRate.change >= 0 ? '+' : ''}{MOCK_USER_DATA.tonUsdtRate.change.toFixed(2)} 
                    </span>
                    <span className={`text-xs ${MOCK_USER_DATA.tonUsdtRate.change >= 0 ? 'text-green-400/80' : 'text-red-400/80'}`}>
                      ({MOCK_USER_DATA.tonUsdtRate.change >= 0 ? '+' : ''}{MOCK_USER_DATA.tonUsdtRate.changePercentage.toFixed(2)}%)
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <motion.div
              variants={simplePopupVariants}
              custom={0.5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
              className="mb-6"
            >
              <p className="text-sm text-gray-400 mb-1">Адрес кошелька:</p>
              <div className="flex items-center">
                <span className="font-mono text-gray-300 break-all">
                  {MOCK_USER_DATA.userAddress}
                </span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(MOCK_USER_DATA.userAddress);
                    alert('Адрес скопирован');
                  }}
                  className="ml-2 p-1 text-gray-400 hover:text-gray-200"
                  aria-label="Копировать адрес"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Карточки баланса */}
          <motion.div
            variants={simplePopupVariants}
            custom={0.6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            <div className="card-md p-8 relative group">
              <div className="absolute -inset-0.5 rounded-2xl bg-blue-500/5 blur opacity-30 group-hover:opacity-70 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base text-blue-300 mb-2 uppercase tracking-wider font-medium">Баланс TON</p>
                    <p className="text-4xl font-light mb-4">{MOCK_USER_DATA.tonBalance} TON</p>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>≈ ${(MOCK_USER_DATA.tonBalance * 2.5).toFixed(2)}</span>
                  <span className="text-green-400">+5.2% за 24ч</span>
                </div>
                <div className="h-1 bg-gray-800/50 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-blue-500/50 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Доступно для стейкинга</span>
                  <span>Курс: $2.50</span>
                </div>
              </div>
            </div>
            
            <div className="card-md p-8 relative group">
              <div className="absolute -inset-0.5 rounded-2xl bg-purple-500/5 blur opacity-30 group-hover:opacity-70 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base text-purple-300 mb-2 uppercase tracking-wider font-medium">Баланс AHT</p>
                    <p className="text-4xl font-light mb-4">{MOCK_USER_DATA.ahtBalance.toLocaleString()} AHT</p>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded-full">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>≈ {(MOCK_USER_DATA.ahtBalance * MOCK_USER_DATA.ahtPrice).toFixed(2)} TON</span>
                  <span className="text-green-400">+12.7% за 7 дней</span>
                </div>
                <div className="h-1 bg-gray-800/50 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-purple-500/50 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Права голоса: 34%</span>
                  <span>Курс: {MOCK_USER_DATA.ahtPrice} TON</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Секция новостей токена */}
          <motion.div
            variants={simplePopupVariants}
            custom={0.7}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
            className="mb-12"
          >
            <h2 className="title-lg mb-6">Новости токена AHT</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-md relative group overflow-hidden">
                <div className="absolute -inset-0.5 rounded-2xl bg-green-500/5 blur opacity-30 group-hover:opacity-70 transition-all duration-1000"></div>
                <div className="relative z-10 p-6">
                  <div className="bg-green-900/30 p-2 rounded-lg inline-block mb-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Листинг на новой бирже</h3>
                  <p className="text-gray-300 text-sm mb-3">AHT успешно прошел листинг на бирже CryptoExchange, что открывает новые возможности для приобретения токенов.</p>
                  <div className="text-xs text-gray-500 mt-auto">15 октября 2023</div>
                </div>
              </div>
              
              <div className="card-md relative group overflow-hidden">
                <div className="absolute -inset-0.5 rounded-2xl bg-blue-500/5 blur opacity-30 group-hover:opacity-70 transition-all duration-1000"></div>
                <div className="relative z-10 p-6">
                  <div className="bg-blue-900/30 p-2 rounded-lg inline-block mb-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Рост активности в сети</h3>
                  <p className="text-gray-300 text-sm mb-3">За последний месяц количество активных держателей AHT выросло на 37%, что демонстрирует рост интереса к проекту.</p>
                  <div className="text-xs text-gray-500 mt-auto">2 октября 2023</div>
                </div>
              </div>
              
              <div className="card-md relative group overflow-hidden">
                <div className="absolute -inset-0.5 rounded-2xl bg-yellow-500/5 blur opacity-30 group-hover:opacity-70 transition-all duration-1000"></div>
                <div className="relative z-10 p-6">
                  <div className="bg-yellow-900/30 p-2 rounded-lg inline-block mb-4">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Партнерство с приютами</h3>
                  <p className="text-gray-300 text-sm mb-3">Подписано соглашение о партнерстве еще с 5 приютами для животных, которые присоединились к экосистеме AHT.</p>
                  <div className="text-xs text-gray-500 mt-auto">25 сентября 2023</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Секция покупки токенов */}
          <motion.div
            variants={simplePopupVariants}
            custom={0.8}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
            className="mb-12 card-md relative group p-8"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-orange-500/5 blur opacity-30 group-hover:opacity-70 transition-all duration-1000"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-light mb-6 flex items-center">
                <svg className="w-8 h-8 text-orange-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Купить AHT токены
              </h2>
              <div className="flex gap-5 mb-5 flex-wrap md:flex-nowrap max-w-3xl">
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-xl bg-white/5 blur opacity-30 group-hover:opacity-60 transition-all duration-800 ease-in-out"></div>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                    className="relative z-10 px-6 py-4 bg-gray-800/70 border border-gray-700/50 rounded-xl text-white text-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-48"
                  />
                </div>
                <span className="inline-flex items-center px-6 py-4 rounded-xl border border-gray-700/50 bg-gray-800/40 text-gray-300 text-xl font-light">
                  AHT
                </span>
                <GradientButton 
                  onClick={handleBuyTokens}
                  className="text-lg py-4 px-8"
                  fullWidth
                >
                  Купить за {(purchaseAmount * MOCK_USER_DATA.ahtPrice).toFixed(6)} TON
                </GradientButton>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-sm text-gray-300 max-w-3xl bg-gray-900/50 p-4 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Минимальная покупка: 1 AHT</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Безопасная транзакция через TON</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m-6-8h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Комиссия сети: 0.05 TON</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Вкладки с транзакциями, NFT и настройками */}
          <motion.div
            variants={simplePopupVariants}
            custom={0.9}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
            className="card-md mb-20 relative group overflow-visible"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-indigo-500/5 blur opacity-30 group-hover:opacity-70 transition-all duration-1000 ease-in-out"></div>
            <div className="flex border-b border-gray-800/50 relative z-10 px-2">
              <button
                className={`px-8 py-5 font-medium text-base transition-all duration-500 ease-in-out ${activeTab === 'transactions' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('transactions')}
              >
                История транзакций
              </button>
              <button
                className={`px-8 py-5 font-medium text-base transition-all duration-500 ease-in-out ${activeTab === 'nft' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('nft')}
              >
                Мои NFT
              </button>
              <button
                className={`px-8 py-5 font-medium text-base transition-all duration-500 ease-in-out ${activeTab === 'settings' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('settings')}
              >
                Настройки
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'transactions' && (
                <div>
                  <h2 className="title-md">История транзакций</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800/30">
                      <thead>
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Дата</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Тип</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Сумма</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Назначение</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/20">
                        {MOCK_USER_DATA.transactions.map((tx, index) => (
                          <tr key={tx.id} className={index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-800/10'}>
                            <td className="px-6 py-4 text-sm text-gray-300">{tx.date}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`badge ${
                                tx.type === 'donation' 
                                  ? 'bg-green-900/30 text-green-300' 
                                  : tx.type === 'purchase' 
                                    ? 'bg-blue-900/30 text-blue-300'
                                    : 'bg-purple-900/30 text-purple-300'
                              }`}>
                                {tx.type === 'donation' ? 'Пожертвование' : tx.type === 'purchase' ? 'Покупка' : 'Голосование'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              {tx.amount > 0 ? `${tx.amount} ${tx.token}` : '-'}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              <div className="flex flex-col">
                                <span>{tx.destination}</span>
                                <span className="text-xs text-gray-500 font-mono truncate max-w-xs">
                                  {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 10)}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'nft' && (
                <div>
                  <h2 className="title-md">Мои NFT</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Заглушка для NFT коллекции */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="card-sm">
                        <div className="rounded-xl overflow-hidden bg-gray-900/50 aspect-square mb-4 flex items-center justify-center">
                          <div className="text-5xl text-gray-600">NFT #{i}</div>
                        </div>
                        <h3 className="title-sm">Помощь приюту #{i}</h3>
                        <p className="text-sm text-gray-400 mb-4">Выпущен: 2023-09-{i < 10 ? '0'+i : i}</p>
                        <div className="mt-auto flex justify-between text-xs text-gray-500">
                          <span>ID: TON-NFT-{1000+i}</span>
                          <span>Tier {i}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="title-md">Настройки профиля</h2>
                  
                  <div className="space-y-6 max-w-xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Уведомления о голосованиях
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="vote-notifications"
                          className="h-4 w-4 text-brand-blue-dark focus:ring-brand-blue-light border-gray-700 rounded"
                          defaultChecked
                        />
                        <label htmlFor="vote-notifications" className="ml-2 block text-sm text-gray-300">
                          Получать уведомления о новых голосованиях
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Автоматический обмен
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="auto-exchange"
                          className="h-4 w-4 text-brand-blue-dark focus:ring-brand-blue-light border-gray-700 rounded"
                        />
                        <label htmlFor="auto-exchange" className="ml-2 block text-sm text-gray-300">
                          Автоматически конвертировать пожертвования в TON
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Отключение кошелька
                      </label>
                      <GradientButton
                        onClick={() => alert('Кошелек отключен')}
                        isSmall
                      >
                        Отключить кошелек
                      </GradientButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;