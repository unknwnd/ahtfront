import React from 'react';

const SplashScreenV2: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Animal Helper Token</h1>
        <p className="text-xl text-gray-300">Загрузка...</p>
      </div>
    </div>
  );
};

export default SplashScreenV2; 