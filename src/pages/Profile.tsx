import { useTonConnect } from '../hooks/useTonConnect';

const Profile = () => {
  const { connect, isConnected } = useTonConnect();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Профиль</h1>
      {!isConnected ? (
        <button
          className="px-6 py-3 bg-green-500 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
          onClick={connect}
          tabIndex={0}
          aria-label="Подключить TON кошелек"
        >
          Подключить TON кошелек
        </button>
      ) : (
        <div className="text-xl">Кошелек подключен!</div>
      )}
      <div className="mt-10 text-gray-400">Контент скоро появится</div>
    </div>
  );
};

export default Profile;