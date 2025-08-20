import { useState, useMemo, useCallback } from 'react';
import { useTonConnect } from '../hooks/useTonConnect';
import { useTMA } from '../hooks/useTMA';
import { Button } from '../components/ui/Button';
import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';

// Вынесем контент в отдельный объект для лучшей производительности
const homeContent = {
  ru: {
    headerMainTitle: "ANIMAL HELPER TOKEN",
    headerSubTitle: "Помогайте питомцам и зарабатывайте",
    headerDescription: "Купите монету за TON — 20% ваших средств идут на помощь приютам, а 65% обеспечивают рост её стоимости. Ваша доброта становится инвестицией. Мы сотрудничаем с приютами, ветклиниками и спасательными фондами. 20% от всех покупок монеты направляются на корм, лечение и реабилитацию животных.",
    whatIsTonLinkText: "Что такое TON?",
    tonExplanation: `TON — это система, которая позволяет людям пересылать деньги по телефону или интернету очень быстро и без лишних людей между собой — например, без банков.

Представь, что ты хочешь отправить другу деньги. Обычно это делается через банк, и может занять время. А с TON это можно сделать почти мгновенно, просто нажав несколько кнопок на телефоне.

Также с помощью TON можно делать другие вещи — например, хранить данные или использовать программы прямо в интернете, без установки чего-то на телефон.

Если коротко и ясно:
TON — это удобный способ быстро и безопасно пересылать деньги и работать с информацией через телефон или интернет, без банков и очередей.`,
    startHelpingButton: "Начать помогать",
    whyImportantTitle2: "А ещё вы можете заработать",
    whyImportantDescription2: "65% средств от продажи монеты уходят в пул ликвидности — это стабилизирует её цену и создаёт условия для роста. Чем больше людей покупают токен — тем выше его ценность.",
    animalHelpText: "помощь животным",
    coinGrowthText: "рост стоимости",
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
    advantage1_description: "Не нужно разбираться в криптовалютах: просто покупаете монету — и уже помогаете.",
    advantage2_title: "Безопасность инвестиций",
    advantage2_description: "Ликвидность обеспечивает стабильность цены. Чем дольше держите монету — тем выше шансы заработать.",
    advantage3_title: "Прозрачность",
    advantage3_description: "Все транзакции видны в блокчейне TON. Вы всегда можете проверить, как распределяются средства.",
    whatIsBlockchainLinkText: "Что такое блокчейн?",
    blockchainExplanation: `Представьте «блокчейн» как общую для всех, прозрачную тетрадь, в которую записываются все денежные переводы (транзакции). Каждая запись в этой тетради видна абсолютно всем, и её невозможно подделать или удалить. Когда вы помогаете, ваш перевод записывается в эту общую тетрадь. Вы всегда можете открыть её и убедиться, что ваши деньги дошли до счёта приюта.`,
    exampleTitle: "\"Как будто вы покупаете акцию доброты\"",
    exampleDescription: "Представьте, что вы вкладываетесь в проект, который спасает животных. Чем больше людей присоединяется, тем ценнее становится ваша \"добрая акция\".",
    catImageAlt: "Кот с табличкой 'Спасибо!' на фоне графика роста",
    finalCtaTitle: "Начните помогать прямо сейчас!",
    finalCtaStep1: "Нажмите на кнопку «Погнали»",
    finalCtaStep2: "Подключите кошелек Telegram",
    finalCtaStep3: "Купите Animal Helper Token за TON.",
    finalCtaStep4: "Участвуйте в голосованиях, предлагайте кандидатов, участвуйте в благотворительных акциях.",
    goToPurchaseButton: "Перейти к покупке →",
    faqTitle: "Часто задаваемые вопросы (FAQ)",
    faqQuestion1: "Как проверить, что средства пошли на помощь?",
    faqAnswer1: `Мы публикуем отчёты о всех переводах. Кроме того, наши партнёры — приюты, ветклиники и фонды — будут регулярно публиковать фото- и видеоотчёты о том, как были потрачены средства. Все эти отчёты вы сможете найти в разделе «Сообщество».`,
    faqQuestion2: "Почему цена монеты будет расти и как на этом заработать?",
    faqAnswer2: `Ваш заработок связан с ростом цены токена. Вот как это работает:\n\n1. Создание ценности:\n65% от каждой покупки токена направляются в специальный «фонд» (пул ликвидности). Этот фонд служит гарантией того, что токен всегда можно продать или купить.\n\n2. Рост спроса:\nЧем больше людей узнаёт о проекте и покупает токены, тем больше денег поступает в этот фонд. Это увеличивает стоимость каждого отдельного токена.\n\n3. Ваша выгода:\nВы покупаете токен по одной цене. Со временем, по мере роста популярности проекта, цена токена растёт, и вы можете продать его дороже, зафиксировав прибыль. По сути, вы инвестируете в доброе дело, которое со временем становится ценнее.`,
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
    headerDescription: "Buy the coin with TON — 20% of your funds go to help shelters, and 65% ensure its value growth. Your kindness becomes an investment. We collaborate with shelters, veterinary clinics, and rescue foundations. 20% of all coin purchases are directed to food, treatment, and rehabilitation for animals.",
    whatIsTonLinkText: "What is TON?",
    tonExplanation: `TON is a system that allows people to send money by phone or internet very quickly and without intermediaries — for example, without banks.

Imagine you want to send money to a friend. Usually, this is done through a bank and can take time. But with TON, you can do it almost instantly, just by pressing a few buttons on your phone.

You can also do other things with TON — for example, store data or use programs directly on the internet, without installing anything on your phone.

In short and clear terms:
TON is a convenient way to quickly and securely send money and work with information via your phone or the internet, without banks and queues.`,
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
    advantage3_description: "All transactions are visible on the TON blockchain. You can always check how the funds are distributed.",
    whatIsBlockchainLinkText: "What is a blockchain?",
    blockchainExplanation: `Imagine the «blockchain» as a shared, transparent notebook where all money transfers (transactions) are recorded. Every entry in this notebook is visible to everyone, and it's impossible to forge or delete. When you help, your transfer is recorded in this shared notebook. You can always open it and verify that your money reached the shelter's account.`,
    exampleTitle: "\"It's like buying a share of kindness\"",
    exampleDescription: "Imagine investing in a project that saves animals. The more people join, the more valuable your \"kindness share\" becomes.",
    catImageAlt: "Cat with a 'Thank You!' sign against a growth chart background",
    finalCtaTitle: "Start helping right now!",
    finalCtaStep1: "Click the «Let's Go» button",
    finalCtaStep2: "Connect your Telegram wallet",
    finalCtaStep3: "Buy Animal Helper Token with TON.",
    finalCtaStep4: "Participate in votings, propose candidates, and take part in charity events.",
    goToPurchaseButton: "Go to Purchase →",
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqQuestion1: "How to verify that funds went to help?",
    faqAnswer1: `We publish reports on all transfers. In addition, our partners—shelters, veterinary clinics, and foundations—will regularly publish photo and video reports on how the funds were spent. You can find all these reports in the 'Community' section.`,
    faqQuestion2: "Why will the coin price grow and how can I earn from it?",
    faqAnswer2: `Your earnings are tied to the growth of the token's price. Here's how it works:\n\n1.  Creating Value:\n65% of every token purchase goes into a special "fund" (the liquidity pool). This fund guarantees that the token can always be bought or sold.\n\n2.  Growing Demand:\nThe more people learn about the project and buy tokens, the more money flows into this fund. This increases the value of each individual token.\n\n3.  Your Benefit:\nYou buy the token at one price. Over time, as the project's popularity grows, the token's price increases, and you can sell it for a profit. Essentially, you are investing in a good cause that becomes more valuable over time.`,
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
  const [isTonModalVisible, setIsTonModalVisible] = useState(false);
  const [isBlockchainModalVisible, setIsBlockchainModalVisible] = useState(false);
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');

  const commonButtonCommunityStyle = useMemo(() => 
    "text-green-400 border-green-400 hover:bg-green-500 hover:text-white",
    []
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(prevLang => prevLang === 'ru' ? 'en' : 'ru');
  }, []);

  const currentContent = useMemo(() => homeContent[language], [language]);

  const handleNavigate = useCallback((path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  }, [navigate]);

  const toggleFaq = useCallback(() => {
    setIsFaqVisible(prev => !prev);
  }, []);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  }, []);

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
              <div className="mb-8 text-left">
                <p className="text-xl text-slate-100">
                  {currentContent.headerDescription}
                </p>
                <button
                  onClick={() => setIsTonModalVisible(true)}
                  className="text-green-400 hover:underline mt-4 font-semibold text-xl"
                >
                  {currentContent.whatIsTonLinkText}
                </button>
              </div>
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
            <p className="text-xl text-slate-100 mb-0 text-right">
              {currentContent.whyImportantDescription2}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-5 md:space-y-0">
              <div className="text-center p-2 rounded-lg">
                <div className="flex items-center justify-center text-5xl mb-1 pointer-events-none">
                  <span>🐶</span>
                  <span className="mx-1">+</span>
                  <span>💉</span>
                </div>
                <p className="-mt-10 text-lg text-slate-50">{currentContent.animalHelpText}</p> 
              </div>
              <div className="text-center p-2 rounded-lg">
                <div className="flex items-center justify-center text-5xl mb-1 pointer-events-none">
                  <span>💰</span>
                  <span className="mx-1">+</span>
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
              <ol className="list-decimal list-inside space-y-0 text-xl text-slate-50 text-left">
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
              <div className="flex flex-col items-end">
                <div className="relative text-right mb-0">
                    <span className="absolute top-40 left-2/3 -translate-x-1/2 -translate-y-1/2 z-0 opacity-20 text-4xl sm:text-30xl pointer-events-none">✅</span>
                    <h3 className="relative z-10 text-2xl font-bold text-slate-100 font-actay-wide">
                        {currentContent.advantage1_title}
                    </h3>
                </div>
                <p className="text-xl text-slate-50 text-right max-w-md">
                  {currentContent.advantage1_description}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="relative text-right mb-0">
                    <h3 className="relative z-10 text-2xl sm:text-2xl font-medium text-slate-100 font-actay-wide">
                         {currentContent.advantage2_title}
                    </h3>
                    </div>
                <p className="text-xl text-slate-50 text-right max-w-md">
                  {currentContent.advantage2_description}
                </p>
                  </div>
              <div className="flex flex-col items-end">
                <div className="relative text-right mb-0">
                    <h3 className="relative z-10 text-2xl sm:text-2xl font-medium text-slate-100 font-actay-wide">
                        {currentContent.advantage3_title}
                    </h3>
                </div>
                <p className="text-xl text-slate-50 text-right max-w-md">
                  {currentContent.advantage3_description}
                  <button
                    onClick={() => setIsBlockchainModalVisible(true)}
                    className="text-green-400 hover:underline ml-2 font-semibold"
                  >
                    ({currentContent.whatIsBlockchainLinkText})
                  </button>
                </p>
              </div>
            </div>
          </section>

          <section 
            className="my-16 text-left relative"
          >
            <div className="relative z-10 py-1 px-1">
              <div className="relative text-right mb-7">
                <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-green-400 font-actay-wide">
                    {currentContent.exampleTitle}
                </h2>
                  </div>
              <p className="text-xl text-slate-200 text-left">
                {currentContent.exampleDescription}
                  </p>
                </div>
          </section>

          <section className="my-16 py-1 text-right">
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
              <li>{currentContent.finalCtaStep4}</li>
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
                  </p>
                </div>
                <div className="w-full">
                  <div className="relative text-right mb-4">
                    <h4 className="relative z-10 text-2xl font-medium text-slate-50 font-actay-wide">
                        {currentContent.faqQuestion2}
                    </h4>
                  </div>
                  <p className="text-left mb-12 text-xl text-slate-50 whitespace-pre-wrap">
                    {currentContent.faqAnswer2}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
        {isTonModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E172B] border border-slate-700 rounded-lg p-6 max-w-2xl w-full relative">
              <h3 className="text-2xl font-bold text-green-400 mb-4">{currentContent.whatIsTonLinkText}</h3>
              <div className="text-slate-200 space-y-4 whitespace-pre-wrap max-h-[70vh] overflow-y-auto">
                {currentContent.tonExplanation}
              </div>
              <button
                onClick={() => setIsTonModalVisible(false)}
                className="absolute top-3 right-4 text-3xl font-light text-slate-400 hover:text-white"
                aria-label="Закрыть"
              >
                &times;
              </button>
            </div>
          </div>
        )}
        {isBlockchainModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E172B] border border-slate-700 rounded-lg p-6 max-w-2xl w-full relative">
              <h3 className="text-2xl font-bold text-green-400 mb-4">{currentContent.whatIsBlockchainLinkText}</h3>
              <div className="text-slate-200 space-y-4 whitespace-pre-wrap max-h-[70vh] overflow-y-auto">
                {currentContent.blockchainExplanation}
              </div>
              <button
                onClick={() => setIsBlockchainModalVisible(false)}
                className="absolute top-3 right-4 text-3xl font-light text-slate-400 hover:text-white"
                aria-label="Закрыть"
              >
                &times;
              </button>
            </div>
        </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Home; 