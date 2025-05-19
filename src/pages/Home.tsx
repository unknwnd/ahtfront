import { useState } from 'react';
import { useTonConnect } from '../hooks/useTonConnect';
import { useTMA } from '../hooks/useTMA';
import { Button } from '../components/ui/Button';
import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';

const homeContent = {
  ru: {
    headerMainTitle: "ANIMAL HELPER TOKEN",
    headerSubTitle: "Помогайте питомцам и зарабатывайте",
    headerDescription: "Купите монету за TON — 20% ваших средств идут на помощь приютам, а 65% обеспечивают рост её стоимости. Ваша доброта становится инвестицией.Мы сотрудничаем с приютами, ветклиниками и спасательными фондами. 20% от всех покупок монеты направляются на корм, лечение и реабилитацию животных.",
    startHelpingButton: "Начать помогать",
    whyImportantTitle2: "А ещё вы можете заработать",
    whyImportantDescription2: "65% средств от продажи монеты уходят в пул ликвидности — это стабилизирует её цену и создаёт условия для роста. Чем больше людей покупают токен — тем выше его ценность.",
    animalHelpText: "помощь животным",
    coinGrowthText: "рост стоимости монеты",
    howItWorksTitle: "Как это работает?",
    step1_buyCoin: "Купите монету за TON:",
    step1_description: "Просто нажмите \"Купить\" в приложении.",
    step2_distributeFunds: "Мы распределяем средства:",
    step2_listItem1: "20% → Фонды помощи животным",
    step2_listItem2: "65% → Пул ликвидности (цена токена растёт)",
    step2_listItem3: "15% → Расходы на развитие проекта",
    step3_trackPrice: "Следите за ценой и пользуйтесь выгодой:",
    step3_description: "Цена токена растёт вместе с популярностью проекта. Вы можете продать монету позже дороже.",
    advantagesTitle: "Преимущества Animal Helper Token",
    advantage1_title: "Помощь без сложностей",
    advantage1_description: "Не нужно разбираться в крипте: просто покупаете монету — и уже помогаете.",
    advantage2_title: "Безопасность инвестиций",
    advantage2_description: "Ликвидность обеспечивает стабильность цены. Чем дольше держите токен — тем выше шансы заработать.",
    advantage3_title: "Прозрачность",
    advantage3_description: "Все транзакции видны в блокчейне TON. Вы всегда можете проверить, как распределяются средства.",
    exampleTitle: "\"Как будто вы покупаете акцию доброты\"",
    exampleDescription: "Представьте, что вы вкладываетесь в проект, который спасает животных. Чем больше людей присоединяется, тем ценнее становится ваша \"добрая акция\".",
    catImageAlt: "Кот с табличкой 'Спасибо!' на фоне графика роста",
    finalCtaTitle: "Начните помогать прямо сейчас!",
    finalCtaStep1: "Откройте бота @AnimalHelperBot.",
    finalCtaStep2: "Купите Animal Helper Token за TON.",
    finalCtaStep3: "Следите за ценой и участвуйте в благотворительных акциях.",
    goToPurchaseButton: "Перейти к покупке →",
    faqTitle: "Часто задаваемые вопросы (FAQ)",
    faqQuestion1: "Что такое TON?",
    faqAnswer1: "Это криптовалюта, созданная Telegram.",
    faqLearnMoreLink: "Узнайте, как её купить →",
    faqQuestion2: "Как проверить, что средства пошли на помощь?",
    faqAnswer2: "Все транзакции публикуются в открытом блокчейне. Мы также публикуем отчёты о переводах.",
    faqQuestion3: "Почему цена монеты будет расти?",
    faqAnswer3: "Чем больше людей покупают токен, тем выше спрос. А 65% средств в пуле ликвидности гарантируют стабильность и рост цены.",
    connectWalletButton: "Подключить кошелек TON",
    walletConnectedButton: "Кошелек подключен",
    teamInterviewTitle: "💬 Интервью с командой",
    teamInterviewPreview: "Превью видео или аудиоинтервью с основателями, где рассказывается о миссии проекта.",
    watchInterviewButton: "Смотреть интервью",
    toggleToEnglish: "Switch to English",
    toggleToRussian: "Переключить на Русский",
    letsGoButton: "Погнали!"
  },
  en: {
    headerMainTitle: "ANIMAL HELPER TOKEN",
    headerSubTitle: "Help pets and earn",
    headerDescription: "Buy the coin with TON — 20% of your funds go to help shelters, and 65% ensure its value growth. Your kindness becomes an investment.We collaborate with shelters, veterinary clinics, and rescue foundations. 20% of all coin purchases are directed to food, treatment, and rehabilitation for animals.",
    startHelpingButton: "Start Helping",
    whyImportantTitle2: "And you can also earn!",
    whyImportantDescription2: "65% of the funds from coin sales go to the liquidity pool — this stabilizes its price and creates conditions for growth. The more people buy the token — the higher its value.",
    animalHelpText: "Animal aid",
    coinGrowthText: "Coin value growth",
    howItWorksTitle: "How does it work?",
    step1_buyCoin: "Buy the coin with TON:",
    step1_description: "Just click \"Buy\" in the app.",
    step2_distributeFunds: "We distribute the funds:",
    step2_listItem1: "20% → Animal welfare funds",
    step2_listItem2: "65% → Liquidity pool (token price grows)",
    step2_listItem3: "15% → Project development expenses",
    step3_trackPrice: "Track the price and enjoy the benefits:",
    step3_description: "The token price grows with the project's popularity. You can sell the coin later for a higher price.",
    advantagesTitle: "Advantages of Animal Helper Token",
    advantage1_title: "Help without complications",
    advantage1_description: "No need to understand crypto: just buy the coin — and you're already helping.",
    advantage2_title: "Investment security",
    advantage2_description: "Liquidity ensures price stability. The longer you hold the token — the higher the chances of earning.",
    advantage3_title: "Transparency",
    advantage3_description: "All transactions are visible on the TON blockchain. You can always check how funds are distributed.",
    exampleTitle: "\"It's like buying a share of kindness\"",
    exampleDescription: "Imagine investing in a project that saves animals. The more people join, the more valuable your \"kindness share\" becomes.",
    catImageAlt: "Cat with a 'Thank You!' sign against a growth chart background",
    finalCtaTitle: "Start helping right now!",
    finalCtaStep1: "Open the @AnimalHelperBot.",
    finalCtaStep2: "Buy Animal Helper Token with TON.",
    finalCtaStep3: "Track the price and participate in charity events.",
    goToPurchaseButton: "Go to Purchase →",
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqQuestion1: "What is TON?",
    faqAnswer1: "It's a cryptocurrency created by Telegram.",
    faqLearnMoreLink: "Learn how to buy it →",
    faqQuestion2: "How to verify that funds went to help?",
    faqAnswer2: "All transactions are published on the public blockchain. We also publish transfer reports.",
    faqQuestion3: "Why will the coin price grow?",
    faqAnswer3: "The more people buy the token, the higher the demand. And 65% of funds in the liquidity pool guarantee stability and price growth.",
    connectWalletButton: "Connect TON Wallet",
    walletConnectedButton: "Wallet Connected",
    teamInterviewTitle: "💬 Team Interview",
    teamInterviewPreview: "Preview of a video or audio interview with the founders discussing the project's mission.",
    watchInterviewButton: "Watch Interview",
    toggleToEnglish: "Switch to English",
    toggleToRussian: "Switch to Russian",
    letsGoButton: "Let's Go!"
  }
};

