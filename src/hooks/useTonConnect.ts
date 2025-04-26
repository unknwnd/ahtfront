import { useEffect } from 'react';
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { tonService } from '@services/ton.service';

export const useTonConnect = () => {
  const [tonConnectUI, ] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  
  useEffect(() => {
    // Устанавливаем экземпляр TonConnectUI в сервис
    tonService.setTonConnectUI(tonConnectUI);
  }, [tonConnectUI]);

  return {
    tonConnectUI,
    userFriendlyAddress,
    isConnected: tonConnectUI.connected,
    connect: () => tonConnectUI.openModal(),
    disconnect: () => tonConnectUI.disconnect(),
  };
}; 