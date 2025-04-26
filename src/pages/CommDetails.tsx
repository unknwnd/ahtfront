import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GradientButton from '../components/ui/GradientButton';

// Моковые данные для сообществ
const MOCK_COMMUNITIES = [
  {
    id: '1',
    name: 'Форум "Лапы помощи"',
    platform: 'VK',
    description: 'Самое активное сообщество помощи животным в России. Ежедневные обсуждения, советы ветеринаров и истории спасения.',
    members: 28500,
    image: 'https://images.unsplash.com/photo-1542736143-29a8432162bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    link: 'https://vk.com/lapypomoschi',
    detailedDescription: 'Сообщество было создано в 2015 году группой волонтеров из Москвы. За эти годы благодаря усилиям участников было спасено более 2800 животных, собрано более 15 миллионов рублей на помощь приютам. В сообществе регулярно проводятся прямые эфиры с ветеринарами, специалистами по поведению животных и представителями приютов.',
    photos: [
      'https://images.unsplash.com/photo-1542736143-29a8432162bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1583511655826-05700442982d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      posts: 18600,
      threads: 4250,
      photos: 34800,
      videos: 1250
    },
    recentPosts: [
      { date: '2023-12-15', title: 'Отчет о пожертвованиях в приют "Солнышко"', link: 'https://vk.com/wall-123456_7890' },
      { date: '2023-12-20', title: 'История спасения щенков с промзоны', link: 'https://vk.com/wall-123456_7891' },
      { date: '2023-12-25', title: 'Как помочь животным зимой - советы волонтера', link: 'https://vk.com/wall-123456_7892' },
      { date: '2023-12-30', title: 'Ежегодный отчет о деятельности сообщества', link: 'https://vk.com/wall-123456_7893' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/lapy_pomoshi',
      telegram: 'https://t.me/lapypomoschi',
      youtube: 'https://youtube.com/c/lapypomoschi',
      tiktok: 'https://tiktok.com/@lapypomoschi'
    }
  },
  {
    id: '2',
    name: 'Подслушано "Друзья животных"',
    platform: 'Telegram',
    description: 'Канал с отчетами о пожертвованиях и истории успешной помощи разным приютам и бездомным животным.',
    members: 12345,
    image: 'https://images.unsplash.com/photo-1550968519-32e95c9f28de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    link: 'https://t.me/friends_of_animals',
    detailedDescription: 'Телеграм-канал "Друзья животных" был создан в 2019 году и быстро стал одним из самых популярных ресурсов для обмена информацией о спасении животных. Особое внимание уделяется полной прозрачности: каждое пожертвование документируется с фото и видео отчетами. Канал сотрудничает с более чем 30 приютами по всей России.',
    photos: [
      'https://images.unsplash.com/photo-1550968519-32e95c9f28de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1577175889968-f551f5944634?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      posts: 3650,
      subscribers: 12345,
      views: 4750000,
      shares: 25600
    },
    recentPosts: [
      { date: '2023-12-18', title: 'Ежемесячный отчет по сбору средств для приюта "Надежда"', link: 'https://t.me/friends_of_animals/765' },
      { date: '2023-12-23', title: 'Видео-отчет о доставке корма в 5 приютов Подмосковья', link: 'https://t.me/friends_of_animals/766' },
      { date: '2023-12-28', title: 'Срочный сбор на операцию для кота Барсика', link: 'https://t.me/friends_of_animals/767' },
      { date: '2024-01-03', title: 'Результаты новогоднего благотворительного марафона', link: 'https://t.me/friends_of_animals/768' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/friends_animals',
      facebook: 'https://facebook.com/friendsanimals',
      vk: 'https://vk.com/friendsanimals'
    }
  },
  // Добавляем еще сообщества при необходимости
];

const CommDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'posts' | 'photos'>('info');
  
  // Находим сообщество по ID из URL параметра
  const community = MOCK_COMMUNITIES.find(c => c.id === id);
  
  // Если сообщество не найдено, показываем сообщение об ошибке
  if (!community) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 py-12 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Сообщество не найдено</h1>
          <p className="text-gray-300 mb-6">
            Сообщество с ID {id} не существует или было удалено.
          </p>
          <GradientButton 
            onClick={() => navigate('/comms')}
          >
            Вернуться к списку сообществ
          </GradientButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 py-12 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-sm bg-black/40 rounded-2xl overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={community.image} 
                alt={community.name} 
                className="w-full h-64 md:h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/800x600/e2e8f0/64748b?text=Нет+изображения';
                }}
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold text-white mb-2">
                {community.name}
              </h1>
              <p className="text-sm text-gray-300 mb-4 flex items-center">
                <span className="bg-white/20 text-xs rounded-full px-2 py-1 mr-2">
                  {community.platform}
                </span>
                <span>{community.members.toLocaleString()} участников</span>
              </p>
              
              <p className="text-gray-300 mb-6">
                {community.description}
              </p>
              
              <div className="border-t border-white/10 pt-4">
                <GradientButton
                  onClick={() => window.open(community.link, '_blank')}
                  className="w-full md:w-auto"
                >
                  Перейти в сообщество
                </GradientButton>
              </div>
              
              {/* Социальные сети */}
              {community.socialLinks && (
                <div className="mt-6 flex space-x-4">
                  {community.socialLinks.instagram && (
                    <a href={community.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {community.socialLinks.telegram && (
                    <a href={community.socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-2.5 13.5l.213-.099 5.702-2.641c.165-.076.252-.117.307-.18.052-.059.043-.092.024-.133-.02-.042-.065-.072-.111-.086-.047-.014-.112-.017-.22-.022l-1.582-.128-4.044 2.376-.298.179-.502-.153-.594-1.892 4.253-2.581.543-.329.193-.118.145-.089c.261-.16.481-.295.572-.472.102-.199.085-.394-.057-.587-.119-.162-.325-.257-.62-.324-.335-.076-.73-.049-1.215.085-1.604.444-7.192 2.479-7.531 2.602-.269.098-.452.167-.574.275-.157.14-.19.32-.143.506.037.142.148.266.296.353.129.075.325.132.625.208l1.322.382c.407 1.199.825 2.436 1.239 3.654.099.291.192.561.295.776.092.194.182.342.298.447.153.136.358.196.563.152.154-.033.293-.118.421-.224.108-.09.219-.2.333-.334.099-.117.184-.242.297-.371l1.84-1.883.441.184c.504.213.938.393 1.211.496.382.144.619.185.814.15.253-.045.422-.162.518-.361.053-.11.074-.239.082-.363.008-.125.009-.24.007-.368l-.273-3.773z" />
                      </svg>
                    </a>
                  )}
                  {community.socialLinks.vk && (
                    <a href={community.socialLinks.vk} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.496c.596-.19 1.363 1.259 2.175 1.816.613.422 1.079.33 1.079.33l2.166-.03s1.132-.07.596-.964c-.044-.073-.314-.661-1.618-1.869-1.365-1.262-1.182-1.057.462-3.24.997-1.331 1.396-2.146 1.271-2.496-.119-.332-.853-.244-.853-.244l-2.439.015s-.181-.025-.315.055c-.132.079-.216.262-.216.262s-.387 1.033-.903 1.913c-1.088 1.855-1.521 1.953-1.698 1.836-.413-.275-.31-1.106-.31-1.696 0-1.843.279-2.609-.543-2.807-.273-.066-.473-.111-1.168-.118-.892-.009-1.649.003-2.077.213-.285.141-.504.454-.37.472.165.023.541.108.741.399.257.374.248 1.213.248 1.213s.147 2.307-.344 2.594c-.337.196-.8-.204-1.793-1.872-.51-.884-.894-1.861-.894-1.861s-.074-.182-.207-.28c-.16-.12-.384-.157-.384-.157l-2.316.015s-.348.01-.476.161c-.112.134-.01.411-.01.411s1.825 4.274 3.893 6.428c1.897 1.974 4.049 1.845 4.049 1.845h.975z"/>
                      </svg>
                    </a>
                  )}
                  {community.socialLinks.facebook && (
                    <a href={community.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                  )}
                  {community.socialLinks.youtube && (
                    <a href={community.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </a>
                  )}
                  {community.socialLinks.tiktok && (
                    <a href={community.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.13 1.55.67 3.09 1.75 4.17 1.08 1.11 2.61 1.65 4.13 1.78v4.05c-1.4-.05-2.8-.41-4.08-1.09-.57-.33-1.08-.73-1.58-1.15.02 2.2 0 4.4.04 6.6-.05 1.25-.26 2.52-.87 3.65-1.06 1.96-3.09 3.31-5.3 3.45-1.44.11-2.89-.27-4.16-.99-2.05-1.17-3.39-3.39-3.38-5.77.02-1.95 1.04-3.8 2.58-5.03 1.6-1.28 3.77-1.72 5.79-1.36.06 1.44-.02 2.89-.04 4.34-1.07-.25-2.26-.03-3.1.67-.89.74-1.39 1.96-1.23 3.13.15 1.13.93 2.12 1.98 2.57.94.39 2.04.37 2.97-.04 1.14-.5 1.95-1.61 2.16-2.85.22-1.72.07-3.48.1-5.21 0-2.65.01-5.3-.01-7.94z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Вкладки с информацией */}
        <div className="backdrop-blur-sm bg-black/40 rounded-2xl">
          <div className="flex border-b border-white/10">
            <button
              className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'info' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('info')}
            >
              О сообществе
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'posts' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('posts')}
            >
              Последние публикации
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'photos' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('photos')}
            >
              Фотографии
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'info' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">О сообществе</h2>
                <p className="text-gray-300 mb-6">{community.detailedDescription}</p>
                
                <h3 className="text-lg font-medium mb-3">Статистика</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {community.stats.posts && (
                    <div className="bg-white/5 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-white">{community.stats.posts.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Публикаций</p>
                    </div>
                  )}
                  {community.stats.threads && (
                    <div className="bg-white/5 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-white">{community.stats.threads.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Тем</p>
                    </div>
                  )}
                  {community.stats.photos && (
                    <div className="bg-white/5 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-white">{community.stats.photos.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Фотографий</p>
                    </div>
                  )}
                  {community.stats.videos && (
                    <div className="bg-white/5 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-white">{community.stats.videos.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Видео</p>
                    </div>
                  )}
                  {community.stats.subscribers && (
                    <div className="bg-white/5 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-white">{community.stats.subscribers.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Подписчиков</p>
                    </div>
                  )}
                  {community.stats.views && (
                    <div className="bg-white/5 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-white">{community.stats.views.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Просмотров</p>
                    </div>
                  )}
                  {community.stats.shares && (
                    <div className="bg-white/5 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-white">{community.stats.shares.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Репостов</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'posts' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">Последние публикации</h2>
                {community.recentPosts?.length ? (
                  <div className="space-y-4">
                    {community.recentPosts.map((post, index) => (
                      <a 
                        key={index}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white/5 hover:bg-white/10 p-5 rounded-lg transition-colors"
                      >
                        <h3 className="font-medium text-white text-lg">{post.title}</h3>
                        <p className="text-sm text-gray-400 mt-2">{post.date}</p>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Нет доступных публикаций</p>
                )}
              </motion.div>
            )}
            
            {activeTab === 'photos' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">Фотографии</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {community.photos.map((photo, index) => (
                    <div key={index} className="rounded-lg overflow-hidden bg-white/5 p-2">
                      <img 
                        src={photo} 
                        alt={`${community.name} - фото ${index + 1}`} 
                        className="w-full h-64 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/300x200/e2e8f0/64748b?text=Нет+изображения';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Кнопка возврата */}
        <div className="flex justify-center mt-8">
          <GradientButton 
            onClick={() => navigate('/comms')}
            className="px-6 py-2"
          >
            ← Вернуться к списку сообществ
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default CommDetails; 