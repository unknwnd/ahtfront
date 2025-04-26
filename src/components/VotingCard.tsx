import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { CheckBadgeIcon, VoteIcon } from './ui/icons';
import { Voting } from '../types';

interface VotingCardProps {
  voting: Voting;
  onVote: (votingId: string, option: 'yes' | 'no' | 'abstain') => void;
}

const VotingCard: React.FC<VotingCardProps> = ({ voting, onVote }) => {
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | 'abstain' | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  
  const handleVote = async () => {
    if (!selectedOption) return;
    
    setIsVoting(true);
    try {
      await onVote(voting.id, selectedOption);
      // Сброс выбранного варианта после успешного голосования
      setSelectedOption(null);
    } finally {
      setIsVoting(false);
    }
  };
  
  // Вычисляем процент голосов для каждого варианта
  const totalVotes = voting.yesVotes + voting.noVotes + voting.abstainVotes;
  const yesPercentage = totalVotes === 0 ? 0 : (voting.yesVotes / totalVotes) * 100;
  const noPercentage = totalVotes === 0 ? 0 : (voting.noVotes / totalVotes) * 100;
  const abstainPercentage = totalVotes === 0 ? 0 : (voting.abstainVotes / totalVotes) * 100;
  
  return (
    <motion.div 
      className="bg-white dark:bg-dark-800 rounded-card shadow-depth overflow-hidden border border-brand-blue-light/10 dark:border-dark-700"
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-brand-blue-dark dark:text-white">{voting.title}</h3>
          <div 
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              voting.status === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {voting.status === 'active' ? 'Активно' : 'Завершено'}
          </div>
        </div>
        
        <p className="text-sm text-brand-blue-medium dark:text-gray-300 mb-4">{voting.description}</p>
        
        {/* Прогресс голосования */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-brand-blue-dark dark:text-gray-300">Статистика голосования</span>
            <span className="text-xs text-brand-blue-medium dark:text-gray-400">{totalVotes} голосов</span>
          </div>
          
          <div className="h-2 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden mb-3">
            <div className="flex h-full">
              <div
                className="bg-green-500 h-full"
                style={{ width: `${yesPercentage}%` }}
              />
              <div
                className="bg-red-500 h-full"
                style={{ width: `${noPercentage}%` }}
              />
              <div
                className="bg-gray-400 h-full"
                style={{ width: `${abstainPercentage}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1" />
              <span className="text-brand-blue-medium dark:text-gray-300">За: {voting.yesVotes}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1" />
              <span className="text-brand-blue-medium dark:text-gray-300">Против: {voting.noVotes}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-400 mr-1" />
              <span className="text-brand-blue-medium dark:text-gray-300">Воздержались: {voting.abstainVotes}</span>
            </div>
          </div>
        </div>
        
        {/* Форма голосования, только для активных голосований */}
        {voting.status === 'active' && (
          <div className="border-t border-gray-200 dark:border-dark-700 pt-4">
            <p className="text-sm font-medium text-brand-blue-dark dark:text-white mb-3">Ваш голос:</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedOption('yes')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedOption === 'yes'
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800/20 dark:text-green-300 dark:hover:bg-green-800/30'
                }`}
              >
                За
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedOption('no')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedOption === 'no'
                    ? 'bg-red-500 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-800/20 dark:text-red-300 dark:hover:bg-red-800/30'
                }`}
              >
                Против
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedOption('abstain')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedOption === 'abstain'
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Воздержаться
              </motion.button>
            </div>
            
            <Button
              variant="flat-primary"
              leftIcon={<VoteIcon />}
              onClick={handleVote}
              isLoading={isVoting}
              disabled={!selectedOption || isVoting}
              fullWidth
            >
              Проголосовать
            </Button>
          </div>
        )}
        
        {/* Для завершенных голосований показываем результат */}
        {voting.status === 'completed' && (
          <div className="mt-3 flex items-center justify-center p-3 bg-brand-blue-light/10 dark:bg-brand-blue-dark/20 rounded-lg">
            <CheckBadgeIcon className="w-5 h-5 text-brand-blue-dark dark:text-brand-blue-light mr-2" />
            <span className="text-sm font-medium text-brand-blue-dark dark:text-brand-blue-light">
              {voting.result === 'passed' 
                ? 'Предложение принято' 
                : 'Предложение отклонено'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VotingCard; 