import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Button } from '../components/ui/Button';
import redditLogoFile from '../assets/reddit.svg';
import xLogoFile from '../assets/X_logo_2023_original.svg';
import telegramLogoFile from '../assets/telegram.svg';
import instagramLogoFile from '../assets/instagram.svg';
import coindeskLogo from '../assets/coindesk.png';
import forklogLogo from '../assets/forklog.png';
import rbcLogo from '../assets/rbc.png';
// import { GlobeAltIcon, ArrowTopRightOnSquareIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // Оставляем эту строку закомментированной, если она не нужна

const communityContent = {
  ru: {
    pageTitle: "Комьюнити AHT",
    headerMainTitle: "ЖИВОЙ УГОЛОК AHT",
    headerDescription: "Следите за новостями, отчетами и успехами проекта. Ваша доброта меняет жизни животных — убедитесь сами.",
    viewUpdatesButton: "Смотреть обновления →",

    projectNewsTitle: "📢 Мы в соцсетях",
    joinConversationText: "Присоединяйтесь к обсуждению",
    communityArticles: [ 
      { title: "Animal Helper Token: Как крипта спасает животных", link: "#" },
      { title: "ТОП-5 благотворительных токенов 2024", link: "#" }
    ],
    readFullArticleButton: "Читать полностью",
    projectUpdateExample: "Недавно мы добавили возможность фильтрации приютов по регионам и виду помощи!",
    updateHistoryButton: "История обновлений →",
    
    shelterReportsTitle: "🐾 Отчеты от приютов",
    factsAndFiguresTitle: "📊 Цифры и факты",
    shelterReportExamples: [
      { title: "Как прошла стерилизация кошек в Санкт-Петербурге", type: "video", link: "#" },
      { title: "Новый вольер для собак в Казани", type: "photo", link: "#" }
    ],
    interactiveMapText: "Точки на карте с отметками приютов, куда направлены средства. Нажатие — детали перевода.",
    stats: {
      animalsTreated: "200 животных получили лечение",
      sheltersSupported: "50 приютов поддержано",
      foodPurchased: "10000 кг корма закуплено"
    },
    viewAllReportsButton: "Смотреть все отчеты →",

    mediaMentionsTitle: "🗞️ Статьи о нас",
    mediaQuotes: [
      { source: "Coindesk", quote: "Animal Helper Token — пример, как блокчейн может решать социальные задачи.", logo: "coindesk.png" },
      { source: "Forklog", quote: "Инновационный подход к благотворительности на базе TON.", logo: "forklog.png" },
      { source: "РБК Крипта", quote: "AHT демонстрирует потенциал Web3 для социального блага.", logo: "rbc.png" }
    ],

    communityParticipationTitle: "🤝 Станьте частью изменений",
    votingTitle: "Как распределить следующие 20% средств? Голосуйте за приюты или ветклиники.",
    userStoryExample: "Покупаю AHT ежемесячно — знаю, что помогаю животным и инвестирую в будущее.",
    forumDiscussionText: "Присоединяйтесь к обсуждению идей для развития проекта в нашем чате.",
    participateInVotingButton: "Участвовать в голосовании →",
    goToChatButton: "Перейти в чат",

    finalCtaTitle: "💬 Делитесь историей Animal Helper Token!",
    finalCtaDescription: "Подписывайтесь на каналы, делитесь новостями, участвуйте в обсуждениях. Чем больше людей знает о проекте — тем больше помощи получат животные.",
    shareInSocialMediaButton: "Поделиться",
    toggleToEnglish: "Switch to English",
    toggleToRussian: "Переключить на Русский",
    projectsToHelpButton: "Посмотреть проекты для помощи"
  },
  en: {
    pageTitle: "AHT Community",
    headerMainTitle: "AHT LIVE CORNER",
    headerDescription: "Follow project news, reports, and successes. Your kindness changes animals' lives — see for yourself.",
    viewUpdatesButton: "View Updates →",

    projectNewsTitle: "📢 We are on social media",
    joinConversationText: "Join the conversation",
    communityArticles: [
      { title: "Animal Helper Token: How Crypto Saves Animals", link: "#" },
      { title: "TOP 5 Charity Tokens of 2024", link: "#" }
    ],
    readFullArticleButton: "Read Full Article",
    projectUpdateExample: "We recently added the ability to filter shelters by region and type of assistance!",
    updateHistoryButton: "Update History →",
    
    shelterReportsTitle: "🐾 Shelter Reports",
    factsAndFiguresTitle: "📊 Facts and Figures",
    shelterReportExamples: [
      { title: "Cat Sterilization in Saint Petersburg: How It Went", type: "video", link: "#" },
      { title: "New Dog Enclosure in Kazan", type: "photo", link: "#" }
    ],
    interactiveMapText: "Points on the map with shelter locations where funds have been directed. Click for transfer details.",
    stats: {
      animalsTreated: "200 animals received treatment",
      sheltersSupported: "50 shelters supported",
      foodPurchased: "10,000 kg of food purchased"
    },
    viewAllReportsButton: "View All Reports →",

    mediaMentionsTitle: "🗞️ Articles About Us",
    mediaQuotes: [
      { source: "Coindesk", quote: "Animal Helper Token is an example of how blockchain can solve social problems.", logo: "coindesk.png" },
      { source: "Forklog", quote: "An innovative approach to charity based on TON.", logo: "forklog.png" },
      { source: "RBC Crypto", quote: "AHT demonstrates the potential of Web3 for social good.", logo: "rbc.png" }
    ],

    communityParticipationTitle: "🤝 Become Part of the Change",
    votingTitle: "How should the next 20% of funds be allocated? Vote for shelters or vet clinics.",
    userStoryExample: "I buy AHT monthly — I know I'm helping animals and investing in the future.",
    forumDiscussionText: "Join the discussion of project development ideas in our chat.",
    participateInVotingButton: "Participate in Voting →",
    goToChatButton: "Go to Chat",

    finalCtaTitle: "💬 Share the Animal Helper Token Story!",
    finalCtaDescription: "Subscribe to channels, share news, participate in discussions. The more people know about the project, the more help animals will receive.",
    shareInSocialMediaButton: "Share",
    toggleToEnglish: "Switch to English",
    toggleToRussian: "Switch to Russian",
    projectsToHelpButton: "View Projects to Help"
  }
};

