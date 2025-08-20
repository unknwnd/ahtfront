import { useTonConnectUI } from '@tonconnect/ui-react';
import { useMemo, useCallback } from 'react';

interface SendTransactionRequest {
  validUntil: number;
  messages: Array<{
    address: string;
    amount: string;
    payload?: string;
  }>;
}

export const useTonConnect = () => {
  const [tonConnectUI] = useTonConnectUI();

  const isConnected = useMemo(() => {
    return tonConnectUI.connected;
  }, [tonConnectUI.connected]);

  const account = useMemo(() => {
    return tonConnectUI.account;
  }, [tonConnectUI.account]);

  const wallet = useMemo(() => {
    return tonConnectUI.wallet;
  }, [tonConnectUI.wallet]);

  const connect = useCallback(async () => {
    try {
      await tonConnectUI.openModal();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, [tonConnectUI]);

  const disconnect = useCallback(async () => {
    try {
      await tonConnectUI.disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  }, [tonConnectUI]);

  const sendTransaction = useCallback(async (transaction: SendTransactionRequest) => {
    try {
      if (!isConnected) {
        throw new Error('Wallet not connected');
      }
      return await tonConnectUI.sendTransaction(transaction);
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  }, [tonConnectUI, isConnected]);

  return useMemo(() => ({
    tonConnectUI,
    isConnected,
    account,
    wallet,
    connect,
    disconnect,
    sendTransaction,
  }), [tonConnectUI, isConnected, account, wallet, connect, disconnect, sendTransaction]);
}; 