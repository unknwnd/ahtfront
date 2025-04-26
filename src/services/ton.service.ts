import { TonConnectUI } from '@tonconnect/ui-react';
import { Address, fromNano, toNano, TonClient } from 'ton-core';
import { toast } from 'react-toastify';
import { CONTRACT_ADDRESSES, IS_TESTNET } from '../config/contracts';
import { TONCENTER_API_KEY } from '../config/app';
import { AnimalHelperToken } from '../contracts/wrappers/AnimalHelperToken';
import { JettonWallet } from '../contracts/wrappers/JettonWallet';
import { FundsDistributor } from '../contracts/wrappers/FundsDistributor';
import { AnimalHelperVoting } from '../contracts/wrappers/AnimalHelperVoting';

class TonService {
  private tonConnectUI: TonConnectUI | null = null;
  private tonClient: TonClient | null = null;

  constructor() {
    // TonClient уже не используется напрямую, работаем через TonConnectUI
    // Но мы можем инициализировать его для прямых запросов к блокчейну
    const endpoint = IS_TESTNET ? 'https://testnet.toncenter.com/api/v2/jsonRPC' : 'https://toncenter.com/api/v2/jsonRPC';
    this.tonClient = new TonClient({
      endpoint,
      apiKey: TONCENTER_API_KEY
    });
  }

  // Устанавливаем экземпляр TonConnectUI
  setTonConnectUI(tonConnectUI: TonConnectUI) {
    this.tonConnectUI = tonConnectUI;
  }

  // Проверяем подключение кошелька
  isWalletConnected(): boolean {
    return this.tonConnectUI?.connected || false;
  }

  // Получаем адрес кошелька
  getWalletAddress(): string | null {
    if (!this.tonConnectUI?.account) return null;
    return this.tonConnectUI.account.address;
  }

  // Отправляем TON на адрес приюта
  async sendDonation(shelterAddress: string, amount: number): Promise<boolean> {
    try {
      if (!this.tonConnectUI) {
        throw new Error('TonConnect не инициализирован');
      }

      if (!this.tonConnectUI.connected) {
        toast.info('Пожалуйста, подключите TON кошелек');
        return false;
      }

      // Подготавливаем транзакцию
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 минут
        messages: [
          {
            address: shelterAddress,
            amount: toNano(amount).toString(),
          },
        ],
      };

      // Отправляем транзакцию
      await this.tonConnectUI.sendTransaction(transaction);
      
      toast.success(`Пожертвование ${amount} TON успешно отправлено!`);
      return true;
    } catch (error) {
      console.error('Ошибка при отправке пожертвования:', error);
      toast.error('Произошла ошибка при отправке пожертвования');
      return false;
    }
  }

  // Получаем баланс AHT токенов (Jetton)
  async getJettonBalance(ownerAddress: string): Promise<number> {
    try {
      if (!this.tonClient) {
        throw new Error('TonClient не инициализирован');
      }

      // Получаем экземпляр мастер-контракта токена
      const tokenMaster = this.tonClient.open(AnimalHelperToken.createFromAddress(CONTRACT_ADDRESSES.animalHelperToken));

      // Получаем адрес Jetton-кошелька пользователя для этого токена
      const userWalletAddress = await tokenMaster.getWalletAddress(Address.parse(ownerAddress));

      // Открываем Jetton-кошелек пользователя
      const userJettonWallet = this.tonClient.open(JettonWallet.createFromAddress(userWalletAddress));

      // Получаем баланс
      const jettonData = await userJettonWallet.getWalletData();
      return Number(fromNano(jettonData.balance));
    } catch (error) {
      console.error('Ошибка при получении баланса Jetton:', error);
      toast.error('Ошибка при получении баланса AHT токенов');
      return 0;
    }
  }

  // Покупаем AHT токены
  async buyAHTTokens(amount: number): Promise<boolean> {
    try {
      if (!this.tonConnectUI) {
        throw new Error('TonConnect не инициализирован');
      }

      if (!this.tonConnectUI.connected) {
        toast.info('Пожалуйста, подключите TON кошелек');
        return false;
      }

      // Здесь должна быть логика для покупки токенов через смарт-контракт
      // Например, отправка TON на контракт с указанием количества токенов
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 минут
        messages: [
          {
            address: CONTRACT_ADDRESSES.animalHelperToken.toString(),
            amount: toNano(amount * 0.00001).toString(), // Предположим, 1 AHT = 0.00001 TON
            payload: 'buy_tokens', // Это заглушка, нужно сформировать правильный payload
          },
        ],
      };

      await this.tonConnectUI.sendTransaction(transaction);
      toast.success(`Вы успешно приобрели ${amount} AHT токенов!`);
      return true;
    } catch (error) {
      console.error('Ошибка при покупке токенов:', error);
      toast.error('Произошла ошибка при покупке токенов');
      return false;
    }
  }

  // Голосуем в предложении
  async vote(votingId: string, option: 'yes' | 'no' | 'abstain'): Promise<boolean> {
    try {
      if (!this.tonConnectUI) {
        throw new Error('TonConnect не инициализирован');
      }

      if (!this.tonConnectUI.connected) {
        toast.info('Пожалуйста, подключите TON кошелек');
        return false;
      }

      // Здесь должна быть логика для голосования через смарт-контракт
      // Предположим, что votingId соответствует какому-то контракту голосования
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 минут
        messages: [
          {
            address: CONTRACT_ADDRESSES.fundsDistributor.toString(), // Используем fundsDistributor как пример
            amount: toNano(0.05).toString(), // Небольшая комиссия за голосование
            payload: `vote_${votingId}_${option}`, // Это заглушка, нужно сформировать правильный payload
          },
        ],
      };

      await this.tonConnectUI.sendTransaction(transaction);
      toast.success(`Ваш голос "${option}" успешно учтен!`);
      return true;
    } catch (error) {
      console.error('Ошибка при голосовании:', error);
      toast.error('Произошла ошибка при голосовании');
      return false;
    }
  }

  // Получаем список приютов
  async getShelters() {
    try {
      // Здесь должна быть логика для получения списка приютов из смарт-контракта
      // Например, вызов метода getShelters у FundsDistributor
      if (!this.tonClient) {
        throw new Error('TonClient не инициализирован');
      }

      const distributor = this.tonClient.open(FundsDistributor.createFromAddress(CONTRACT_ADDRESSES.fundsDistributor));
      // const shelters = await distributor.getShelters(); // Предполагаемый метод, нужно проверить обертку
      // Для демонстрации возвращаем пустой массив
      return [];
    } catch (error) {
      console.error('Ошибка при получении списка приютов:', error);
      return [];
    }
  }

  // Получаем список голосований
  async getVotings() {
    try {
      // Здесь должна быть логика для получения списка голосований из смарт-контракта
      // Например, вызов метода getVotings у AnimalHelperVoting или FundsDistributor
      if (!this.tonClient) {
        throw new Error('TonClient не инициализирован');
      }

      // Предположим, что voting контракт отдельный, но адреса у нас нет, используем fundsDistributor
      const distributor = this.tonClient.open(FundsDistributor.createFromAddress(CONTRACT_ADDRESSES.fundsDistributor));
      // const votings = await distributor.getVotings(); // Предполагаемый метод, нужно проверить обертку
      // Для демонстрации возвращаем пустой массив
      return [];
    } catch (error) {
      console.error('Ошибка при получении списка голосований:', error);
      return [];
    }
  }
}

// Экспортируем синглтон сервиса
export const tonService = new TonService();