const Community = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const content = communityContent[language];

  const logoImageMap: { [key: string]: string } = {
    'coindesk.png': coindeskLogo,
    'forklog.png': forklogLogo,
    'rbc.png': rbcLogo,
  };

  const commonButtonClassName = "text-green-400 border-green-400 hover:bg-green-500 hover:text-white";

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'ru' ? 'en' : 'ru');
  };

  const handleNavigate = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };

  return (
    <PageTransition>
      <div
        className="min-h-screen w-full text-slate-50 relative overflow-hidden p-3"
        style={{
          backgroundImage: 'radial-gradient(ellipse farthest-corner at 15% 25%, hsla(80, 99%, 54%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 80% 45%, hsla(323, 100%, 59%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 20% 75%, hsla(227, 78%, 42%, 0.2) 0%, transparent 70%), radial-gradient(ellipse farthest-corner at 70% 15%, hsla(268, 85%, 54%, 0.15) 0%, transparent 70%), radial-gradient(ellipse at center, hsla(323, 100%, 59%, 0.12) 0%, transparent 65%)',
          backgroundColor: '#1E172B'
        }}
      >
        <Button 
            onClick={toggleLanguage} 
            variant="outline"
            className="absolute top-0 left-0 z-20 border-slate-400/0 hover:border-slate-300 text-white text-2xl"
            aria-label={language === 'ru' ? content.toggleToEnglish : content.toggleToRussian}
        >
            {language === 'ru' ? 'EN' : 'RU'}
        </Button>

        <div className="w-full px-1 py-1 relative z-10">
          {/* Заголовок (первый экран) */}
          <header className="mb-1 text-right py-5 relative">
            <div className="relative text-right mt-14">
              <h1 className="relative z-10 text-6xl md:text-7xl font-semibold text-right mb-16 text-green-400">
                {(() => {
                  const words = content.headerMainTitle.split(' ');
                  if (words.length === 3) {
                    return (
                      <>
                       <span className="absolute top-2/3 left-1/2 -translate-x-1/4 -translate-y-1/2 z-0 opacity-20 text-4xl sm:text-35xl pointer-events-none">🙏</span>
                        <div className="leading-none mb-[-1px] font-actay-wide">{words[0]}</div>
                        <div className="leading-none mb-[-1px] font-actay-wide">{words[1]}</div>
                        <div className="leading-none mb-[-15px] font-actay-wide">{words[2]}</div>
                      </>
                    );
                  }
                  return content.headerMainTitle.split(' ').map((word, index, arr) => (
                    <div key={index} className={`leading-none ${index < arr.length - 1 ? "mb-[-5px]" : ""} font-actay-wide`}>
                      {word}
                    </div>
                  ));
                })()}
              </h1>
            </div>
            <p className="text-2xl text-slate-200 mb-[-30px] text-center">
              {content.headerDescription}
            </p>
          </header>

          {/* Блок 1: Мы в соцсетях */}
          <section className="my-16 py-8">
            <div className="relative text-left mb-10">
             
              <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-green-400 font-actay-wide">
                {content.projectNewsTitle.substring(2)}
              </h2>
              
            </div>
            
            <div className="flex justify-center space-x-2 mb-20">
              <button 
                onClick={() => handleNavigate('https://t.me/yourchannel')} 
                aria-label="Telegram" 
                className="text-slate-300 hover:text-green-400 transition-colors duration-200 focus:outline-none"
              >
                <img src={telegramLogoFile} alt="Telegram Logo" className="w-14 h-14" />
              </button>
              <button 
                onClick={() => handleNavigate('https://instagram.com/yourprofile')} 
                aria-label="Instagram" 
                className="text-slate-300 hover:text-green-400 transition-colors duration-200 focus:outline-none"
              >
                <img src={instagramLogoFile} alt="Instagram Logo" className="w-14 h-14" />
              </button>
              <button 
                onClick={() => handleNavigate('https://twitter.com/yourhandle')} 
                aria-label="X (Twitter)" 
                className="text-slate-300 hover:text-green-400 transition-colors duration-200 focus:outline-none"
              >
                <img src={xLogoFile} alt="X Logo" className="w-14 h-14" />
              </button>
              <button 
                onClick={() => handleNavigate('#reddit-link')} 
                aria-label="Reddit" 
                className="text-slate-300 hover:text-green-400 transition-colors duration-200 focus:outline-none"
              >
                <img src={redditLogoFile} alt="Reddit Logo" className="w-14 h-14" />
              </button>
              
            </div>
          </section>

          {/* Блок 2: Отчеты от приютов */}
          <section className="my-[-60px] py-[-60px]">
            <div className="relative text-left mb-10">
                            <h2 className="relative z-10 text-4xl font-semibold text-green-400 font-actay-wide">
                {content.shelterReportsTitle.substring(2)}
              </h2>
              <div className="flex flex-row flex-wrap justify-center gap-10 lg:gap-20">
                {content.shelterReportExamples.map((report, index) => (
                  <div key={index} className="max-w-xs bg-slate-800/0 p-2 rounded-lg hover:bg-slate-700/0 transition-colors duration-300 flex flex-col">
                    <div className="aspect-video bg-slate-700/60 rounded-md mb-3 flex items-center justify-center text-slate-50 text-4xl">
                      {report.type === 'video' ? '🎬' : '📸'}
                      
                    </div>
                    <h4 className="text-xl font-light text-slate-50 truncate mt-auto" title={report.title}>{report.title}</h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative text-right mb-1">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 z-0 opacity-20 text-4xl sm:text-30xl pointer-events-none">🐦‍🔥
              </span>

              <h3 className="relative z-10 text-4xl text-slate-100 font-actay-wide">
                {content.factsAndFiguresTitle.substring(2)}
              </h3>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-6 mb-10">
              {Object.entries(content.stats).map(([key, value]) => (
                <div key={key} className="bg-slate-800/0 p-3 rounded-lg text-center w-full">
                  <p className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">{value.split(' ')[0]}</p>
                  <p className="text-slate-50 text-xl">{value.substring(value.indexOf(' ') + 1)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => handleNavigate('/community')}
                onKeyDown={(e) => handleKeyDown(e, () => handleNavigate('/community'))}
                aria-label={content.viewAllReportsButton}
              className={`${commonButtonClassName} text-xl`}
              >
                {content.viewAllReportsButton}
              </Button>
            </div>
          </section>

          {/* Блок 3: СМИ о нас */}
          <section className="my-40 py-1">
            <div className="relative text-left mb-12">
              <span className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10 text-4xl sm:text-30xl pointer-events-none">📰
              </span>
              <h2 className="relative z-10 text-4xl font-semibold text-green-400 font-actay-wide">
                {content.mediaMentionsTitle.substring(2)}
              </h2>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-8 lg:gap-12 mb-12">
              {content.mediaQuotes.map((media, index) => (
                <div key={index} className="flex flex-col items-center text-center bg-slate-800/0 p- rounded-lg w-full">
                  <img 
                    src={logoImageMap[media.logo]} 
                    alt={`${media.source} logo`} 
                    className="h-14 object-contain mb-1"
                  />
                  <blockquote className="text-slate-200 italic text-lg mb-4 flex-grow">«{media.quote}»</blockquote>
                  
                </div>
                
              ))}
            </div>
          </section>

          {/* Блок 4: Сообщество и участие */}
          <section className="my-2 py-1">
            <div className="relative text-right mb-4 mt-[-150px]">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/5 -translate-y-1/3 z-0 opacity-20 text-4xl sm:text-15xl pointer-events-none">🛠️
              </span>
              <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-green-400 font-actay-wide">
                {content.communityParticipationTitle.substring(2)}
              </h2>
            </div>
            <div className="flex flex-row flex-wrap items-stretch justify-center gap-8 mb-12">
              <div className="bg-slate-800/0 p-6 rounded-lg w-full flex flex-col">
                <h3 className="text-2xl font-medium mb-4 text-slate-100 font-actay-wide text-center">Жалобы и предложения</h3>
                <p className="text-slate-50 mb-8 text-xl text-center flex-grow">{content.forumDiscussionText}</p>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleNavigate('https://t.me/your_chat_link')}
                  onKeyDown={(e) => handleKeyDown(e, () => handleNavigate('https://t.me/your_chat_link'))}
                  className={`${commonButtonClassName} text-lg mt-4 `}
                >
                  {content.goToChatButton}
                </Button>
              </div>
            </div>
          </section>

          {/* Финальный призыв к действию */}
          <section className="my-16 py-12 text-center">
            <div className="relative text-left mb-10 mt-[-60px]">
              <h2 className="relative z-10 text-4xl font-semibold text-green-100 font-actay-wide">
                {content.finalCtaTitle.substring(2)}
              </h2>
             
            </div>
            <p className="text-xl text-slate-50 mb-10 ">
              {content.finalCtaDescription}
              
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {/* TODO: Define share action */}}
              onKeyDown={(e) => handleKeyDown(e, () => {/* TODO: Define share action */})}
              aria-label={content.shareInSocialMediaButton}
              className={`${commonButtonClassName} text-lg mt-4`}
            >
              {content.shareInSocialMediaButton}
              
            </Button>
            
          </section>

          {/* Блок "Обновления проекта" */}
          <section className="my-16 py-8 text-center mt-[-50px]">
            
            <h3 className="text-2xl sm:text-4xl text-right font-medium mb-14 text-slate-100 font-actay-wide">Обновления проекта
              
            </h3>
            <div className="relative p-6 rounded-lg bg-slate-800/0 mb-8">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-20 text-4xl sm:text-30xl pointer-events-none">❤️‍🔥
            </span>
            
              <p className="text-slate-50 text-lg">{content.projectUpdateExample}</p>
              
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNavigate('/update-history')}
              onKeyDown={(e) => handleKeyDown(e, () => handleNavigate('/update-history'))}
              aria-label={content.updateHistoryButton}
              className={`${commonButtonClassName} text-lg mt-4 py-2 px-4`}
            >
              {content.updateHistoryButton}
            </Button>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Community; 