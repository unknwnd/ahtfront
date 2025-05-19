import { useState } from 'react';
import { Button } from '../components/ui/Button';
import PageTransition from '../components/PageTransition';

// Интерфейс для статичных данных пользователя, не зависящих от языка
interface StaticProfileData {
  ahtBalance: number;
  tonBalance: number;
  ahtPrice: number;
  userName: string;
  userAddress: string;
  isWalletConnected: boolean; // Это состояние, в реальном приложении управлялось бы иначе
  tonUsdtRate: { current: number; change: number; changePercentage: number; };
  userStats: { availableVotes: number; proposalsMade: number; votesParticipated: number; };
  rawTransactions: Array<{
    id: string;
    type: 'donation' | 'purchase' | 'vote'; // Уточненные типы транзакций
    amount: number;
    token: string;
    date: string;
    destinationKey: string; // Ключ для локализации назначения
    hash: string;
  }>;
}

// Определение типа для содержимого каждого языка (только локализуемые строки)
interface LanguageContent {
  pageTitle: string;
  welcomeMessage: string;
  activityTitle: string;
  availableVotes: string;
  proposalsMade: string;
  votesParticipated: string;
  balanceTon: string;
  stakingAvailable: string;
  currentRate: string;
  balanceAht: string;
  votingPower: string;
  ahtNewsTitle: string;
  news: Array<{ title: string; text: string; date: string; }>; // Date здесь может быть статичным, но title/text - локализуемые
  buyAhtTitle: string;
  buyFor: string;
  minPurchase: string;
  secureTransaction: string;
  networkFee: string;
  transactionsHistoryTitle: string;
  tableDate: string;
  tableType: string;
  tableAmount: string;
  tableDestination: string;
  myNftTitle: string;
  nftHelpShelter: string;
  nftIssued: string;
  profileSettingsTitle: string;
  voteNotifications: string;
  receiveVoteNotifications: string;
  autoExchange: string;
  autoConvertToTon: string;
  disconnectWallet: string;
  connectWalletPrompt: string;
  connectWalletButton: string;
  toggleToEnglish?: string;
  toggleToRussian?: string;
  minPurchaseError: string;
  showAllTransactionsButton: string;
  hideTransactionsButton: string;
  closeModalButtonLabel: string;
  transactionTypeDisplays: { // Локализованные отображения типов транзакций
    donation: string;
    purchase: string;
    vote: string;
  };
  transactionDestinations: { // Локализованные отображения назначений транзакций
    [key: string]: string;
  };
  notificationsTitle: string;
  newProposalNotificationsLabel: string;
  votingResultsNotificationsLabel: string;
  projectNewsNotificationsLabel: string;
  proposalPeriodRemindersLabel: string;
  defaultLanguageTitle: string;
  languageRu: string;
  languageEn: string;
}

// СТАТИЧНЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ И СИСТЕМЫ
const STATIC_PROFILE_DATA: StaticProfileData = {
  ahtBalance: 75000000,
  tonBalance: 125.45,
  ahtPrice: 0.00001,
  userName: "Аристарх \nСиницман", // Имя пользователя, не локализуется
  userAddress: 'EQD4FPq-PRDieyQKkizFTRtSDyucUIqrj0v_Mg_CyBQNZv99', // Адрес, не локализуется
  isWalletConnected: true, // Состояние подключения, для моков
  tonUsdtRate: { current: 3.25, change: 0.18, changePercentage: 5.86 }, // Курс, не локализуется
  userStats: { availableVotes: 150, proposalsMade: 5, votesParticipated: 12 }, // Статистика, не локализуется
  rawTransactions: [ // "Сырые" транзакции с ключами для локализации
    { id: '1', type: 'donation', amount: 10, token: 'TON', date: '2023-10-01', destinationKey: 'shelter_kind_paws', hash: '97f03c8429d0605d86c59a15c91ca4a5d3c30e70f46cf15a386c9caacfc9a723' },
    { id: '2', type: 'purchase', amount: 25, token: 'AHT', date: '2023-09-25', destinationKey: 'aht_token_contract', hash: 'a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2' },
    { id: '3', type: 'vote', amount: 0, token: 'AHT', date: '2023-09-20', destinationKey: 'vote_sterilization_program', hash: 'b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3' },
    { id: '4', type: 'donation', amount: 5, token: 'TON', date: '2023-09-15', destinationKey: 'shelter_cat_house', hash: 'c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4' }
  ]
};

