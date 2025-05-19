// Типы для Token (Jetton)
export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  address: string;
}

// Типы для приютов
export interface Shelter {
  id: string;
  name: string;
  location: string;
  description: string;
  animals: number;
  needed: number;
  collected: number;
  image: string;
  address: string;
  photos?: string[];
  stats?: {
    dogs: number;
    cats: number;
    volunteers: number;
    adoptions: number;
  };
  history?: Transaction[];
}

// Типы для голосований
export interface Voting {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  requiredTokens: number;
  contract: string;
  result?: 'passed' | 'rejected';
}

// Типы для транзакций
export interface Transaction {
  id: string;
  type: 'donation' | 'purchase' | 'vote';
  amount: number;
  token: string;
  date: string;
  destination: string;
  hash: string;
}

// Типы для пользовательских данных
export interface UserData {
  ahtBalance: number;
  tonBalance: number;
  ahtPrice: number;
  transactions: Transaction[];
}

// Типы для темы
export type Theme = 'dark';

// Опции голосования
export type VoteOption = 'yes' | 'no' | 'abstain'; 