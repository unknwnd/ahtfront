import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import GradientButton from '../components/ui/GradientButton';

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

// Моковые данные для сообществ
const MOCK_COMMUNITIES = [
  {
    id: '1',
    name: 'Форум "Лапы помощи"',
    platform: 'VK',
    description: 'Самое активное сообщество помощи животным в России. Ежедневные обсуждения, советы ветеринаров и истории спасения.',
    members: 28500,
    image: 'https://images.unsplash.com/photo-1542736143-29a8432162bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    link: 'https://vk.com/lapypomoschi'
  },
  {
    id: '2',
    name: 'Подслушано "Друзья животных"',
    platform: 'Telegram',
    description: 'Канал с отчетами о пожертвованиях и истории успешной помощи разным приютам и бездомным животным.',
    members: 12345,
    image: 'https://images.unsplash.com/photo-1550968519-32e95c9f28de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    link: 'https://t.me/friends_of_animals'
  },
  {
    id: '3',
    name: 'r/AnimalRescueStories',
    platform: 'Reddit',
    description: 'Международный сабреддит с историями спасения животных со всего мира. Множество фото и видео отчетов.',
    members: 56200,
    image: 'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    link: 'https://reddit.com/r/AnimalRescueStories'
  },
  {
    id: '4',
    name: 'Животные и люди',
    platform: 'Пикабу',
    description: 'Любимый тег сообщества со множеством историй спасения, поиска хозяев и отчетов о помощи.',
    members: 89400,
    image: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    link: 'https://pikabu.ru/tag/Животные'
  },
  {
    id: '5',
    name: 'Благотворительный фонд "Хвостики"',
    platform: 'Instagram',
    description: 'Официальный аккаунт благотворительного фонда с ежедневными отчетами и фотографиями спасенных животных.',
    members: 34700,
    image: 'https://images.unsplash.com/photo-1625316708582-7c38734be155?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    link: 'https://instagram.com/hvostitki_fund'
  },
  {
    id: '6',
    name: 'Добрые Сердца',
    platform: 'Facebook',
    description: 'Крупнейшее международное сообщество по поддержке приютов для животных с отчетами и фото историями.',
    members: 125800,
    image: 'https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    link: 'https://facebook.com/kindhearts'
  }
];

// Анимации для компонентов
const fadeInUp = {
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

// Простая анимация всплывания для текста
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

// Анимация для карточек
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  visible: (delay = 0) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: "easeOut"
    }
  })
};

// Анимация для изображений
const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const CommunityCard = ({ community, index }: { community: typeof MOCK_COMMUNITIES[0], index: number }) => {
  return (
    <motion.div 
      variants={cardVariants}
      custom={index * 0.1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="overflow-hidden rounded-2xl backdrop-blur-sm bg-black/40 relative"
    >
      <motion.div 
        className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30 group-hover:opacity-50 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 0.5 }}
      />
      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 h-full flex-shrink-0">
            <motion.div 
              className="overflow-hidden rounded-lg w-full h-48 md:h-56"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: false, amount: 0.5 }}
            >
              <img 
                src={community.image} 
                alt={community.name} 
                className="w-full h-full object-cover transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/500x300/e2e8f0/64748b?text=Нет+изображения';
                }}
              />
            </motion.div>
          </div>
          <div className="md:w-2/3 flex flex-col justify-between h-full">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                viewport={{ once: false, amount: 0.5 }}
                className="text-xl font-semibold mb-1 text-white"
              >
                {community.name}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
                className="bg-white/20 text-xs rounded-full px-2 py-1 inline-block mb-3"
              >
                {community.platform}
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: false, amount: 0.5 }}
                className="text-gray-300 mb-5"
              >
                {community.description}
              </motion.p>
            </div>
            
            <div className="mt-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                viewport={{ once: false, amount: 0.5 }}
                className="flex items-center mb-4 text-sm"
              >
                <span className="text-gray-400">Участников: {community.members.toLocaleString()}</span>
              </motion.div>
              
              <div className="flex flex-wrap gap-3 justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Link 
                    to={`/comms/${community.id}`}
                    className="text-primary-400 hover:text-primary-300 font-medium"
                  >
                    Подробнее
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Link 
                    to={community.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <GradientButton isSmall>
                      Посетить
                    </GradientButton>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Comm = () => {
  // Ref для основного контейнера (для эффекта скролла)
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Хук для отслеживания скролла
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Трансформация значений скролла для анимации логотипа
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const logoRotate = useTransform(scrollYProgress, [0, 0.5, 1], [30, 37.5, 45]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1.4, 1.3]);
  
  // URL изображения для фона (прямая ссылка на изображение)
  const logoImageUrl = "https://i.ibb.co/GBQrN2B/image.png";

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <motion.div className="relative w-full h-full">
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
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="max-w-4xl mx-auto px-5 py-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mb-12 mt-0 md:mt-4">
          {/* Верхний мини-заголовок - цитата */}
          <motion.div 
            className="mb-6 text-gray-300 text-xs md:text-sm italic tracking-widest"
            variants={simplePopupVariants}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
          >
            "Величие нации и степень ее нравственного прогресса можно оценить по тому, как в ней относятся к животным" — Махатма Ганди
          </motion.div>
          
          {/* Основной заголовок */}
          <motion.div 
            className="mb-10 text-5xl md:text-7xl font-light tracking-tight leading-tight"
            variants={simplePopupVariants}
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
          >
            Наша дружина
          </motion.div>
        </div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {MOCK_COMMUNITIES.map((community, index) => (
            <CommunityCard key={community.id} community={community} index={index} />
          ))}
        </motion.div>
        
        {/* Финальный призыв к действию */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.8 }}
          variants={fadeInUp}
          className="mt-20 mb-10 text-center backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8"
        >
          <motion.h2 variants={simplePopupVariants} className="text-3xl md:text-4xl font-light mb-6">
            Присоединяйтесь к нашему сообществу
          </motion.h2>
          <motion.p variants={simplePopupVariants} className="text-gray-300 mb-8 max-w-xl mx-auto">
            Вместе мы можем изменить ситуацию с бездомными животными. Делитесь историями, опытом и помогайте тем, кто не может попросить о помощи.
          </motion.p>
          <motion.div
            variants={simplePopupVariants}
            custom={0.5}
          >
            <Link to="/profile">
              <GradientButton>
                Стать частью дружины
              </GradientButton>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Comm; 