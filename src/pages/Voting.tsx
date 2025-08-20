import { useTonConnectUI } from '@tonconnect/ui-react';
import PageTransition from '../components/PageTransition';

const Voting = () => {
  const [tonConnectUIHook] = useTonConnectUI();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        {!tonConnectUIHook.connected ? (
          <button
            className="px-6 py-3 bg-green-500 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
            onClick={() => tonConnectUIHook.openModal()}
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
    </PageTransition>
  );
};

export default Voting;