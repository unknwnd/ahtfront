import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { toast } from 'react-toastify';

// Временные моковые данные
const MOCK_SHELTERS = [
  {
    id: '1',
    name: 'Добрые лапы',
    location: 'Москва',
    description: 'Приют для бездомных собак и кошек с возможностью адопции. Мы обеспечиваем полный уход за животными, включая ветеринарную помощь, стерилизацию/кастрацию и поиск новых хозяев.',
    animals: 120,
    needed: 5000,
    collected: 3245,
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:e8b25a80ad37caa916bcc2619b5a5d4c85c25abe433917323c94bd1a5a95fca5',
    photos: [
      'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1583511655826-05700442982d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 68,
      cats: 52,
      volunteers: 15,
      adoptions: 230
    },
    history: [
      { date: '2023-06-15', amount: 500, donor: 'Аноним' },
      { date: '2023-07-22', amount: 1000, donor: 'EQDrjaLahLkMB...' },
      { date: '2023-08-10', amount: 750, donor: 'Аноним' },
      { date: '2023-09-05', amount: 995, donor: 'EQBvRxu9...' }
    ]
  },
  // Другие приюты будут определены здесь...
];

const ShelterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tonConnectUI] = useTonConnectUI();
  const [donationAmount, setDonationAmount] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'photos'>('info');
  
  // Находим приют по ID из URL параметра
  const shelter = MOCK_SHELTERS.find(s => s.id === id);
  
  // Если приют не найден, показываем сообщение об ошибке
  if (!shelter) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Приют не найден</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Приют с ID {id} не существует или был удален.
        </p>
        <button 
          onClick={() => navigate('/shelters')}
          className="btn-primary"
        >
          Вернуться к списку приютов
        </button>
      </div>
    );
  }
  
  const progress = (shelter.collected / shelter.needed) * 100;

  // Обработчик для отправки пожертвования
  const handleDonate = async () => {
    if (!tonConnectUI.connected) {
      toast.info('Пожалуйста, подключите TON кошелек');
      return;
    }

    try {
      // В реальном приложении здесь будет вызов смарт-контракта для отправки TON
      toast.success(`Пожертвование ${donationAmount} TON успешно отправлено!`);
    } catch (error) {
      toast.error('Произошла ошибка при отправке пожертвования');
      console.error(error);
    }
  };
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={shelter.image} 
              alt={shelter.name} 
              className="w-full h-64 md:h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/800x600/e2e8f0/64748b?text=Нет+изображения';
              }}
            />
          </div>
          <div className="md:w-1/2 p-4 md:p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {shelter.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {shelter.location}
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {shelter.description}
            </p>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2 text-sm">
                <span>Собрано средств:</span>
                <span className="font-medium">{shelter.collected} / {shelter.needed} TON</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500">
                {progress.toFixed(1)}%
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  className="input w-32"
                />
                <span className="inline-flex items-center px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                  TON
                </span>
                <button 
                  onClick={handleDonate}
                  className="btn-primary flex-grow"
                >
                  Пожертвовать
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Адрес смарт-контракта: {shelter.address}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Вкладки с информацией */}
      <div className="card">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'info' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            Информация
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'history' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('history')}
          >
            История пожертвований
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'photos' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('photos')}
          >
            Фотографии
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'info' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">О приюте</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary-600">{shelter.stats.dogs}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Собак</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary-600">{shelter.stats.cats}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Кошек</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary-600">{shelter.stats.volunteers}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Волонтеров</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary-600">{shelter.stats.adoptions}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Пристроено</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Приют "{shelter.name}" активно занимается спасением и заботой о бездомных животных. 
                Мы обеспечиваем безопасную среду, медицинскую помощь и питание для наших подопечных. 
                Наша цель - найти каждому животному новый дом и любящую семью.
              </p>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">История пожертвований</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Дата</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Сумма (TON)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Отправитель</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {shelter.history.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.amount}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.donor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'photos' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Фотографии приюта</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shelter.photos.map((photo, index) => (
                  <div key={index} className="overflow-hidden rounded-lg">
                    <img 
                      src={photo} 
                      alt={`Фото ${index + 1}`} 
                      className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Нет+изображения';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterDetails; 