const Home = () => {
  useTonConnect();
  useTMA();
  const navigate = useNavigate();
  
  const [isFaqVisible, setIsFaqVisible] = useState(false);
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');

  const commonButtonCommunityStyle = "text-green-400 border-green-400 hover:bg-green-500 hover:text-white";

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'ru' ? 'en' : 'ru');
  };

  const currentContent = homeContent[language];

  const handleNavigate = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  const toggleFaq = () => {
    setIsFaqVisible(!isFaqVisible);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };

  return (
    <PageTransition>
      <div 
        className="min-h-screen w-full -my-4 text-slate-50 relative overflow-hidden p-3"
        style={{
          backgroundImage: 'radial-gradient(ellipse farthest-corner at 15% 25%, hsla(80, 99%, 54%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 80% 45%, hsla(323, 100%, 59%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 20% 75%, hsla(227, 78%, 42%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 70% 15%, hsla(268, 85%, 54%, 0.15) 0%, transparent 70%), radial-gradient(ellipse at center, hsla(323, 100%, 59%, 0.12) 0%, transparent 65%)',
          backgroundColor: '#1E172B'
        }}
      >
        <Button 
            onClick={toggleLanguage} 
            variant="outline"
            className="absolute top-0 right-0 z-20 border-slate-400/0 hover:border-slate-300 text-white text-2xl"
            aria-label={language === 'ru' ? currentContent.toggleToEnglish : currentContent.toggleToRussian}
        >
            {language === 'ru' ? 'EN' : 'RU'}
        </Button>

        <div className="w-full relative z-10">
          <header className="mb-10 text-left relative">
            <div className="relative z-10 mt-14">
              <div className="relative text-center">            
                    <h1 className="relative z-10 text-6xl md:text-7xl font-semibold text-left mb-16 text-green-50 font-slate-50">
                  {(() => {
                    const words = currentContent.headerMainTitle.split(' ');
                    if (words.length === 3) {
                      return (
                        <>
                        <span className="absolute top-2/3 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0 opacity-20 text-3xl sm:text-35xl pointer-events-none">🦁</span>
                          <div className="leading-none mb-[-1px] font-actay-wide">{words[0]}</div>
                          <div className="leading-none mb-[-1px] font-actay-wide">{words[1]}</div>
                          <div className="leading-none font-actay-wide">{words[2]}</div>
                        </>
                      );
                    }
                    return currentContent.headerMainTitle.split(' ').map((word, index, arr) => (
                      <div key={index} className={`leading-none ${index < arr.length - 1 ? "mb-[-10px]" : ""} font-actay-wide`}>
                        {word}
                      </div>
                    ));
                  })()}
                </h1>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-right mb-16 text-green-400 font-actay-wide">
                {currentContent.headerSubTitle}
              </h2>
              <p className="text-xl text-slate-100 mb-8 text-center">
                {currentContent.headerDescription}
                
              </p>
            </div>
          </header>

          <section className="my-1 py-1">
            <div className="text-center">
              <p className="text-xl text-slate-100 text-left  mb-1">
               </p>
            </div>
            
            <div className="relative text-left mb-16">
                <span className="absolute top-1/2 left-1/3 -translate-x-1/4 -translate-y-1/2 z-0 opacity-40 text-5xl sm:text-15xl flex gap-x-2 sm:gap-x-3 pointer-events-none">
                  <span className="text-green-400">$</span>
                  <span className="text-blue-400">€</span>
                  <span className="text-red-400">¥</span>
                  <span className="text-purple-400">₽</span>
                </span>
                <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-green-400 font-actay-wide mb-4">
                    {currentContent.whyImportantTitle2}
                </h2>
            </div>
            <p className="text-xl text-slate-100 mb-0 text-center">
              {currentContent.whyImportantDescription2}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-5 md:space-y-0">
              <div className="text-center p-2 rounded-lg">
                <div className="flex items-center justify-center text-5xl mb-5 pointer-events-none">
                  <span>🐶</span>
                  <span className="mx-2">+</span>
                  <span>💉</span>
                </div>
                <p className="-mt-10 text-lg text-slate-50">{currentContent.animalHelpText}</p> 
              </div>
              <div className="text-center p-2 rounded-lg">
                <div className="flex items-center justify-center text-5xl mb-1 pointer-events-none">
                  <span>💰</span>
                  <span className="mx-2">+</span>
                  <span>📈</span>
                </div>
                <p className="-mt-10 text-lg text-slate-50">{currentContent.coinGrowthText}</p> 
              </div>
            </div>
          </section>

          <section 
            className="my-10 text-center relative"
          >
            <div className="relative z-10 py-1 px-1">
            <span className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-0 opacity-20 text-3xl sm:text-30xl pointer-events-none">🤷</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-right mb-16 text-green-400 font-actay-wide">
                {currentContent.howItWorksTitle}
              </h2>
              <ol className="list-decimal list-inside space-y-0 text-xl text-slate-50 ext-center">
                <li>
                  <strong>{currentContent.step1_buyCoin} {currentContent.step1_description}</strong>
                </li>
                <li> 
                  <strong>{currentContent.step2_distributeFunds}</strong>
                  <ul className="list-disc list-inside ml-4 sm:ml-8 mt-1 text-xl text-slate-50 inline-block align-top">
                    <li>{currentContent.step2_listItem1}</li>
                    <li>{currentContent.step2_listItem2}</li>
                    <li>{currentContent.step2_listItem3}</li>
                  </ul>
                </li>
                <li>
                  <strong>{currentContent.step3_trackPrice}</strong> {currentContent.step3_description}
                </li>
              </ol>
            </div>
          </section>

          <section className="my-16 py-4">
            <h2 className="text-3xl sm:text-4xl font-semibold text-left mb-12 text-green-400 font-actay-wide">
              {currentContent.advantagesTitle}
            </h2>
            <div className="space-y-10">
              <div className="flex flex-col items-center">
                <div className="relative text-center mb-0">
                    <span className="absolute top-40 left-2/3 -translate-x-1/2 -translate-y-1/2 z-0 opacity-20 text-4xl sm:text-30xl pointer-events-none">✅</span>
                    <h3 className="relative z-10 text-2xl font-bold text-slate-100 font-actay-wide">
                        {currentContent.advantage1_title}
                    </h3>
                </div>
                <p className="text-xl text-slate-50 text-center max-w-md">
                  {currentContent.advantage1_description}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative text-center mb-0">
                    <h3 className="relative z-10 text-2xl sm:text-2xl font-medium text-slate-100 font-actay-wide">
                         {currentContent.advantage2_title}
                    </h3>
                </div>
                <p className="text-xl text-slate-50 text-center max-w-md">
                  {currentContent.advantage2_description}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative text-center mb-0">
                    <h3 className="relative z-10 text-2xl sm:text-2xl font-medium text-slate-100 font-actay-wide">
                        {currentContent.advantage3_title}
                    </h3>
                </div>
                <p className="text-xl text-slate-50 text-center max-w-md">
                  {currentContent.advantage3_description}
                </p>
              </div>
            </div>
          </section>

          <section 
            className="my-16 text-center relative"
          >
            <div className="relative z-10 py-1 px-1">
              <div className="relative text-right mb-7">
                <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-green-400 font-actay-wide">
                    {currentContent.exampleTitle}
                </h2>
              </div>
              <p className="text-xl text-slate-200 text-center">
                {currentContent.exampleDescription}
              </p>
            </div>
          </section>

          <section className="my-16 py-1 text-center">
            <div className="relative text-left mb-10">
                <span className="absolute top-2/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 text-3xl sm:text-30xl pointer-events-none">🚀</span>
                <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-green-400 font-actay-wide">
                    {currentContent.finalCtaTitle}
                </h2>
            </div>
            <ol className="mb-10 text-xl text-slate-50">
              <li>{currentContent.finalCtaStep1}</li>
              <li>{currentContent.finalCtaStep2}</li>
              <li>{currentContent.finalCtaStep3}</li>
            </ol>
            <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigate('/profile')}
                onKeyDown={(e) => handleKeyDown(e, () => handleNavigate('/profile'))}
                aria-label={currentContent.letsGoButton}
                className={commonButtonCommunityStyle + " text-lg w-full sm:w-auto"}
              >
                {currentContent.letsGoButton}
              </Button>
            </div>
          </section>

          <section className="my-16 py-1">
            
            <button
              onClick={toggleFaq}
              onKeyDown={(e) => handleKeyDown(e, toggleFaq)}
              aria-expanded={isFaqVisible}
              className="w-full text-2xl sm:text-4xl text-left mb-6 text-slate-100 flex justify-between items-center p-4 bg-slate-800/0 hover:bg-slate-700/0 font-actay-wide"
            >
              <span className="flex-grow">{currentContent.faqTitle}</span>
              <span className="pointer-events-none text-2xl">{isFaqVisible ? '➖' : '➕'}</span>
            </button>
            {isFaqVisible && (
              <div className="space-y-8 text-lg text-slate-200 py-4 px-2 sm:px-0">
                <div className="w-full">
                  <div className="relative text-right mb-4">
                    <span className="absolute top-1/4 left-1/2 -translate-x-1/3 -translate-y-1/2 z-0 opacity-20 text-30xl pointer-events-none">❓</span>
                    <h4 className="relative z-10 text-2xl font-medium text-slate-50 font-actay-wide">
                        {currentContent.faqQuestion1}
                    </h4>
                  </div>
                  <p className="text-left mb-12 text-xl text-slate-50">
                    {currentContent.faqAnswer1} 
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); navigate('/purchase-options'); }} 
                      className="text-green-500 hover:underline"
                    > {currentContent.faqLearnMoreLink}</a>
                  </p>
                </div>
                <div className="w-full">
                  <div className="relative text-right mb-4">
                    <h4 className="relative z-10 text-2xl font-medium text-slate-50 font-actay-wide">
                        {currentContent.faqQuestion2}
                    </h4>
                  </div>
                  <p className="text-left mb-12 text-xl text-slate-50">
                    {currentContent.faqAnswer2}
                  </p>
                </div>
                <div className="">
                  <div className="relative text-right mb-4">
                    <h4 className="relative z-10 text-2xl font-medium text-slate-50 font-actay-wide">
                        {currentContent.faqQuestion3}
                    </h4>
                  </div>
                  <p className="text-left mb-12 text-xl text-slate-50">
                    {currentContent.faqAnswer3}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home; 