// ЛОКАЛИЗОВАННЫЕ СТРОКИ
const MOCK_DATA_BY_LANG: { ru: LanguageContent; en: LanguageContent } = {
  ru: {
    pageTitle: "ПРОФИЛЬ",
    welcomeMessage: "Добро пожаловать в ваш профиль Animal Helper Token! Здесь вы можете отслеживать свои балансы токенов AHT и TON, просматривать историю транзакций, участвовать в развитии проекта через голосования, следить за новостями и управлять настройками своего профиля. Ваш вклад помогает животным, и мы ценим вашу поддержку!",
    activityTitle: "Ваша активность",
    availableVotes: "Доступно голосов:",
    proposalsMade: "Предложений создано:",
    votesParticipated: "Участий в голосованиях:",
    balanceTon: "Баланс TON",
    stakingAvailable: "Доступно для стейкинга",
    currentRate: "Курс:",
    balanceAht: "Баланс AHT",
    votingPower: "Права голоса:",
    ahtNewsTitle: "Новости токена AHT",
    news: [
      { title: "Листинг на новой бирже", text: "AHT успешно прошел листинг на бирже CryptoExchange, что открывает новые возможности для приобретения токенов.", date: "15 октября 2023" },
      { title: "Рост активности в сети", text: "За последний месяц количество активных держателей AHT выросло на 37%, что демонстрирует рост интереса к проекту.", date: "2 октября 2023" },
      { title: "Партнерство с приютами", text: "Подписано соглашение о партнерстве еще с 5 приютами для животных, которые присоединились к экосистеме AHT.", date: "25 сентября 2023" },
    ],
    buyAhtTitle: "Купить AHT токены",
    buyFor: "Купить за",
    minPurchase: "Минимальная покупка: 1000 AHT",
    secureTransaction: "Безопасная транзакция через TON",
    networkFee: "Комиссия сети: ~0.05 TON",
    transactionsHistoryTitle: "История транзакций",
    tableDate: "Дата",
    tableType: "Тип",
    tableAmount: "Сумма",
    tableDestination: "Назначение",
    myNftTitle: "Мои NFT",
    nftHelpShelter: "Помощь приюту #",
    nftIssued: "Выпущен:",
    profileSettingsTitle: "Настройки профиля",
    voteNotifications: "Уведомления о голосованиях",
    receiveVoteNotifications: "Получать уведомления о новых голосованиях",
    autoExchange: "Автоматический обмен",
    autoConvertToTon: "Автоматически конвертировать пожертвования в TON",
    disconnectWallet: "Отключить кошелек",
    connectWalletPrompt: "Для доступа к профилю и управления токенами, пожалуйста, подключите TON кошелек.",
    connectWalletButton: "Подключить кошелек",
    toggleToEnglish: "Switch to English",
    minPurchaseError: "Минимальная сумма покупки - 1000 AHT.",
    showAllTransactionsButton: "Показать все",
    hideTransactionsButton: "Свернуть",
    closeModalButtonLabel: "Закрыть настройки",
    transactionTypeDisplays: {
      donation: 'Пожертвование',
      purchase: 'Покупка',
      vote: 'Голосование',
    },
    transactionDestinations: {
      shelter_kind_paws: 'Приют "Добрые лапы"',
      aht_token_contract: 'AHT Token Contract',
      vote_sterilization_program: 'Голосование #2: Программа стерилизации',
      shelter_cat_house: 'Приют "Кошкин дом"',
    },
    notificationsTitle: "Уведомления",
    newProposalNotificationsLabel: "Новые предложения",
    votingResultsNotificationsLabel: "Результаты голосования",
    projectNewsNotificationsLabel: "Новости проекта",
    proposalPeriodRemindersLabel: "Напоминания о периоде голосования",
    defaultLanguageTitle: "Язык",
    languageRu: "Русский",
    languageEn: "English"
  },
  en: {
    pageTitle: "PROFILE",
    welcomeMessage: "Welcome to your Animal Helper Token dashboard! Here you can track your AHT and TON token balances, view your transaction history, participate in project development through voting, follow news, and manage your profile settings. Your contribution helps animals, and we appreciate your support!",
    activityTitle: "Your Activity",
    availableVotes: "Available Votes:",
    proposalsMade: "Proposals Made:",
    votesParticipated: "Votes Participated:",
    balanceTon: "TON Balance",
    stakingAvailable: "Available for Staking",
    currentRate: "Rate:",
    balanceAht: "AHT Balance",
    votingPower: "Voting Power:",
    ahtNewsTitle: "AHT Token News",
    news: [
      { title: "Listing on a New Exchange", text: "AHT has been successfully listed on the CryptoExchange, opening up new opportunities for token acquisition.", date: "October 15, 2023" },
      { title: "Network Activity Growth", text: "Over the past month, the number of active AHT holders has grown by 37%, demonstrating increasing interest in the project.", date: "October 2, 2023" },
      { title: "Partnership with Shelters", text: "A partnership agreement has been signed with 5 more animal shelters that have joined the AHT ecosystem.", date: "September 25, 2023" },
    ],
    buyAhtTitle: "Buy AHT Tokens",
    buyFor: "Buy for",
    minPurchase: "Minimum purchase: 1000 AHT",
    secureTransaction: "Secure transaction via TON",
    networkFee: "Network fee: ~0.05 TON",
    transactionsHistoryTitle: "Transaction History",
    tableDate: "Date",
    tableType: "Type",
    tableAmount: "Amount",
    tableDestination: "Destination",
    myNftTitle: "My NFTs",
    nftHelpShelter: "Help Shelter #",
    nftIssued: "Issued:",
    profileSettingsTitle: "Profile Settings",
    voteNotifications: "Vote Notifications",
    receiveVoteNotifications: "Receive notifications for new votes",
    autoExchange: "Auto Exchange",
    autoConvertToTon: "Automatically convert donations to TON",
    disconnectWallet: "Disconnect Wallet",
    connectWalletPrompt: "To access your profile and manage tokens, please connect your TON wallet.",
    connectWalletButton: "Connect Wallet",
    toggleToRussian: "Переключить на Русский",
    minPurchaseError: "Minimum purchase amount is 1000 AHT.",
    showAllTransactionsButton: "Show All",
    hideTransactionsButton: "Hide",
    closeModalButtonLabel: "Close settings",
    transactionTypeDisplays: {
      donation: 'Donation',
      purchase: 'Purchase',
      vote: 'Vote',
    },
    transactionDestinations: {
      shelter_kind_paws: 'Shelter "Kind Paws"',
      aht_token_contract: 'AHT Token Contract',
      vote_sterilization_program: 'Vote #2: Sterilization Program',
      shelter_cat_house: 'Shelter "Cat House"',
    },
    notificationsTitle: "Notifications",
    newProposalNotificationsLabel: "New Proposals",
    votingResultsNotificationsLabel: "Voting Results",
    projectNewsNotificationsLabel: "Project News",
    proposalPeriodRemindersLabel: "Proposal Period Reminders",
    defaultLanguageTitle: "Language",
    languageRu: "Русский",
    languageEn: "English"
  }
};

