import { Address } from '@ton/ton';

// Адреса контрактов
export const CONTRACT_ADDRESSES = {
  deployWallet: 'EQC6rKQr8Kwae6CV_4B8vxtv5XK88k65VjYzZWh6Ah2aZi7C',
  fundsDistributor: 'EQC5ojhTqGjq4bOyZes4gmp-w9nRvrQsWfpdW2VNIpA1MTwy',
  animalHelperToken: 'EQAKqMUv4r_4DcNh1YhKkqg1_COCFoD1x85modWAtahVojE1',
  // Адреса пулов
  pools: {
    projectPool: 'EQC6rKQr8Kwae6CV_4B8vxtv5XK88k65VjYzZWh6Ah2aZi7C',
    liquidityPool: 'EQAaIg0I6TmLb5AXeNMIm3lr6RdXgMXQo5I3y5ewajNBNrkv',
    investorsCreatorsPool: 'EQCL4fFEzJj4t-D4Mf48f3fS_sbAk-eO4gOF4cnqQKzx5L26',
  },
  owner: 'EQD9fr8gEkfEZiynEQDhPFk2jSi0dOW_suTGfqjAuiywL6hj'
};

// Можно также добавить флаг для сети, чтобы легко переключаться
// Например, на основе переменной окружения Vite
export const IS_TESTNET = import.meta.env.VITE_IS_TESTNET === 'true' || import.meta.env.DEV;

// Эндпоинт можно тоже вынести сюда, если не используется TonConnect UI или нужна кастомная логика
// export const RPC_ENDPOINT = IS_TESTNET ? 'https://testnet.toncenter.com/api/v2/jsonRPC' : 'https://toncenter.com/api/v2/jsonRPC'; 

// Конфигурация для контрактов
export const CONTRACTS_CONFIG = {
  isTestnet: true,
  animalHelperTokenAddress: CONTRACT_ADDRESSES.animalHelperToken
}; 