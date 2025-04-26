import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { toast } from 'react-toastify';
import GradientButton from '../components/ui/GradientButton';
import PageTransition from '../components/PageTransition';

// Фирменные цвета для градиентов
const BRAND_COLORS = {
  orange: '#FF7B1C', // Оранжевый
  black: '#111111',  // Черный
  white: '#FFFFFF',  // Белый
  lavender: '#9D7BFF' // Лавандовый
};

// Фирменный градиент для компонентов
const getBrandGradient = () => {
  return `linear-gradient(-45deg, ${BRAND_COLORS.orange}, ${BRAND_COLORS.black}, ${BRAND_COLORS.white}, ${BRAND_COLORS.lavender})`;
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

// Временные моковые данные для голосований
const MOCK_VOTINGS = [
  {
    id: '1',
    title: 'Финансирование ветеринарной клиники для приюта "Добрые лапы"',
    description: 'Голосование за выделение 15,000 TON на создание ветеринарной клиники при приюте "Добрые лапы" для обслуживания животных из всех приютов сети.',
    startDate: '2023-10-01',
    endDate: '2023-10-15',
    status: 'active',
    votes: {
      yes: 356,
      no: 124,
      abstain: 45
    },
    requiredTokens: 5,
    contract: '0:a5c1b25eadbb15ac6186e5a0aa2070baac95c2b4addd7cac947c33defab7f0f3',
    // Дополнительные данные согласно форме заявки
    facilityInfo: {
      name: 'Ветеринарная клиника "Добрые лапы"',
      type: 'vet',
      address: 'г. Москва, ул. Пушкина, д. 10',
      phone: '+7 (495) 123-45-67',
      website: 'https://добрые-лапы.рф',
      requisites: 'ИНН: 7712345678, Р/с: 40701810100000000123 в Банке "ВТБ"'
    }
  },
  {
    id: '2',
    title: 'Программа массовой стерилизации бездомных животных',
    description: 'Выделение 8,000 TON на программу массовой стерилизации бездомных животных в 5 городах страны.',
    startDate: '2023-09-20',
    endDate: '2023-10-05',
    status: 'active',
    votes: {
      yes: 642,
      no: 78,
      abstain: 23
    },
    requiredTokens: 5,
    contract: '0:b4e2d75f0c8d9a3d6a1b3c5e7f9a1b3c5e7f9a1b3c5e7f9a1b3c5e7f9a1b3c5',
    // Дополнительные данные согласно форме заявки
    facilityInfo: {
      name: 'Фонд защиты животных "Новая жизнь"',
      type: 'shelter',
      address: 'г. Санкт-Петербург, Невский пр., д. 45',
      phone: '+7 (812) 987-65-43',
      website: 'https://newlife-pets.ru',
      requisites: 'ИНН: 7898765432, Р/с: 40703810400000000456 в Сбербанке'
    }
  },
  {
    id: '3',
    title: 'Закупка корма для приютов на зимний период',
    description: 'Выделение 12,000 TON на закупку кормов для всех приютов сети на зимний период 2023-2024.',
    startDate: '2023-09-15',
    endDate: '2023-09-30',
    status: 'completed',
    votes: {
      yes: 893,
      no: 52,
      abstain: 31
    },
    requiredTokens: 5,
    contract: '0:c3f4e5d6c7b8a9098f7e6d5c4b3a2918d7c6b5a4938271605f4e3d2c1b0a9f8e',
    // Дополнительные данные согласно форме заявки
    facilityInfo: {
      name: 'Сеть приютов "Дом для хвостиков"',
      type: 'shelter',
      address: 'г. Екатеринбург, ул. Ленина, д. 5',
      phone: '+7 (343) 765-43-21',
      website: 'https://dom-hvostikov.org',
      requisites: 'ИНН: 6612345678, Р/с: 40702810700000000789 в Альфа-Банке'
    }
  },
  {
    id: '4',
    title: 'Обновление правил управления фондом AHT',
    description: 'Голосование за внесение изменений в правила управления фондом Animal Helper Token.',
    startDate: '2023-08-20',
    endDate: '2023-09-10',
    status: 'completed',
    votes: {
      yes: 412,
      no: 523,
      abstain: 67
    },
    requiredTokens: 10,
    contract: '0:d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3',
    // Дополнительные данные согласно форме заявки
    facilityInfo: {
      name: 'Благотворительный фонд Animal Helper Token',
      type: 'other',
      address: 'г. Москва, Пресненская наб., д. 12, башня "Федерация"',
      phone: '+7 (800) 555-35-35',
      website: 'https://aht-foundation.org',
      requisites: 'ИНН: 7703456789, Р/с: 40701810800000001234 в Тинькофф Банке'
    }
  }
];

type VoteOption = 'yes' | 'no' | 'abstain';

// Вспомогательная функция для определения текущей даты
const getCurrentDay = (): number => {
  return new Date().getDate();
};

// Функция для проверки, находимся ли мы в первой неделе месяца (1-7 дни)
const isFirstWeekOfMonth = (): boolean => {
  const currentDay = getCurrentDay();
  return currentDay >= 1 && currentDay <= 7;
};

const VotingCard = ({ voting, index }: { voting: typeof MOCK_VOTINGS[0], index: number }) => {
  const [tonConnectUI] = useTonConnectUI();
  const [showDetails, setShowDetails] = useState(false);
  const [showVotingInfo, setShowVotingInfo] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [voteAnimation, setVoteAnimation] = useState(false);
  
  // Вычисляем общее количество голосов
  const totalVotes = voting.votes.yes + voting.votes.no + voting.votes.abstain;
  
  // Проверяем, закончилось ли голосование
  const isCompleted = voting.status === 'completed';
  const isActive = voting.status === 'active';
  
  // Получаем данные о заведении
  const facilityInfo = voting.facilityInfo;
  
  // Словарь для отображения типа заведения
  const facilityTypeMap: Record<string, string> = {
    'vet': 'Ветеринарная клиника',
    'shelter': 'Приют',
    'zoo': 'Зоопарк',
    'nursery': 'Питомник',
    'other': 'Другое'
  };
  
  // Обработчик голосования - открывает информационное окно и запускает анимацию
  const handleVote = async () => {
    setVoteAnimation(true);
    setTimeout(() => {
      setVoteAnimation(false);
      setShowVotingInfo(true);
    }, 1000);
  };

  // Обработчик показа информации о приюте
  const handleHelp = () => {
    setShowDetails(true);
  };

  // Закрытие модальных окон
  const closeDetails = () => {
    setShowDetails(false);
  };
  
  const closeVotingInfo = () => {
    setShowVotingInfo(false);
  };
  
  // Функция для форматирования адреса контракта (сокращение)
  const formatContractAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;
  };
  
  // Функция для получения ссылки на обозреватель TON
  const getTonViewerLink = (address: string) => {
    return `https://tonviewer.com/${address}`;
  };

  // Анимации для карточек
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  // Определяем, можно ли сейчас голосовать (не в первую неделю месяца)
  const canVoteNow = !isFirstWeekOfMonth();

  // Эффект для анимации голосования
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (voteAnimation) {
      timer = setTimeout(() => {
        setVoteAnimation(false);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [voteAnimation]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="overflow-hidden backdrop-blur-lg bg-black/40 rounded-2xl border border-gray-800 relative group"
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
      <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 relative z-10">
        {/* Информация об учреждении - левая колонка (2/3 ширины) */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-semibold text-white">{facilityInfo.name}</h2>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              isActive 
                ? 'bg-green-900/50 text-green-300' 
                : 'bg-gray-800/50 text-gray-300'
            }`}>
              {isActive ? 'Активно' : 'Завершено'}
            </span>
          </div>
          
          <div className="flex items-center text-gray-400 text-sm mb-3">
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs mr-3">
              {facilityTypeMap[facilityInfo.type]}
            </span>
            <span>{isActive ? 'До окончания:' : 'Завершено:'} {voting.endDate}</span>
          </div>
          
          <p className="text-gray-300 text-base mb-4 border-l-2 border-blue-500/30 pl-3">
            {voting.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">
                <span className="text-gray-300 font-medium">Адрес:</span>
              </div>
              <div className="text-white text-sm">{facilityInfo.address}</div>
            </div>
            
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">
                <span className="text-gray-300 font-medium">Телефон:</span>
              </div>
              <div className="text-white text-sm">{facilityInfo.phone}</div>
            </div>
            
            {facilityInfo.website && (
              <div className="bg-gray-800/30 p-3 rounded-lg md:col-span-2">
                <div className="text-sm text-gray-400 mb-1">
                  <span className="text-gray-300 font-medium">Веб-сайт:</span>
                </div>
                <a 
                  href={facilityInfo.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  {facilityInfo.website}
                </a>
              </div>
            )}
          </div>
          
          {/* Строка со смарт-контрактом */}
          <div className="border-t border-gray-800/60 pt-3 mt-auto">
            <a 
              href={getTonViewerLink(voting.contract)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm inline-flex items-center"
              title="Просмотреть контракт на TON Explorer"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
              </svg>
              Смарт-контракт: {formatContractAddress(voting.contract)}
            </a>
          </div>
        </div>
        
        {/* Блок голосования - правая колонка (1/3 ширины) */}
        <div className="w-full md:w-1/3 flex flex-col items-start justify-between md:border-l md:border-gray-800/60 md:pl-6">
          {/* Круг с количеством голосов */}
          <div className="flex flex-col items-start w-full">
            <div 
              className="w-64 h-64 rounded-full relative mb-6 cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Постоянный градиентный фон */}
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-br"
                style={{
                  background: getBrandGradient(),
                  backgroundSize: '400% 400%',
                  animation: 'gradient 15s ease infinite'
                }}
              ></div>
              
              {/* Анимация при голосовании */}
              <AnimatePresence>
                {voteAnimation && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-br z-10"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [1, 1.05, 1]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 5,
                      times: [0, 0.2, 1]
                    }}
                    style={{
                      background: getBrandGradient(),
                      backgroundSize: '400% 400%',
                      animation: 'gradient 3s ease infinite'
                    }}
                  />
                )}
              </AnimatePresence>
              
              {/* Основной фон круга */}
              <div className="absolute inset-2 rounded-full flex items-center justify-center bg-gray-900/90">
                <div className="text-center">
                  <p className="text-6xl font-light text-white">{totalVotes}</p>
                  <p className="text-base text-gray-300">голосов</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Блок с кнопками в нижней части */}
          <div className="w-full border-t border-gray-800/60 pt-3 mt-auto flex flex-col items-start gap-2">
            {/* Кнопка голосования - только если активно и не первая неделя месяца */}
            {isActive && canVoteNow && (
              <GradientButton 
                onClick={handleVote}
                className="w-full justify-center text-sm"
                isSmall
              >
                Голосовать
              </GradientButton>
            )}
            
            <GradientButton 
              onClick={handleHelp}
              className="w-full justify-center text-sm"
              isSmall
            >
              Помочь
            </GradientButton>
          </div>
        </div>
      </div>
      
      {/* CSS для анимации градиента */}
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      
      {/* Модальное окно с информацией о голосовании */}
      {showVotingInfo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full relative border border-gray-800 overflow-hidden">
            {/* Фирменный градиент на фоне модального окна */}
            <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30"></div>
            <div className="absolute inset-0 opacity-10" style={{ background: getBrandGradient() }}></div>
            
            <button 
              onClick={closeVotingInfo}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-4 relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-4">Голосование недоступно</h3>
              <p className="text-gray-300">
                Голосование доступно при балансе от 1000 AHT
              </p>
              <p className="text-gray-400 mt-2 text-xs">
                Помните, что вы можете голосовать не более 2 раз в месяц без возможности отменить выбор.
              </p>
            </div>
            
            <div className="mt-6 flex justify-center relative z-10">
              <GradientButton
                onClick={closeVotingInfo}
                isSmall
              >
                Закрыть
              </GradientButton>
            </div>
          </div>
        </div>
      )}
      
      {/* Модальное окно с реквизитами для помощи */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full relative border border-gray-800 overflow-hidden">
            {/* Фирменный градиент на фоне модального окна */}
            <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30"></div>
            <div className="absolute inset-0 opacity-10" style={{ background: getBrandGradient() }}></div>
            
            <button 
              onClick={closeDetails}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-semibold text-white mb-4 relative z-10">{facilityInfo.name}</h3>
            
            <div className="mb-4 relative z-10">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Реквизиты для помощи:</h4>
              <p className="text-sm text-gray-400 mb-1">
                TON кошелек: <a 
                  href={getTonViewerLink(voting.contract)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {voting.contract}
                </a>
              </p>
              <p className="text-sm text-gray-400 mb-1">
                {facilityInfo.requisites}
              </p>
              <p className="text-sm text-gray-400 mb-4">{facilityInfo.phone}</p>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Контактная информация:</h4>
                <p className="text-sm text-gray-400 mb-1">Адрес: {facilityInfo.address}</p>
                {facilityInfo.website && (
                  <p className="text-sm text-gray-400 mb-1">
                    Веб-сайт: <a 
                      href={facilityInfo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {facilityInfo.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-6 relative z-10">
              <GradientButton
                onClick={closeDetails}
                isSmall
              >
                Закрыть
              </GradientButton>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Обновляем определение компонента Voting
interface VotingProps {
  ton?: any; // Сервис TON
}

const Voting: React.FC<VotingProps> = ({ ton }) => {
  // Простая анимация всплывания для текста заголовка
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
        duration: 0.7,
        delay,
        ease: "easeOut"
      }
    })
  };
  // Состояния компонента
  const [votings, setVotings] = useState(MOCK_VOTINGS);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    facilityName: '',
    facilityType: 'shelter',
    facilityAddress: '',
    facilityPhone: '',
    facilityWebsite: '',
    facilityRequisites: '',
    requestedAmount: '',
    days: '15'
  });
  
  // Рефы для элементов интерфейса
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  
  // Хук для отслеживания скролла
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // TonConnect состояния и хуки
  const [connectedWallet, setConnectedWallet] = useState('');
  const [tonConnectUI] = useTonConnectUI();
  
  // Производные состояния от скролла
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -20]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0.8, 1]);
  
  // Добавляем трансформации для логотипа
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [30, 45]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1.4, 1.3]);

  // Проверяем, подключен ли кошелек
  useEffect(() => {
    if (tonConnectUI.connected) {
      const address = tonConnectUI.account?.address || '';
      setConnectedWallet(address);
    } else {
      setConnectedWallet('');
    }
  }, [tonConnectUI.connected, tonConnectUI.account]);

  // Фильтруем голосования по статусу
  const filteredVotings = MOCK_VOTINGS.filter(voting => {
    if (filter === 'all') return true;
    if (filter === 'active') return voting.status === 'active';
    if (filter === 'completed') return voting.status === 'completed';
    return true;
  });

  // Проверяем, первая ли сейчас неделя месяца
  const isFirstWeek = isFirstWeekOfMonth();

  // Функция для создания нового голосования
  const createVoting = () => {
    // Если сейчас не первая неделя месяца, сообщаем об этом
    if (!isFirstWeek) {
      toast.info('Предложения принимаются только в первую неделю месяца (1-7 число)');
      return;
    }
    
    if (!tonConnectUI.connected) {
      toast.info('Пожалуйста, подключите TON кошелек');
      return;
    }
    
    // Проверка наличия достаточного количества токенов
    const userBalance = 500; // В реальном приложении здесь будет запрос баланса пользователя
    if (userBalance < 1000) {
      toast.warning('Для создания голосования необходимо иметь минимум 1000 AHT токенов');
      return;
    }
    
    // Открываем форму для создания предложения
    setShowProposalForm(true);
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Здесь был бы код для отправки данных формы
    toast.success('Ваше предложение успешно отправлено!');
    setShowProposalForm(false);
    
    // Сбрасываем форму
    setFormData({
      title: '',
      description: '',
      facilityName: '',
      facilityType: 'shelter',
      facilityAddress: '',
      facilityPhone: '',
      facilityWebsite: '',
      facilityRequisites: '',
      requestedAmount: '',
      days: '15'
    });
  };

  // Закрытие формы предложения
  const closeProposalForm = () => {
    setShowProposalForm(false);
  };

  // Анимация заголовка
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  // URL изображения для фона (прямая ссылка на изображение)
  const logoImageUrl = "https://i.ibb.co/GBQrN2B/image.png";

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
      
      <div className="max-w-4xl mx-auto px-5 py-12 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="mb-24 mt-16 md:mt-24"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
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
              <motion.div 
                className="mb-4 text-5xl md:text-7xl font-light tracking-tight leading-tight"
                variants={simplePopupVariants}
                custom={0.3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.8 }}
              >
                Голосования
              </motion.div>
              <motion.p
                variants={simplePopupVariants}
                custom={0.5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.8 }}
                className="text-base md:text-lg text-gray-300 mb-8 w-full"
                style={{ fontSize: "calc(1rem * 1.7 * 0.65)" }}
              >
                Примите участие в управлении фондом Animal Helper Token и решении важных вопросов благотворительности.
              </motion.p>
            </div>
            
            {/* Кнопка предложения нового голосования - отображается только в первую неделю месяца */}
            {isFirstWeek && (
              <motion.div
                variants={simplePopupVariants}
                custom={0.7}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.8 }}
              >
                <GradientButton 
                  onClick={createVoting}
                  className="mt-4 lg:mt-0"
                >
                  Предложить новое голосование
                </GradientButton>
              </motion.div>
            )}
          </div>
          
          <motion.div
            variants={simplePopupVariants}
            custom={0.6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
            className="flex flex-wrap gap-3 mb-6 mt-8"
          >
            <GradientButton
              onClick={() => setFilter('all')}
              isSmall
              className={`${filter !== 'all' ? 'opacity-70' : ''}`}
            >
              Все
            </GradientButton>
            <GradientButton
              onClick={() => setFilter('active')}
              isSmall
              className={`${filter !== 'active' ? 'opacity-70' : ''}`}
            >
              Активные
            </GradientButton>
            <GradientButton
              onClick={() => setFilter('completed')}
              isSmall
              className={`${filter !== 'completed' ? 'opacity-70' : ''}`}
            >
              Завершенные
            </GradientButton>
          </motion.div>
        </motion.div>
        
        <div className="space-y-8">
          {filteredVotings.length > 0 ? (
            filteredVotings.map((voting, index) => (
              <VotingCard key={voting.id} voting={voting} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12 backdrop-blur-sm bg-gray-900/30 rounded-xl border border-gray-800 relative"
            >
              <div className="absolute -inset-0.5 rounded-xl bg-white/5 blur opacity-30"></div>
              <p className="text-gray-300 relative z-10">Голосования не найдены</p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Модальное окно с формой для нового предложения */}
      {showProposalForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full relative my-8 border border-gray-800 overflow-hidden">
            <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30"></div>
            <button 
              onClick={closeProposalForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-white mb-6">Предложить новое голосование</h3>
            
            <div className="mb-4 text-gray-300 text-sm">
              <p>
                Заполните форму, чтобы предложить новое учреждение для голосования.
                Помните, что вы можете отправить только одно предложение в месяц.
              </p>
            </div>
            
            <form onSubmit={handleSubmitProposal}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Название учреждения*
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Тип учреждения*
                  </label>
                  <select
                    name="facilityType"
                    value={formData.facilityType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Выберите тип</option>
                    <option value="vet">Ветеринарная клиника</option>
                    <option value="shelter">Приют</option>
                    <option value="zoo">Зоопарк</option>
                    <option value="nursery">Питомник</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Адрес местонахождения*
                  </label>
                  <input
                    type="text"
                    name="facilityAddress"
                    value={formData.facilityAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Телефон*
                  </label>
                  <input
                    type="tel"
                    name="facilityPhone"
                    value={formData.facilityPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Ссылка на сайт/соцсети
                  </label>
                  <input
                    type="url"
                    name="facilityWebsite"
                    value={formData.facilityWebsite}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Реквизиты (если есть)
                  </label>
                  <input
                    type="text"
                    name="facilityRequisites"
                    value={formData.facilityRequisites}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="text-xs text-gray-400 mb-6">
                <p>* - обязательные поля для заполнения</p>
                <p className="mt-2">
                  После отправки заявка будет рассмотрена модераторами. 
                  В случае одобрения, учреждение будет добавлено в список для голосования.
                </p>
                <p className="mt-2">
                  Вы можете предложить только одно учреждение в месяц.
                </p>
              </div>
              
              <div className="flex justify-end">
                <GradientButton 
                  type="submit"
                >
                  Отправить предложение
                </GradientButton>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </PageTransition>
  );
};

export default Voting;