import React from 'react';
import Button from './ui/Button';
import { PawPrintIcon, HeartIcon } from './ui/icons';
import { Shelter } from '../types';
import { motion } from 'framer-motion';

interface ShelterCardProps {
  shelter: Shelter;
  onViewDetails: (id: string) => void;
  onDonate: (id: string) => void;
}

const ShelterCard: React.FC<ShelterCardProps> = ({
  shelter,
  onViewDetails,
  onDonate,
}) => {
  return (
    <motion.div 
      className="bg-white dark:bg-dark-800 rounded-card shadow-depth overflow-hidden border border-brand-blue-light/10 dark:border-dark-700 h-full flex flex-col"
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(49, 112, 142, 0.35)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={shelter.imageUrl} 
          alt={shelter.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
        <div className="absolute top-3 right-3 bg-brand-blue-dark text-white px-3 py-1 rounded-full text-xs font-medium shadow-depth-sm flex items-center">
          <PawPrintIcon className="w-3.5 h-3.5 mr-1" />
          <span>{shelter.animals} животных</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-brand-blue-dark dark:text-white mb-1">{shelter.name}</h3>
        <p className="text-sm text-brand-blue-medium dark:text-gray-400 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {shelter.location}
        </p>
        
        <div className="text-sm text-gray-700 dark:text-gray-300 mb-5 line-clamp-3 flex-grow">
          {shelter.description}
        </div>
        
        <div className="flex items-center justify-between gap-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(shelter.id)}
            leftIcon={<PawPrintIcon />}
          >
            Подробнее
          </Button>
          
          <Button 
            variant="flat-primary" 
            size="sm" 
            onClick={() => onDonate(shelter.id)}
            leftIcon={<HeartIcon />}
          >
            Помочь
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ShelterCard; 