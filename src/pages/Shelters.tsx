import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import GradientButton from '../components/ui/GradientButton';
import PageTransition from '../components/PageTransition';
import { MOCK_SHELTERS } from './ShelterDetails'; // Импорт данных о приютах

// Тип для объекта приюта (можно вынести в отдельный файл типов)
type Shelter = typeof MOCK_SHELTERS[0];

// Компонент свечения для эффекта глубины моря (оставляем без изменений)
const DeepGlow = ({ index }: { index: number }) => {
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

// Анимации (оставляем существующие)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.04,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  }
};
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
      duration: 0.91,
      delay,
      ease: "easeOut"
    }
  })
};
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
      duration: 0.65,
      delay,
      ease: "easeOut"
    }
  })
};
const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.78,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.39,
      ease: "easeInOut"
    }
  }
};

// Новый компонент карточки для приюта
const ShelterCard = ({ shelter, index }: { shelter: Shelter, index: number }) => {
  const [imageError, setImageError] = useState(false);
  // Единое резервное изображение
  const fallbackImage = "https://placehold.co/500x300/e2e8f0/64748b?text=Нет+изображения";

  // Прогресс сбора средств
  const progress = Math.min(100, (shelter.collected / shelter.needed) * 100);

  return (
    <motion.div
      variants={cardVariants}
      custom={index * 0.1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="backdrop-blur-sm bg-black/40 rounded-2xl relative group overflow-hidden"
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
      <div className="relative z-10 md:flex">
         {/* Изображение слева */}
         <div className="md:w-1/3 flex-shrink-0">
           <motion.img
             src={imageError ? fallbackImage : shelter.image}
             alt={shelter.name}
             className="w-full h-48 md:h-full object-cover" // Адаптивная высота
             onError={() => setImageError(true)}
             variants={imageVariants}
             initial="hidden"
             whileInView="visible"
             whileHover="hover"
             viewport={{ once: false, amount: 0.5 }}
           />
         </div>
         {/* Информация справа */}
         <div className="p-4 md:p-6 md:w-2/3 flex flex-col justify-between">
            <div>
              {/* Название и локация */}
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: index * 0.1 + 0.1 }}
                viewport={{ once: false, amount: 0.5 }}
                className="text-xl font-semibold mb-1 text-white"
              >
                {shelter.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.65, delay: index * 0.1 + 0.15 }}
                viewport={{ once: false, amount: 0.5 }}
                className="text-sm text-gray-400 mb-3"
              >
                {shelter.location}
              </motion.p>
              {/* Описание */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.65, delay: index * 0.1 + 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
                className="text-gray-300 text-sm mb-4 line-clamp-2 md:line-clamp-3" // Ограничение строк
              >
                {shelter.description}
              </motion.p>
            </div>
            {/* Прогресс бар и кнопка */}
            <div className="mt-auto">
               <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.65, delay: index * 0.1 + 0.3 }}
                viewport={{ once: false, amount: 0.5 }}
                className="mb-4"
              >
                <div className="flex justify-between items-center mb-1 text-xs text-gray-400">
                  <span>Собрано: {shelter.collected} TON</span>
                  <span>Цель: {shelter.needed} TON</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="text-right" // Кнопка справа
              >
                <Link to={`/shelters/${shelter.id}`}>
                  <GradientButton isSmall>
                    Подробнее
                  </GradientButton>
                </Link>
              </motion.div>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

const Shelters = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Анимации логотипа (оставляем)
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [30, 45]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1.4, 1.3]);
  const logoImageUrl = "https://i.ibb.co/GBQrN2B/image.png";

  return (
    <PageTransition>
      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden"
      >
        {/* Эффекты свечения (оставляем) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[0, 1, 2, 3, 4].map((index) => (
            <DeepGlow key={index} index={index} />
          ))}
        </div>

        {/* Фоновый логотип (оставляем) */}
        <motion.div
          className="absolute top-[1.5%] right-[10%] w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] z-0"
          style={{ y: logoY, rotate: logoRotate, scale: logoScale }}
        >
          <div className="relative w-full h-full">
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
          {/* Обновленный заголовок */}
          <div className="mb-24 mt-16 md:mt-24">
            <motion.div
              className="mb-6 text-gray-300 text-xs uppercase tracking-widest"
              variants={simplePopupVariants} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.8 }}
            >
              Помощь животным на блокчейне
            </motion.div>
            <motion.div
              className="mb-4 text-5xl md:text-7xl font-light tracking-tight leading-tight"
              variants={simplePopupVariants} custom={0.3} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.8 }}
            >
              Наши
            </motion.div>
            <motion.div
              className="mb-12 text-5xl md:text-7xl font-light tracking-tight leading-tight"
              variants={simplePopupVariants} custom={0.5} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.8 }}
            >
              Приюты
            </motion.div>
            <motion.p
              className="text-base md:text-lg text-gray-300 mb-8 w-full"
              style={{ fontSize: "calc(1rem * 1.7 * 0.65)" }}
              variants={simplePopupVariants} custom={0.7} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.8 }}
            >
              Поддержите приюты для животных пожертвованиями в TON. Прозрачность и помощь там, где она нужна.
            </motion.p>
          </div>

          {/* Список карточек приютов */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {MOCK_SHELTERS.map((shelter, index) => (
              <ShelterCard key={shelter.id} shelter={shelter} index={index} />
            ))}
          </motion.div>

          {/* Финальный блок (можно оставить или изменить) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
            variants={fadeInUp}
            className="mt-32 mb-20 text-center backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-white/5 blur opacity-30"></div>
            <div className="relative z-10">
              <motion.h2 variants={simplePopupVariants} custom={0.1} className="text-3xl md:text-4xl font-light mb-6">
                Ваш вклад имеет значение
              </motion.h2>
              <motion.p variants={simplePopupVariants} custom={0.3} className="text-gray-300 mb-8 max-w-xl mx-auto">
                Каждое пожертвование помогает обеспечить уход, лечение и поиск нового дома для животных. Выберите приют и внесите свой вклад сегодня.
              </motion.p>
              {/* Можно добавить кнопку или оставить так */}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Shelters;
