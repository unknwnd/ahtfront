import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GradientButton from '../components/ui/GradientButton';

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
  const sizes = ['20vw', '15vw', '25vw', '18vw', '22vw', '40vw', '35vw', '30vw'];
  const positions = [
    { bottom: '5%', left: '10%' },
    { bottom: '15%', left: '35%' },
    { bottom: '8%', right: '15%' },
    { bottom: '20%', right: '30%' },
    { bottom: '12%', left: '60%' },
    { bottom: '2%', left: '20%' },
    { bottom: '0%', right: '25%' },
    { bottom: '25%', left: '45%' }
  ];
  const colors = [
    'from-blue-500/20 via-cyan-400/15 to-transparent',
    'from-blue-600/20 via-indigo-400/15 to-transparent',
    'from-blue-700/20 via-blue-400/15 to-transparent',
    'from-indigo-600/20 via-blue-500/15 to-transparent',
    'from-blue-800/20 via-indigo-500/15 to-transparent',
    'from-blue-900/30 via-blue-700/20 to-transparent',
    'from-indigo-900/30 via-blue-800/20 to-transparent',
    'from-blue-800/40 via-indigo-700/25 to-transparent'
  ];

  // Анимация пульсации
  const pulseVariants = {
    initial: { opacity: 0.3, scale: 0.9 },
    animate: { 
      opacity: [0.3, 0.6, 0.3], 
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
      className={`absolute rounded-full bg-gradient-to-t ${colors[index % colors.length]} blur-[80px]`}
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
  
  // Трансформация значений скролла для анимации логотипа
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [30, 45]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1.4, 1.3]);
  
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
      <div 
        ref={containerRef}
        className="min-h-screen bg-black text-white relative overflow-hidden"
      >
        {/* Эффект свечения из глубины */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <DeepGlow key={index} index={index} />
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-blue-900/40 to-transparent"></div>
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
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden"
    >
      {/* Эффект свечения из глубины */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <DeepGlow key={index} index={index} />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-blue-900/40 to-transparent"></div>
        
        {/* Большое свечение под логотипом */}
        <motion.div
          className="absolute top-[5%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-blue-800/10 via-blue-900/5 to-transparent blur-[100px]"
          initial={{ opacity: 0.2, scale: 0.9 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2], 
            scale: [0.9, 1.1, 0.9] 
          }}
          transition={{ 
            duration: 12, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />
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
      
      <div className="max-w-4xl mx-auto px-5 py-12 relative z-10 space-y-12">
        {/* Заголовок и подзаголовок с анимацией всплывания */}
        <div className="mb-4">
          {/* Верхний мини-заголовок */}
          <motion.div 
            className="mb-6 text-gray-300 text-xs uppercase tracking-widest"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            User Profile Dashboard
          </motion.div>
          
          {/* Контейнер для заголовка и карточки с курсом */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            {/* Основной заголовок */}
            <motion.h1 
              className="text-5xl md:text-7xl font-light tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {MOCK_USER_DATA.userName}
            </motion.h1>
            
            {/* Контейнер для выравнивания карточки */}
            <div className="self-start md:mt-[0.45em]">
              {/* Карточка с курсом TON/USDT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-gray-900/40 backdrop-blur-md border border-gray-800/40 rounded-lg w-[130px] h-[130px] flex flex-col justify-center items-center mt-2 md:mt-0"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/40 rounded-xl p-6 text-white">
            <p className="text-sm text-gray-400 mb-2">Баланс TON</p>
            <p className="text-3xl font-light mb-3">{MOCK_USER_DATA.tonBalance} TON</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>≈ ${(MOCK_USER_DATA.tonBalance * 2.5).toFixed(2)}</span>
              <span>Курс: $2.50</span>
            </div>
          </div>
          
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/40 rounded-xl p-6 text-white">
            <p className="text-sm text-gray-400 mb-2">Баланс AHT</p>
            <p className="text-3xl font-light mb-3">{MOCK_USER_DATA.ahtBalance.toLocaleString()} AHT</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>≈ {(MOCK_USER_DATA.ahtBalance * MOCK_USER_DATA.ahtPrice).toFixed(2)} TON</span>
              <span>Курс: {MOCK_USER_DATA.ahtPrice} TON</span>
            </div>
          </div>
        </motion.div>
        
        {/* Секция покупки токенов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-light mb-4 text-white">Купить AHT токены</h2>
          <div className="flex gap-3 mb-3 flex-wrap md:flex-nowrap max-w-2xl">
            <input
              type="number"
              min="1"
              step="1"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(Number(e.target.value))}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white w-32"
            />
            <span className="inline-flex items-center px-4 py-3 rounded-lg border border-gray-700/50 bg-gray-800/50 text-gray-300 text-sm">
              AHT
            </span>
            <GradientButton 
              onClick={handleBuyTokens}
              isSmall
              fullWidth
            >
              Купить за {(purchaseAmount * MOCK_USER_DATA.ahtPrice).toFixed(6)} TON
            </GradientButton>
          </div>
          <p className="text-xs text-gray-400 max-w-2xl">
            AHT токены используются для голосования и управления фондом Animal Helper Token (100,000 AHT = 1 TON)
          </p>
        </motion.div>
        
        {/* Вкладки с транзакциями, NFT и настройками */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/40 rounded-xl overflow-hidden"
        >
          <div className="flex border-b border-gray-800/50">
            <button
              className={`px-6 py-4 font-medium text-sm ${activeTab === 'transactions' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab('transactions')}
            >
              История транзакций
            </button>
            {/* Скрытая вкладка NFT */}
            {/*
            <button
              className={`px-6 py-4 font-medium text-sm ${activeTab === 'nft' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab('nft')}
            >
              Мои NFT
            </button>
            */}
            <button
              className={`px-6 py-4 font-medium text-sm ${activeTab === 'settings' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab('settings')}
            >
              Настройки
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'transactions' && (
              <div>
                <h2 className="text-xl font-light mb-6 text-white">История транзакций</h2>
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
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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
                <h2 className="text-xl font-light mb-6 text-white">Мои NFT</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Заглушка для NFT коллекции */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-900/30 border border-gray-800/40 rounded-xl p-5 flex flex-col">
                      <div className="rounded-xl overflow-hidden bg-gray-900/50 aspect-square mb-4 flex items-center justify-center">
                        <div className="text-5xl text-gray-600">NFT #{i}</div>
                      </div>
                      <h3 className="text-white text-lg font-light">Помощь приюту #{i}</h3>
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
                <h2 className="text-xl font-light mb-6 text-white">Настройки профиля</h2>
                
                <div className="space-y-6 max-w-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Уведомления о голосованиях
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="vote-notifications"
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-700 rounded"
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
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-700 rounded"
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
  );
};

export default Profile; 