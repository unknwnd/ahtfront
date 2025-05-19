import { useState, useRef, useEffect, FC } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/Button';
import PageTransition from '../components/PageTransition';
import { TonService } from '../services/ton.service';

// START: Definition of RuHeaderDescription component
const RuHeaderDescription: FC = () => (
  <div className="space-y-4 text-slate-50">
    <div>
      <p className="font-semibold text-2xl text-slate-100 mb-1.5">1. Предложите кандидатов</p>
      <p><span className="font-medium text-slate-100">Когда:</span> С 1 по 7 число каждого месяца.</p>
      <p><span className="font-medium text-slate-100">Как:</span> Любой пользователь может предложить одного кандидата за месяц.</p>
      <p><span className="font-medium text-slate-100">Право на предложение:</span> Открыт для всех, без ограничений.</p>
    </div>
    <div>
      <p className="font-semibold text-2xl text-slate-100 mb-1.5">2. Проголосуйте за лучшие идеи</p>
      <p><span className="font-medium text-slate-50">Когда:</span> С 8 числа до конца месяца (вплоть до 23:59 GMT).</p>
      <div className="mt-2 p-3 bg-slate-700/60 rounded-lg text-xl border border-slate-600/50">
        <p className="text-slate-50">
          <span className="font-semibold text-slate-50">GMT (Greenwich Mean Time)</span> — стандартное время по Гринвичу (нулевой часовой пояс). Это международный эталон времени, который не меняется в зависимости от сезона.
        </p>
        <div className="mt-2">
          <p className="font-medium text-slate-50">Например:</p>
          <ul className="list-disc list-inside ml-1 mt-1 space-y-0.5 text-slate-50">
            <li>Если у вас UTC+3 (Москва), окончание голосования в 23:59 GMT = 02:59 следующего дня по вашему времени.</li>
            <li>Если у вас UTC-5 (Нью-Йорк), окончание голосования в 23:59 GMT = 18:59 по вашему времени.</li>
          </ul>
        </div>
        <p className="mt-2 font-semibold text-sky-400">Проверьте ваш часовой пояс, чтобы не пропустить сроки!</p>
      </div>
    </div>
    <div>
      <p className="font-semibold text-2xl text-slate-50 mb-1.5">Условия участия:</p>
      <ul className="list-disc text-xl list-inside space-y-1">
        <li>Нужно владеть минимум 1000 AHT (токенов).</li>
        <li>Проголосовать и предложить кандидата можно только 1 раз в месяц.</li>
        <li>Если не голосовали в прошлом месяце — ваш голос сохраняется и добавляется к текущему.</li>
      </ul>
    </div>
    <div className="mt-3 p-3 bg-green-500/30 rounded-lg text-xl border border-green-500/60">
      <p className="font-semibold text-sky-400 ">Голосуйте стратегически:</p>
      <p className="mt-1 ">Используйте накопленные голоса, чтобы поддержать важные проекты.</p>
      <p className="mt-1 text-slate-50"><span className="font-medium text-slate-100">Пример:</span> В январе вы не голосовали → в феврале у вас будет 2 голоса (текущий + накопленный). В марте вы проголосуете, и накопленные голоса сбросятся до 1.</p>
    </div>
    <div className="mt-5 pt-3 border-t border-slate-700 text-center">
      <p className="font-semibold text-2xl text-green-400">Готовы изменить мир вместе с нами?</p>
      <p className="mt-1">Предлагайте идеи и голосуйте за лучшие проекты!</p>
    </div>
  </div>
);
// END: Definition of RuHeaderDescription component

