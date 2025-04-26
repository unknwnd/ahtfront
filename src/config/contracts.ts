import { Address } from '@ton/core';

// Адреса контрактов (предположительно Testnet, т.к. .env указывает на testnet.toncenter.com)
export const CONTRACT_ADDRESSES = {
  deployWallet: Address.parse('EQC6rKQr8Kwae6CV_4B8vxtv5XK88k65VjYzZWh6Ah2aZi7C'),
  fundsDistributor: Address.parse('EQC5ojhTqGjq4bOyZes4gmp-w9nRvrQsWfpdW2VNIpA1MTwy'),
  animalHelperToken: Address.parse('EQAKqMUv4r_4DcNh1YhKkqg1_COCFoD1x85modWAtahVojE1'),
  // Адреса пулов могут понадобиться в зависимости от логики
  pools: {
    projectPool: Address.parse('EQC6rKQr8Kwae6CV_4B8vxtv5XK88k65VjYzZWh6Ah2aZi7C'), // Совпадает с deployWallet?
    liquidityPool: Address.parse('EQAaIg0I6TmLb5AXeNMIm3lr6RdXgMXQo5I3y5ewajNBNrkv'),
    investorsCreatorsPool: Address.parse('EQCL4fFEzJj4t-D4Mf48f3fS_sbAk-eO4gOF4cnqQKzx5L26'),
  },
  owner: Address.parse('EQD9fr8gEkfEZiynEQDhPFk2jSi0dOW_suTGfqjAuiywL6hj') // Адрес из deploy-info.json (EQ...)
};

// Можно также добавить флаг для сети, чтобы легко переключаться
// Например, на основе переменной окружения Vite
export const IS_TESTNET = import.meta.env.VITE_IS_TESTNET === 'true' || import.meta.env.DEV;

// Эндпоинт можно тоже вынести сюда, если не используется TonConnect UI или нужна кастомная логика
// export const RPC_ENDPOINT = IS_TESTNET ? 'https://testnet.toncenter.com/api/v2/jsonRPC' : 'https://toncenter.com/api/v2/jsonRPC'; 