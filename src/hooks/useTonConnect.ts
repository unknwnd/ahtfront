import { useEffect } from 'react';
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { tonService } from '../services/ton.service';

export const useTonConnect = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  
  useEffect(() => {
    // Инициализируем сервис TonService с экземпляром TonConnectUI
    tonService.initialize(tonConnectUI);
  }, [tonConnectUI]);

  return {
    userFriendlyAddress,
    isConnected: tonConnectUI.connected,
    // Для обратной совместимости
    connected: tonConnectUI.connected,
    wallet: tonConnectUI.account ? { account: { address: userFriendlyAddress } } : null,
    connect: () => tonService.connectWallet(),
    disconnect: () => tonService.disconnectWallet(),
  };
}; 