// START: Definition of EnHeaderDescription component
const EnHeaderDescription: FC = () => (
  <div className="space-y-4 text-slate-300">
    <div>
      <p className="font-semibold text-xl text-slate-100 mb-1.5">1. Propose Candidates</p>
      <p><span className="font-medium text-slate-200">When:</span> From the 1st to the 7th of each month.</p>
      <p><span className="font-medium text-slate-200">How:</span> Any user can propose one candidate per month.</p>
      <p><span className="font-medium text-slate-200">Eligibility to propose:</span> Open to everyone, without restrictions.</p>
    </div>
    <div>
      <p className="font-semibold text-xl text-slate-100 mb-1.5">2. Vote for the Best Ideas</p>
      <p><span className="font-medium text-slate-200">When:</span> From the 8th to the end of the month (until 23:59 GMT).</p>
      <div className="mt-2 p-3 bg-slate-700/40 rounded-lg text-sm border border-slate-600/50">
        <p className="text-slate-400">
          <span className="font-semibold text-slate-300">GMT (Greenwich Mean Time)</span> is the standard time at Greenwich (zero meridian). It is an international time standard that does not change with seasons.
        </p>
        <div className="mt-2">
          <p className="font-medium text-slate-200">For example:</p>
          <ul className="list-disc list-inside ml-1 mt-1 space-y-0.5 text-slate-400">
            <li>If you are in UTC+3 (Moscow), voting ends at 23:59 GMT = 02:59 AM the next day your time.</li>
            <li>If you are in UTC-5 (New York), voting ends at 23:59 GMT = 6:59 PM your time.</li>
          </ul>
        </div>
        <p className="mt-2 font-semibold text-sky-400">Check your time zone so you don't miss the deadlines!</p>
      </div>
    </div>
    <div>
      <p className="font-semibold text-xl text-slate-100 mb-1.5">Participation Conditions:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>You need to hold a minimum of 1000 AHT (tokens).</li>
        <li>You can vote and propose a candidate only once a month.</li>
        <li>If you didn't vote last month, your vote is saved and added to the current one.</li>
      </ul>
    </div>
    <div className="mt-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
      <p className="font-semibold text-green-300 text-lg">Vote strategically:</p>
      <p className="mt-1">Use your accumulated votes to support important projects.</p>
      <p className="mt-1 text-sm text-slate-400"><span className="font-medium text-slate-300">Example:</span> In January you didn't vote → in February you will have 2 votes (current + accumulated). In March you vote, and your accumulated votes will reset to 1.</p>
    </div>
    <div className="mt-5 pt-3 border-t border-slate-700 text-center">
      <p className="font-semibold text-xl text-green-400">Ready to change the world with us?</p>
      <p className="mt-1">Propose ideas and vote for the best projects!</p>
    </div>
  </div>
);
// END: Definition of EnHeaderDescription component