const Profile = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<number | ''>((''));
  const [currentLang, setCurrentLang] = useState<'ru' | 'en'>('ru');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  // console.log('[Profile Render] Initial or current showAllTransactions:', showAllTransactions);

  const localizedContent: LanguageContent = MOCK_DATA_BY_LANG[currentLang];

  const commonButtonCommunityStyle = "text-green-400 border-green-400 hover:bg-green-500 hover:text-white font-medium py-2 px-4 rounded-lg text-sm sm:text-base transition-colors duration-200";

  const toggleLanguage = () => {
    setCurrentLang(prevLang => prevLang === 'ru' ? 'en' : 'ru');
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  const handleToggleTransactions = () => {
    console.log('[handleToggleTransactions] Called. Current showAllTransactions before update:', showAllTransactions);
    setShowAllTransactions(prevShowAll => {
      const newShowAll = !prevShowAll;
      console.log('[handleToggleTransactions] State updated. New showAllTransactions will be:', newShowAll);
      return newShowAll;
    });
  };

  const handleBuyTokens = async () => {
    if (purchaseAmount === '' || Number(purchaseAmount) < 1000) {
      alert(localizedContent.minPurchaseError);
      return;
    }
    // В реальном приложении здесь был бы вызов API
    // Для примера, можно использовать шаблонную строку с локализацией
    const purchaseMessage = currentLang === 'ru' 
      ? `Вы успешно приобрели ${purchaseAmount} AHT токенов!`
      : `You have successfully purchased ${purchaseAmount} AHT tokens!`;
    alert(purchaseMessage);
  };
  
  const handleBuyTokensKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (purchaseAmount === '' || Number(purchaseAmount) < 1000) {
        alert(localizedContent.minPurchaseError);
        return;
      }
      const purchaseMessage = currentLang === 'ru' 
        ? `Вы успешно приобрели ${purchaseAmount} AHT токенов!`
        : `You have successfully purchased ${purchaseAmount} AHT tokens!`;
      alert(purchaseMessage);
    }
  };
  
  const showDisconnectedWallet = !STATIC_PROFILE_DATA.isWalletConnected; // Пример использования isWalletConnected
  
  if (showDisconnectedWallet) {
    // Логика для отображения, если кошелек не подключен, остается прежней,
    // но использует localizedContent для текстов
    return (
      <PageTransition>
        <div 
          className="min-h-screen w-full text-white relative overflow-hidden p-3"
          style={{
            backgroundImage: 'radial-gradient(ellipse farthest-corner at 15% 25%, hsla(80, 99%, 54%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 80% 45%, hsla(323, 100%, 59%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 20% 75%, hsla(227, 78%, 42%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 70% 15%, hsla(268, 85%, 54%, 0.15) 0%, transparent 70%), radial-gradient(ellipse at center, hsla(323, 100%, 59%, 0.12) 0%, transparent 65%)',
            backgroundColor: '#1E172B'
          }}
        >
          <div className="text-center py-12 relative">
            <div>
              <div className="relative text-center">
                <h1 className="relative z-10 text-7xl font-semibold text-left  mb-6 text-slate-100 font-actay-wide p-3">{localizedContent.pageTitle}</h1>
              </div>
              <p className="text-gray-300 mb-7 text-xl">
                {localizedContent.connectWalletPrompt}
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => alert(currentLang === 'ru' ? 'Подключение кошелька...' : 'Connecting wallet...')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    alert(currentLang === 'ru' ? 'Подключение кошелька...' : 'Connecting wallet...');
                  }
                }}
                aria-label={currentLang === 'ru' ? "Подключить TON кошелек" : "Connect TON wallet"}
                className="mt-8 bg-green-500 hover:bg-green-600 text-white"
              >
                {localizedContent.connectWalletButton}
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div 
        className="min-h-screen w-full text-white relative overflow-hidden p-4"
        style={{
          backgroundImage: 'radial-gradient(ellipse farthest-corner at 15% 25%, hsla(80, 99%, 54%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 80% 45%, hsla(323, 100%, 59%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 20% 75%, hsla(227, 78%, 42%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 70% 15%, hsla(268, 85%, 54%, 0.15) 0%, transparent 70%), radial-gradient(ellipse at center, hsla(323, 100%, 59%, 0.12) 0%, transparent 65%)',
          backgroundColor: '#1E172B'
        }}
      >
        <Button 
          onClick={toggleLanguage} 
          variant="outline"
          className="absolute top-0 left-0 z-20 border-slate-400/0 hover:border-slate-300 text-white text-xl"
          aria-label={currentLang === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
        >
          {currentLang === 'ru' ? 'EN' : 'RU'}
        </Button>
        <button
          onClick={toggleSettingsModal}
          aria-label={localizedContent.profileSettingsTitle}
          className="absolute top-0 right-0 z-50 p-2 rounded-full hover:bg-slate-700/50 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-slate-300 hover:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.759 6.759 0 010 1.844c.008.379.137.752.43.992l1.004.827c.487.402.668 1.07.26 1.431l-1.298 2.247a1.125 1.125 0 01-1.369.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.689 6.689 0 01-.22.128c-.333.183-.582.495-.646.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.646-.87a6.688 6.688 0 01-.22-.127c-.325-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 010-1.844c-.008-.379-.137-.752-.43-.992l-1.003-.827a1.125 1.125 0 01-.26-1.431l1.297-2.247a1.125 1.125 0 011.37-.49l1.217.456c.354.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.646-.869l.213-1.28c.09-.543.56-.94 1.11-.94zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
          </svg>
        </button>
        <div className="relative z-10 mt-14">
          <h1 className="relative z-10 text-7xl font-semibold text-center mb-6 text-slate-100 font-actay-wide">{localizedContent.pageTitle}</h1>
        </div>

        <div className="w-full px-1 py-1 relative z-10 -mt-24">
          <div className="mb-4 -mt-12 text-center">
            <p className="relative z-10 text-xl font-light text-white-50 mb-20">
              {localizedContent.welcomeMessage}
            </p>
            <p className="relative z-10 text-right text-4xl text-white-50 font-actay-wide mb-10">
              {STATIC_PROFILE_DATA.userName.replace(/\n/g, '\n')}
            </p>
          </div>
          
          <div className="space-y-16 mb-16">
            <section className="space-y-8">
              <div className="p-3 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-3xl text-blue-400 mb-1 uppercase tracking-wider font-medium font-actay-wide">{localizedContent.balanceTon}</p>
                      <p className="text-3xl sm:text-4xl font-light text-slate-100">{STATIC_PROFILE_DATA.tonBalance} TON</p>
                  </div>
                  <div className="bg-blue-900/40 p-3 rounded-full pointer-events-none">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-light text-white-50 mb-3">
                  <span>{`≈ $${(STATIC_PROFILE_DATA.tonBalance * STATIC_PROFILE_DATA.tonUsdtRate.current).toFixed(2)}`}</span>
                  <span className="text-green-400">{`+${STATIC_PROFILE_DATA.tonUsdtRate.changePercentage}% за 24ч`}</span>
                </div>
                <div className="h-1.5 bg-slate-700/0 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-xl text-white-500 mt-3">
                  <span>{localizedContent.stakingAvailable}</span>
                  <span>{`${localizedContent.currentRate} $${STATIC_PROFILE_DATA.tonUsdtRate.current.toFixed(2)}`}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-l">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-3xl text-purple-500 mb-3 uppercase tracking-wider font-medium font-actay-wide">{localizedContent.balanceAht}</p>
                      <p className="text-3xl sm:text-4xl font-light text-slate-100">{`${STATIC_PROFILE_DATA.ahtBalance.toLocaleString()} AHT`}</p>
                  </div>
                  <div className="bg-purple-900/0 p-2 rounded-full pointer-events-none">
                    <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 23 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-xl text-white-400 mb-5">
                  <span>{`≈ ${(STATIC_PROFILE_DATA.ahtBalance * STATIC_PROFILE_DATA.ahtPrice).toFixed(2)} TON`}</span>
                  {/* Placeholder for AHT rate change */}
                  <span className="text-green-400">+12.7% за 7 дней</span> 
                </div>
                <div className="h-1.5 bg-gray-700/70 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between text-xl text-white-500 mt-7">
                  <span>{`${localizedContent.votingPower} ${STATIC_PROFILE_DATA.userStats.availableVotes}`}</span>
                  <span>{`${localizedContent.currentRate} ${STATIC_PROFILE_DATA.ahtPrice} TON`}</span>
                </div>
              </div>
            </section>
            
            <section>
              <div className="relative text-left mb-10">
                   
                    <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-green-100 font-actay-wide">
                      {localizedContent.ahtNewsTitle}
                    </h2>
                </div>
                <div className="space-y-6">
                  {localizedContent.news.map((newsItem, index) => (
                   <div className="p-3 rounded-xl" key={index}>
                    <div className="flex flex-col">
                      <div className="relative text-center mb-4">
                        <h4 className="relative z-10 text-2xl font-bold text-slate-100 font-actay-wide">{newsItem.title}</h4>
                        </div>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 z-0 opacity-5 font-actay-wide text-4xl sm:text-30xl pointer-events-none">
                         📈
                        </span>
                         <p className="text-white-50 text-xl font-light mb-1 flex-grow text-center sm:text-center">{newsItem.text}</p>
                         <div className="text-lg text-white-50 font-light mt-auto text-center sm:text-right">{newsItem.date}</div>
                       </div>
                      </div>
                  ))}
                </div>
              </section>
              
              <section>
                <div className="relative text-right mb-5">
                   
                    <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-white-50 font-actay-wide">
                      {localizedContent.buyAhtTitle}
                    </h2>
                </div>
                 <div className="p-3 rounded-xl">
                  <div className="flex flex-col items-center gap-4 mb-6 w-full">
                    <div className="relative w-full">
                      <input
                        type="number"
                        min="1000"
                        step="1"
                        value={purchaseAmount}
                        onChange={(e) => setPurchaseAmount(e.target.value === '' ? '' : Number(e.target.value))}
                        onKeyDown={handleBuyTokensKeyDown}
                        className="relative z-10 px-5 py-3 bg-slate-700/50 border-slate-600 rounded-lg font-light text-white text-2xl focus:outline-none focus:ring-2 focus:ring-green-500/70 w-full text-center"
                      />
                    </div>
                      
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={handleBuyTokens}
                      className="py-3 px-4 bg-green-500/0 border border-green-500 hover:bg-green-600 text-white text-2xl w-full ont-light whitespace-normal text-center leading-tight"
                    >
                      {`${localizedContent.buyFor} ${purchaseAmount === '' ? '0.000000' : (Number(purchaseAmount) * STATIC_PROFILE_DATA.ahtPrice).toFixed(6)} TON`}
                    </Button>
                  </div>
                   <div className="flex flex-col items-left gap-3 text-xl text-slate-100 p-4 rounded-lg w-full">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{localizedContent.minPurchase}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>{localizedContent.secureTransaction}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m-6-8h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{localizedContent.networkFee}</span>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Блок Истории транзакций */}
              <section className="mb-16">
                 <div className="rounded-xl p-4 sm:p-3">
                  <div className="relative text-left mb-6">  
                  <span className="absolute top-0 left-1/2 -translate-x-1/3 -translate-y-1/2 z-0 opacity-10 font-actay-wide text-4xl sm:text-30xl pointer-events-none">
                    🔄
                      </span>
                    <h3 className="relative z-10 text-2xl sm:text-4xl font-semibold text-slate-100 font-actay-wide">
                      {localizedContent.transactionsHistoryTitle}
                    </h3>
                  </div>
                  
                  {/* Диагностический лог перед рендерингом списка транзакций */}
                  {((): null => {
                    console.log('[Profile Render] Preparing to display transactions. Current showAllTransactions state:', showAllTransactions, 'Total transactions available:', STATIC_PROFILE_DATA.rawTransactions.length);
                    return null;
                  })()}
                  <div className="space-y-4">
                    {STATIC_PROFILE_DATA.rawTransactions
                      .slice(0, showAllTransactions ? STATIC_PROFILE_DATA.rawTransactions.length : 2)
                      .map((tx) => {
                        const typeDisplay = localizedContent.transactionTypeDisplays[tx.type];
                        const destinationDisplay = localizedContent.transactionDestinations[tx.destinationKey] || tx.destinationKey; // Fallback to key if not found

                        return (
                          <div key={tx.id} className="bg-slate-800/0 hover:bg-slate-700/70 p-4 rounded-lg shadow transition-colors duration-150">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                              <div className="mb-2 sm:mb-0">
                                <span className={`py-1 px-2.5 rounded-full text-lg font-medium ${tx.type === 'donation' ? 'bg-green-800/70 text-green-300' : tx.type === 'purchase' ? 'bg-blue-800/70 text-blue-300' : 'bg-purple-800/70 text-purple-300'}`}>
                                  {typeDisplay}
                                </span>
                                <p className="text-lg text-slate-400 mt-1">{tx.date}</p>
                              </div>
                              <p className="text-lg font-semibold text-slate-100">
                                {tx.amount > 0 ? `${tx.amount} ${tx.token}` : '-'}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg text-slate-300 truncate" title={destinationDisplay}>
                                <span className="font-medium">{localizedContent.tableDestination}: </span>{destinationDisplay}
                              </p>
                              <p className="text-md text-slate-500 font-mono truncate">
                                {`Hash: ${tx.hash.substring(0, 12)}...${tx.hash.substring(tx.hash.length - 12)}`}
                              </p>
                            </div>
                          </div>
                        );
                    })}
                  </div>
                  {STATIC_PROFILE_DATA.rawTransactions.length > 2 && (
                    <div className="mt-6 text-center">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={(e) => { 
                          console.log('[Button onClick Prop] Click event received by Button prop', e);
                          handleToggleTransactions(); 
                        }}
                        className={commonButtonCommunityStyle}
                      >
                        {showAllTransactions ? localizedContent.hideTransactionsButton : localizedContent.showAllTransactionsButton}
                      </Button>
                    </div>
                  )}
                </div>
              </section>

              {/* Блок Мои NFT - УДАЛЕН */}
              {/* ... */}

              {/* Блок Настройки профиля - ПЕРЕМЕЩЕН В МОДАЛЬНОЕ ОКНО */}
              {/* ... */}
            </div>
          </div>

          {/* Settings Modal */}
          {isSettingsModalOpen && (
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
              onClick={toggleSettingsModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="settings-modal-title"
            >
              <div 
                className="bg-[#181424] p-6 sm:p-8 rounded-xl shadow-2xl w-fullrelative border border-slate-700/80"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={toggleSettingsModal}
                  className="absolute -top-2 -right-3 text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-700/50"
                  aria-label={localizedContent.closeModalButtonLabel}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h3 id="settings-modal-title" className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-slate-100 font-actay-wide">
                  {localizedContent.profileSettingsTitle}
                </h3>
                <div className="space-y-7">
                   <div className="p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-150">
                     <label className="block text-lg font-medium text-slate-200 mb-2.5">
                        {localizedContent.notificationsTitle}
                      </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="new-proposal-notifications"
                          className="h-4 w-4 text-green-500 focus:ring-green-400 border-slate-500 rounded bg-slate-600 checked:bg-green-500 checked:border-transparent cursor-pointer"
                          defaultChecked
                        />
                         <label htmlFor="new-proposal-notifications" className="ml-3 block text-base text-slate-300 hover:text-slate-100 cursor-pointer transition-colors">
                            {localizedContent.newProposalNotificationsLabel}
                          </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="voting-results-notifications"
                          className="h-4 w-4 text-green-500 focus:ring-green-400 border-slate-500 rounded bg-slate-600 checked:bg-green-500 checked:border-transparent cursor-pointer"
                        />
                         <label htmlFor="voting-results-notifications" className="ml-3 block text-base text-slate-300 hover:text-slate-100 cursor-pointer transition-colors">
                            {localizedContent.votingResultsNotificationsLabel}
                          </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="project-news-notifications"
                          className="h-4 w-4 text-green-500 focus:ring-green-400 border-slate-500 rounded bg-slate-600 checked:bg-green-500 checked:border-transparent cursor-pointer"
                        />
                         <label htmlFor="project-news-notifications" className="ml-3 block text-base text-slate-300 hover:text-slate-100 cursor-pointer transition-colors">
                            {localizedContent.projectNewsNotificationsLabel}
                          </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="proposal-period-reminders"
                          className="h-4 w-4 text-green-500 focus:ring-green-400 border-slate-500 rounded bg-slate-600 checked:bg-green-500 checked:border-transparent cursor-pointer"
                        />
                         <label htmlFor="proposal-period-reminders" className="ml-3 block text-base text-slate-300 hover:text-slate-100 cursor-pointer transition-colors">
                            {localizedContent.proposalPeriodRemindersLabel}
                          </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-150">
                    <label className="block text-lg font-medium text-slate-200 mb-2.5">
                      {localizedContent.defaultLanguageTitle}
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="lang-ru"
                          name="defaultLanguage"
                          value="ru"
                          className="h-4 w-4 text-green-500 focus:ring-green-400 border-slate-500 bg-slate-600 checked:bg-green-500 checked:border-transparent cursor-pointer"
                          // Add checked logic based on currentLang or a new state for default lang
                          // checked={currentLang === 'ru'} // Example
                          // onChange={handleLanguageChange} // Example
                        />
                        <label htmlFor="lang-ru" className="ml-3 block text-base text-slate-300 hover:text-slate-100 cursor-pointer transition-colors">
                          {localizedContent.languageRu}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="lang-en"
                          name="defaultLanguage"
                          value="en"
                          className="h-4 w-4 text-green-500 focus:ring-green-400 border-slate-500 bg-slate-600 checked:bg-green-500 checked:border-transparent cursor-pointer"
                          // checked={currentLang === 'en'} // Example
                          // onChange={handleLanguageChange} // Example
                        />
                        <label htmlFor="lang-en" className="ml-3 block text-base text-slate-300 hover:text-slate-100 cursor-pointer transition-colors">
                          {localizedContent.languageEn}
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 text-center">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => alert(currentLang === 'ru' ? 'Кошелек отключен' : 'Wallet disconnected')}
                      className={`${commonButtonCommunityStyle} px-6 py-2.5`}
                    >
                      {localizedContent.disconnectWallet}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    );
};

export default Profile;