/**
 * Форматирует адрес кошелька для отображения в UI
 * @param address - Полный адрес кошелька
 * @param charCount - Количество символов для отображения в начале и конце адреса
 * @returns Форматированный адрес (например: 0x1234...5678)
 */
export const formatAddress = (address: string, charCount: number = 4): string => {
  if (!address) return '';
  
  if (address.length <= charCount * 2) {
    return address;
  }
  
  return `${address.slice(0, charCount)}...${address.slice(-charCount)}`;
};

/**
 * Форматирует сумму токенов для отображения в UI
 * @param amount - Сумма в наноединицах
 * @param decimals - Количество десятичных знаков (по умолчанию 9 для TON)
 * @param maxDecimals - Максимальное количество отображаемых десятичных знаков
 * @returns Форматированная сумма в человекочитаемом формате
 */
export const formatTokenAmount = (
  amount: string | number,
  decimals: number = 9,
  maxDecimals: number = 2
): string => {
  if (!amount && amount !== 0) return '0';
  
  // Конвертация в строку
  const amountStr = typeof amount === 'string' ? amount : amount.toString();
  
  // Преобразование из наноединиц
  const value = parseFloat(amountStr) / Math.pow(10, decimals);
  
  // Форматирование с ограничением знаков после запятой
  return value.toFixed(
    Math.min(maxDecimals, getDecimalPlaces(value))
  );
};

/**
 * Возвращает количество значимых знаков после запятой
 */
const getDecimalPlaces = (value: number): number => {
  if (Math.floor(value) === value) return 0;
  const valueStr = value.toString();
  const decimalPart = valueStr.split('.')[1];
  return decimalPart ? decimalPart.replace(/0+$/, '').length : 0;
}; 