const votingPageContent = {
  ru: {
    mainTitleVote: "ГОЛОСУЙ",
    newSubtitlePropose: "а так же предлагай кандидатов для голосования",
    headerDescription: RuHeaderDescription,
    howItWorksLink: "Как это работает?",
    proposeNewVotingButton: "Предложить новое голосование",
    filterAll: "Все",
    filterActive: "Активные",
    filterCompleted: "Завершенные",
    cardStatusActive: "Активно",
    cardStatusCompleted: "Завершено",
    facilityTypeMap: {
      'vet': 'Клиника',
      'shelter': 'Приют',
      'zoo': 'Зоопарк',
      'nursery': 'Питомник',
      'other': 'Другое'
    },
    cardEndDatePrefixActive: "До:",
    cardEndDatePrefixClosed: "Закр.:",
    cardVotesSuffix: "голосов",
    cardVoteButton: "Голосовать",
    cardHelpButton: "Помочь",
    cardViewContractTitle: "Просмотреть контракт на TON Explorer",
    cardContractPrefix: "Контракт:",
    votingInfoModalCloseAriaLabel: "Закрыть информационное окно",
    votingInfoModalTitle: "Голосование недоступно",
    votingInfoModalText1: "Голосование доступно при балансе от 1000 AHT.",
    votingInfoModalText2: "Вы можете проголосовать только один раз в текущем месяце. Неиспользованные голоса накапливаются.",
    detailsModalCloseAriaLabel: "Закрыть детали",
    detailsModalRequisitesTitle: "Реквизиты для помощи:",
    detailsModalTonWalletLabel: "TON кошелек:",
    detailsModalContactInfoTitle: "Контактная информация:",
    detailsModalAddressLabel: "Адрес:",
    detailsModalWebsiteLabel: "Веб-сайт:",
    closeButton: "Закрыть",
    noVotingsFound: "Голосования не найдены",
    proposalFormTitle: "Предложить новое голосование",
    proposalFormInstruction1: "Заполните форму, чтобы предложить новое учреждение для голосования. Предложения принимаются с 1 по 7 число каждого месяца.",
    proposalFormInstruction2: "Помните, что вы можете отправить только одно предложение в месяц.",
    proposalFormFacilityNameLabel: "Название учреждения*",
    proposalFormFacilityNamePlaceholder: "Например, Приют 'Ласковый друг'",
    proposalFormFacilityTypeLabel: "Тип учреждения*",
    proposalFormFacilityTypeDefaultOption: "Выберите тип",
    proposalFormAddressLabel: "Адрес местонахождения*",
    proposalFormAddressPlaceholder: "Город, улица, дом",
    proposalFormPhoneLabel: "Телефон*",
    proposalFormPhonePlaceholder: "+7 (XXX) XXX-XX-XX",
    proposalFormWebsiteLabel: "Ссылка на сайт/соцсети",
    proposalFormWebsitePlaceholder: "https://example.com",
    proposalFormRequisitesLabel: "Реквизиты (если есть)",
    proposalFormRequisitesPlaceholder: "ИНН, Расчетный счет и т.д.",
    proposalFormDescriptionLabel: "Краткое описание инициативы/цели сбора*",
    proposalFormDescriptionPlaceholder: "На что пойдут средства, почему это важно...",
    proposalFormAmountLabel: "Запрашиваемая сумма (TON)*",
    proposalFormAmountPlaceholder: "Например, 10000",
    proposalFormDurationLabel: "Длительность сбора (дней)*",
    proposalFormDurationOption7: "7 дней",
    proposalFormDurationOption15: "15 дней",
    proposalFormDurationOption30: "30 дней",
    proposalFormRequiredFieldsFootnote: "* - обязательные поля для заполнения",
    proposalFormModerationFootnote: "После отправки заявка будет рассмотрена модераторами. В случае одобрения, учреждение будет добавлено в список для голосования.",
    proposalFormOnePerMonthFootnote: "Вы можете предложить только одно учреждение в месяц.",
    proposalFormSubmitButton: "Отправить предложение",
    toastProposalPeriodInfo: "Предложения принимаются только в первую неделю месяца (1-7 число)",
    toastConnectWalletInfo: "Пожалуйста, подключите TON кошелек",
    toastMinBalanceWarning: "Для создания голосования необходимо иметь минимум 1000 AHT токенов",
    toastProposalSuccess: "Ваше предложение успешно отправлено!",
    toggleToEnglish: "Switch to English",
    toggleToRussian: "Переключить на Русский",
    cancelButton: "Отмена",
  },
  en: {
    mainTitleVote: "VOTE",
    newSubtitlePropose: "and also propose candidates for voting",
    headerDescription: EnHeaderDescription,
    howItWorksLink: "How does it work?",
    proposeNewVotingButton: "Propose New Voting",
    filterAll: "All",
    filterActive: "Active",
    filterCompleted: "Completed",
    cardStatusActive: "Active",
    cardStatusCompleted: "Completed",
    facilityTypeMap: {
      'vet': 'Clinic',
      'shelter': 'Shelter',
      'zoo': 'Zoo',
      'nursery': 'Nursery',
      'other': 'Other'
    },
    cardEndDatePrefixActive: "Until:",
    cardEndDatePrefixClosed: "Closed:",
    cardVotesSuffix: "votes",
    cardVoteButton: "Vote",
    cardHelpButton: "Help",
    cardViewContractTitle: "View contract on TON Explorer",
    cardContractPrefix: "Contract:",
    votingInfoModalCloseAriaLabel: "Close information window",
    votingInfoModalTitle: "Voting Unavailable",
    votingInfoModalText1: "Voting is available with a balance of 1000 AHT or more.",
    votingInfoModalText2: "You can only vote once in the current month. Unused votes accumulate.",
    detailsModalCloseAriaLabel: "Close details",
    detailsModalRequisitesTitle: "Details for assistance:",
    detailsModalTonWalletLabel: "TON wallet:",
    detailsModalContactInfoTitle: "Contact Information:",
    detailsModalAddressLabel: "Address:",
    detailsModalWebsiteLabel: "Website:",
    closeButton: "Close",
    noVotingsFound: "No votings found",
    proposalFormTitle: "Propose New Voting",
    proposalFormInstruction1: "Fill out the form to propose a new institution for voting. Proposals are accepted from the 1st to the 7th of each month.",
    proposalFormInstruction2: "Remember, you can only submit one proposal per month.",
    proposalFormFacilityNameLabel: "Institution Name*",
    proposalFormFacilityNamePlaceholder: "E.g., 'Kind Friend' Shelter",
    proposalFormFacilityTypeLabel: "Institution Type*",
    proposalFormFacilityTypeDefaultOption: "Select type",
    proposalFormAddressLabel: "Location Address*",
    proposalFormAddressPlaceholder: "City, street, building",
    proposalFormPhoneLabel: "Phone*",
    proposalFormPhonePlaceholder: "+1 (XXX) XXX-XXXX",
    proposalFormWebsiteLabel: "Website/Social Media Link",
    proposalFormWebsitePlaceholder: "https://example.com",
    proposalFormRequisitesLabel: "Requisites (if any)",
    proposalFormRequisitesPlaceholder: "Tax ID, Bank account, etc.",
    proposalFormDescriptionLabel: "Brief description of the initiative/fundraising goal*",
    proposalFormDescriptionPlaceholder: "What the funds will be used for, why it's important...",
    proposalFormAmountLabel: "Requested Amount (TON)*",
    proposalFormAmountPlaceholder: "E.g., 10000",
    proposalFormDurationLabel: "Fundraising Duration (days)*",
    proposalFormDurationOption7: "7 days",
    proposalFormDurationOption15: "15 days",
    proposalFormDurationOption30: "30 days",
    proposalFormRequiredFieldsFootnote: "* - required fields",
    proposalFormModerationFootnote: "After submission, the application will be reviewed by moderators. If approved, the institution will be added to the voting list.",
    proposalFormOnePerMonthFootnote: "You can only propose one institution per month.",
    proposalFormSubmitButton: "Submit Proposal",
    toastProposalPeriodInfo: "Proposals are accepted only in the first week of the month (1st-7th)",
    toastConnectWalletInfo: "Please connect your TON wallet",
    toastMinBalanceWarning: "A minimum of 1000 AHT tokens is required to create a voting",
    toastProposalSuccess: "Your proposal has been successfully submitted!",
    toggleToEnglish: "Switch to English",
    toggleToRussian: "Switch to Russian",
    cancelButton: "Cancel",
  }
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

const getCurrentDay = (): number => {
  return new Date().getDate();
};

const isProposalPeriodActive = (): boolean => {
  const currentDay = getCurrentDay();
  return currentDay >= 1 && currentDay <= 7;
};

interface VotingCardProps {
  voting: typeof MOCK_VOTINGS[0];
  content: typeof votingPageContent.ru; // Pass content for localization
}

const VotingCard = ({ voting, content }: VotingCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showVotingInfo, setShowVotingInfo] = useState(false);

  const commonButtonCommunityStyle = "text-green-400 border-green-400 hover:bg-green-500 hover:text-white";

  const totalVotes = voting.votes.yes + voting.votes.no + voting.votes.abstain;
  const facilityInfo = voting.facilityInfo;
  
  const handleVote = async () => {
    setShowVotingInfo(true);
  };

  const handleHelp = () => {
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };
  
  const closeVotingInfo = () => {
    setShowVotingInfo(false);
  };
  
  const formatContractAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;
  };
  
  const getTonViewerLink = (address: string) => {
    return `https://tonviewer.com/${address}`;
  };

  return (
    <div className="bg-transparent p-0 sm:p-0 rounded-x1 relative max-w-xl lg:max-w-1xl w-full mx-auto">
      <h3 className="text-2xl sm:text-3xl font-semibold text-slate-50 font-actay-wide mb-2 text-left">{facilityInfo.name}</h3>

      <div className="w-full flex flex-col mb-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg mb-2 justify-start">
          <span className={`px-2.5 py-1.5 font-medium rounded-full ${
            voting.status === 'active'
              ? 'bg-green-500/30 text-green-300'
              : 'bg-slate-700 text-slate-400'
          }`}>
            {voting.status === 'active' ? content.cardStatusActive : content.cardStatusCompleted}
          </span>
          <span className="bg-sky-500/30 text-sky-300 px-2.5 py-1.5 rounded-full">
            {content.facilityTypeMap[facilityInfo.type as keyof typeof content.facilityTypeMap] || facilityInfo.type}
          </span>
          <span className="text-slate-50">
            {voting.status === 'active' ? content.cardEndDatePrefixActive : content.cardEndDatePrefixClosed} {voting.endDate}
          </span>
        </div>
        
        <p className="text-slate-200 text-base sm:text-xl mb-0 leading-relaxed">{voting.description}</p>
        
        <div className="flex items-center justify-between my-0 -mt-7">
          <div>
            <span className="text-5xl font-semibold text-slate-100">{totalVotes}</span>
            <span className="text-xl text-slate-50 ml-3">{content.cardVotesSuffix}</span>
          </div>
          
          <div className="flex flex-row items-center gap-x-0">
            {voting.status === 'active' && 
              <Button
                variant="outline"
                size="lg"
                onClick={handleVote}
                className={`${commonButtonCommunityStyle} text-lg py-1.5 px-2.5`}
              >
                {content.cardVoteButton}
              </Button>
            }
            <Button
              variant="outline"
              size="lg"
              onClick={handleHelp}
              className={`${commonButtonCommunityStyle} text-lg py-1.5 px-2.5`}
            >
              {content.cardHelpButton}
            </Button>
          </div>
        </div>
        
        <div className="pt-2 -mt-8">
          <a
            href={getTonViewerLink(voting.contract)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 transition-colors text-lg items-center group"
            title={content.cardViewContractTitle}
          >
            <span className="group-hover:underline">{content.cardContractPrefix} {formatContractAddress(voting.contract)}</span>
          </a>
        </div>
      </div>
      
      {showVotingInfo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full relative border border-slate-700 shadow-2xl">
            <button
              onClick={closeVotingInfo}
              className="absolute -top-2 -right-3 text-slate-400 hover:text-slate-200 transition-colors pointer-events-none"
              aria-label={content.votingInfoModalCloseAriaLabel}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-5 relative z-10">
              <div className="relative text-center mb-4">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h4 className="relative z-10 text-2xl font-medium text-slate-100 font-actay-wide">{content.votingInfoModalTitle}</h4>
              </div>
              <p className="text-slate-200 text-xl">
                {content.votingInfoModalText1}
              </p>
              <p className="text-slate-300 mt-2.5 text-xl">
                {content.votingInfoModalText2}
              </p>
            </div>
            
            <div className="mt-7 flex justify-center relative z-10">
              <Button
                variant="outline"
                size="lg"
                onClick={closeVotingInfo}
                className={`${commonButtonCommunityStyle} text-lg px-5 py-2`}
              >
                {content.closeButton}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {showDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full relative border border-slate-700 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeDetails}
              className="absolute -top-2 -right-3 text-slate-400 hover:text-slate-200 transition-colors pointer-events-none"
              aria-label={content.detailsModalCloseAriaLabel}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h4 className="text-3xl font-medium text-left mb-6 text-slate-50 font-actay-wide">{facilityInfo.name}</h4>
            
            <div className="mb-5 relative z-10 space-y-4">
              <h5 className="text-2xl font-light text-slate-50 mb-2">{content.detailsModalRequisitesTitle}</h5>
              <p className="text-xl text-slate-300">
                {content.detailsModalTonWalletLabel} <a 
                  href={getTonViewerLink(voting.contract)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {voting.contract}
                </a>
              </p>
              <p className="text-xl text-slate-50">
                {facilityInfo.requisites}
              </p>
              <p className="text-2xl text-slate-50 mb-4">{facilityInfo.phone}</p>
              
              <div className="mt-5 pt-3 border-t border-slate-700">
                <h5 className="text-lg font-medium text-slate-200 mb-2.5">{content.detailsModalContactInfoTitle}</h5>
                <p className="text-2xl text-slate-300">{content.detailsModalAddressLabel} {facilityInfo.address}</p>
                {facilityInfo.website && (
                  <>
                    <p className="text-2xl text-slate-300">{content.detailsModalWebsiteLabel}</p>
                    <p className="text-2xl">
                      <a 
                        href={facilityInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {facilityInfo.website}
                      </a>
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-7 relative z-10 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={closeDetails}
                className={`${commonButtonCommunityStyle} text-xl px-5 py-2`}
              >
                {content.closeButton}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface VotingProps {
  ton: TonService;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Voting: React.FC<VotingProps> = ({ ton }) => {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    facilityName: '', // Note: this seems to duplicate 'title' if it's for the same facility name
    facilityType: 'shelter',
    facilityAddress: '',
    facilityPhone: '',
    facilityWebsite: '',
    facilityRequisites: '',
    requestedAmount: '',
    days: '15'
  });
  
  const content = votingPageContent[language];
  const commonButtonCommunityStyle = "text-green-400 border-green-400 hover:bg-green-500 hover:text-white";
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const containerRef = useRef<HTMLDivElement>(null);
  const [tonConnectUIHook] = useTonConnectUI();

  useEffect(() => {
    if (tonConnectUIHook.connected) {
      console.log("Wallet connected in Voting page");
    } else {
      console.log("Wallet disconnected in Voting page");
    }
  }, [tonConnectUIHook.connected, tonConnectUIHook.account]);

  const filteredVotings = MOCK_VOTINGS.filter(voting => {
    if (filter === 'all') return true;
    if (filter === 'active') return voting.status === 'active';
    if (filter === 'completed') return voting.status === 'completed';
    return true;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const proposalPeriodOpen = isProposalPeriodActive(); // Linter warning suppressed for testing

  const createVoting = () => {
    // if (!proposalPeriodOpen) { // Temporarily commented out for testing
    //   toast.info(content.toastProposalPeriodInfo);
    //   return;
    // }
    
    // if (!tonConnectUIHook.connected) { // Temporarily commented out for testing
    //   toast.info(content.toastConnectWalletInfo);
    //   return;
    // }
    
    // const userBalance = 500; // Temporarily commented out for testing
    // if (userBalance < 1000) { // Temporarily commented out for testing
    //   toast.warning(content.toastMinBalanceWarning);
    //   return;
    // }
    
    setShowProposalForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(content.toastProposalSuccess);
    setShowProposalForm(false);
    // Reset form data - using facilityName for the title field as 'title' is in formData
    setFormData({
      title: '', // This was formData.title, should match the input name "title" for facility name
      description: '',
      facilityName: '', // This field is actually not used by an input with name="facilityName"
      facilityType: 'shelter',
      facilityAddress: '',
      facilityPhone: '',
      facilityWebsite: '',
      facilityRequisites: '',
      requestedAmount: '',
      days: '15'
    });
  };

  const closeProposalForm = () => {
    setShowProposalForm(false);
  };

  const HeaderDescriptionComponent = content.headerDescription;

  const toggleDescriptionVisibility = () => setIsDescriptionVisible(prev => !prev);

  const toggleLanguage = () => setLanguage(language === 'ru' ? 'en' : 'ru');

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
          className="absolute top-0 right-0 z-20 border-slate-400/0 hover:border-slate-300 text-white text-2xl"
          aria-label={language === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
        >
          {language === 'ru' ? 'EN' : 'RU'}
        </Button>
        <div className="relative z-10">
          <div className="relative z-10 mt-14">
            <h1 className="relative z-10 text-6xl md:text-7xl font-semibold text-left mb-5 text-green-400">
              <div className="leading-none font-actay-wide">{content.mainTitleVote}</div>
            </h1>
          </div>
          <h2 className="text-4xl font-semibold text-green-400 mt-1 mb-6 text-right leading-snug font-actay-wide">
            {content.newSubtitlePropose}
          </h2>
          
          <button
            onClick={toggleDescriptionVisibility}
            className="text-sky-400 hover:text-sky-400 cursor-pointer focus:outline-none mb-3 text-3xl inline-block font-actay-wide"
            aria-expanded={isDescriptionVisible}
            aria-controls="voting-description-content"
          >
            {content.howItWorksLink}
          </button>

          {isDescriptionVisible && (
            <div 
              id="voting-description-content"
              className="mb-8 font-lg text-slate-300 max-w-3xl lg:max-w-4xl leading-relaxed text-left text-xl sm:text-lg"
            >
              <HeaderDescriptionComponent />
            </div>
          )}
          
          <div className={`flex justify-center ${isDescriptionVisible ? 'mt-8' : 'mt-6'}`}> 
            <Button 
              variant="outline"
              size="lg"
              onClick={createVoting}
              className="text-green-400 border-green-400 text-xl px-4 py-2 px-4 py-2 rounded-md whitespace-nowrap truncate"
            >
              {content.proposeNewVotingButton}
            </Button>
          </div>
        </div>
        
        <div className={`flex flex-wrap justify-center gap-1 mb-8 ${isDescriptionVisible ? 'mt-5' : 'mt-4'}`}> 
          <Button
            variant="outline"
            size="lg"
            onClick={() => setFilter('all')}
            className={`${filter !== 'all' ? 'opacity-70' : ''} ${commonButtonCommunityStyle} text-lg text-xl px-8 py-4 px-4 py-2 rounded-md whitespace-nowrap truncate`}
          >
            {content.filterAll}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setFilter('active')}
            className={`${filter !== 'active' ? 'opacity-70' : ''} ${commonButtonCommunityStyle} text-xl px-8 py-4 px-4 py-2 rounded-md whitespace-nowrap truncate`}
          >
            {content.filterActive}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setFilter('completed')}
            className={`${filter !== 'completed' ? 'opacity-70' : ''} ${commonButtonCommunityStyle} text-xl px-8 py-4 px-4 py-2 rounded-md whitespace-nowrap truncate`}
          >
            {content.filterCompleted}
          </Button>
        </div>
        
        <div className="space-y-12">
          {filteredVotings.length > 0 ? (
            filteredVotings.map((voting) => (
              <VotingCard key={voting.id} voting={voting} content={content} />
            ))
          ) : (
            <div className="text-left py-12 bg-slate-800/30 rounded-xl relative">
              <p className="text-gray-300 relative z-10">{content.noVotingsFound}</p>
            </div>
          )}
        </div>
      </div>
      
      {showProposalForm && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-20 sm:pt-24 overflow-y-auto"
          onClick={closeProposalForm}
        >
          <div 
            className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full relative my-8 border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button positioned absolutely */}
            <button 
              onClick={closeProposalForm}
              className="absolute top-[-10px] right-[-13px] text-gray-400 hover:text-white z-20 flex-shrink-0 pointer-events-none"
              aria-label={content.closeButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title below the close button, full width */}
            <h3 className="w-full text-center text-2xl font-medium text-slate-100 font-actay-wide mb-6">{content.proposalFormTitle}</h3>
            
            <div className="relative z-10"> {/* This div might not need relative z-10 anymore if nothing overlaps, but can keep for safety */}
              <div className="mb-7 text-base text-gray-300 space-y-2">
                <p>
                  {content.proposalFormInstruction1}
                </p>
                <p>
                  {content.proposalFormInstruction2}
                </p>
              </div>
              
              <form onSubmit={handleSubmitProposal}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 mb-6">
                  <div>
                    <label htmlFor="proposalTitle" className="block text-slate-300 text-lg font-medium mb-1.5">
                      {content.proposalFormFacilityNameLabel}
                    </label>
                    <input
                      type="text"
                      name="title" // This should match formData.title
                      id="proposalTitle"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700 text-slate-50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-lg"
                      required
                      placeholder={content.proposalFormFacilityNamePlaceholder}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="facilityType" className="block text-slate-300 text-lg font-medium mb-1.5">
                      {content.proposalFormFacilityTypeLabel}
                    </label>
                    <select
                      name="facilityType"
                      id="facilityType"
                      value={formData.facilityType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700 text-slate-50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-lg"
                      required
                    >
                      <option value="" disabled className="text-lg">{content.proposalFormFacilityTypeDefaultOption}</option>
                      {Object.entries(content.facilityTypeMap).map(([key, value]) => (
                        <option key={key} value={key} className="text-lg">{value}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="facilityAddress" className="block text-slate-300 text-lg font-medium mb-1.5">
                      {content.proposalFormAddressLabel}
                    </label>
                    <input
                      type="text"
                      name="facilityAddress"
                      id="facilityAddress"
                      value={formData.facilityAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700 text-slate-50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-lg"
                      required
                      placeholder={content.proposalFormAddressPlaceholder}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="facilityPhone" className="block text-slate-300 text-lg font-medium mb-1.5">
                      {content.proposalFormPhoneLabel}
                    </label>
                    <input
                      type="tel"
                      name="facilityPhone"
                      id="facilityPhone"
                      value={formData.facilityPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700 text-slate-50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-lg"
                      required
                      placeholder={content.proposalFormPhonePlaceholder}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="facilityWebsite" className="block text-slate-300 text-lg font-medium mb-1.5">
                      {content.proposalFormWebsiteLabel}
                    </label>
                    <input
                      type="url"
                      name="facilityWebsite"
                      id="facilityWebsite"
                      value={formData.facilityWebsite}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700 text-slate-50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-lg"
                      placeholder={content.proposalFormWebsitePlaceholder}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="facilityRequisites" className="block text-slate-300 text-lg font-medium mb-1.5">
                      {content.proposalFormRequisitesLabel}
                    </label>
                    <input
                      type="text"
                      name="facilityRequisites"
                      id="facilityRequisites"
                      value={formData.facilityRequisites}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700 text-slate-50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-lg"
                      placeholder={content.proposalFormRequisitesPlaceholder}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="proposalDescription" className="block text-slate-300 text-lg font-medium mb-1.5">
                      {content.proposalFormDescriptionLabel}
                    </label>
                    <textarea
                      name="description"
                      id="proposalDescription"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-700 text-slate-50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-lg"
                      required
                      placeholder={content.proposalFormDescriptionPlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="requestedAmount" className="block text-slate-300 text-lg font-medium mb-1.5">
                      {content.proposalFormAmountLabel}
                    </label>
                    <input
                      type="number"
                      name="requestedAmount"
                      id="requestedAmount"
                      value={formData.requestedAmount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700 text-slate-50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-lg"
                      required
                      placeholder={content.proposalFormAmountPlaceholder}
                      min="1"
                    />
                  </div>

                  <div>
                    <label htmlFor="days" className="block text-slate-300 text-lg font-medium mb-1.5">
                      {content.proposalFormDurationLabel}
                    </label>
                    <select
                      name="days"
                      id="days"
                      value={formData.days}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700 text-slate-50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-lg"
                      required
                    >
                      <option value="7" className="text-lg">{content.proposalFormDurationOption7}</option>
                      <option value="15" className="text-lg">{content.proposalFormDurationOption15}</option>
                      <option value="30" className="text-lg">{content.proposalFormDurationOption30}</option>
                    </select>
                  </div>
                </div>
                
                <div className="text-sm text-slate-400 mb-6 space-y-1.5">
                  <p>{content.proposalFormRequiredFieldsFootnote}</p>
                  <p>
                    {content.proposalFormModerationFootnote}
                  </p>
                  <p>
                    {content.proposalFormOnePerMonthFootnote}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    size="md"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {content.proposalFormSubmitButton}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default Voting;