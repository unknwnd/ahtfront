import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { toast } from 'react-toastify';

// Временные моковые данные
export const MOCK_SHELTERS = [
  {
    id: '1',
    name: 'Добрые лапы',
    location: 'Москва',
    description: 'Приют для бездомных собак и кошек с возможностью адопции. Мы обеспечиваем полный уход за животными, включая ветеринарную помощь, стерилизацию/кастрацию и поиск новых хозяев.',
    animals: 120,
    needed: 5000,
    collected: 3245,
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:e8b25a80ad37caa916bcc2619b5a5d4c85c25abe433917323c94bd1a5a95fca5',
    photos: [
      'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1583511655826-05700442982d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 68,
      cats: 52,
      volunteers: 15,
      adoptions: 230
    },
    history: [
      { date: '2023-06-15', amount: 500, donor: 'Аноним' },
      { date: '2023-07-22', amount: 1000, donor: 'EQDrjaLahLkMB...' },
      { date: '2023-08-10', amount: 750, donor: 'Аноним' },
      { date: '2023-09-05', amount: 995, donor: 'EQBvRxu9...' }
    ]
  },
  {
    id: '2',
    name: 'Пушистый дом',
    location: 'Санкт-Петербург',
    description: 'Специализируемся на спасении кошек, попавших в трудную ситуацию. Предоставляем временное жилье, лечение и социализацию.',
    animals: 85,
    needed: 3500,
    collected: 1850,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    photos: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 0,
      cats: 85,
      volunteers: 12,
      adoptions: 155
    },
    history: [
      { date: '2023-07-01', amount: 300, donor: 'EQCpqrstuvwxyz...' },
      { date: '2023-08-15', amount: 700, donor: 'Аноним' },
      { date: '2023-09-11', amount: 850, donor: 'EQDabcdefghijk...' }
    ]
  },
  {
    id: '3',
    name: 'Верный друг',
    location: 'Новосибирск',
    description: 'Крупный приют для собак разных пород и возрастов. Активно ищем новых хозяев и проводим программы реабилитации для животных с особенностями поведения.',
    animals: 150,
    needed: 7000,
    collected: 6100,
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8',
    photos: [
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1588269845464-8993565cac3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 150,
      cats: 0,
      volunteers: 25,
      adoptions: 310
    },
    history: [
      { date: '2023-06-20', amount: 1500, donor: 'EQAlmnopqrstuv...' },
      { date: '2023-07-25', amount: 2000, donor: 'Аноним' },
      { date: '2023-08-30', amount: 1200, donor: 'EQXyz123456789...' },
      { date: '2023-09-18', amount: 1400, donor: 'Аноним' }
    ]
  },
  {
    id: '4',
    name: 'Лапа помощи',
    location: 'Екатеринбург',
    description: 'Частный приют с программой реабилитации для животных после травм и жестокого обращения. Особое внимание уделяем животным с ограниченными возможностями, включая слепых, глухих и с ампутированными конечностями.',
    animals: 65,
    needed: 4200,
    collected: 2780,
    image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4',
    photos: [
      'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1598397677202-95b6a8307418?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 35,
      cats: 30,
      volunteers: 18,
      adoptions: 120
    },
    history: [
      { date: '2023-07-05', amount: 450, donor: 'EQDuvwxyz123456...' },
      { date: '2023-07-28', amount: 600, donor: 'Аноним' },
      { date: '2023-08-17', amount: 900, donor: 'EQDghijklmnopqr...' },
      { date: '2023-09-22', amount: 830, donor: 'Аноним' }
    ]
  },
  {
    id: '5',
    name: 'Второй шанс',
    location: 'Казань',
    description: 'Приют со специализацией на старых животных и животных с хроническими заболеваниями. Создаем комфортные условия для проживания, обеспечиваем постоянный уход и медицинскую помощь тем, у кого мало шансов найти новый дом.',
    animals: 95,
    needed: 6500,
    collected: 4350,
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8',
    photos: [
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1601758174039-617983b8cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1575467678930-c7acd65d2c8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 42,
      cats: 53,
      volunteers: 22,
      adoptions: 65
    },
    history: [
      { date: '2023-06-10', amount: 1200, donor: 'Аноним' },
      { date: '2023-07-15', amount: 850, donor: 'EQDstuvwxyz1234...' },
      { date: '2023-08-22', amount: 920, donor: 'EQ9abcdefghijkl...' },
      { date: '2023-09-30', amount: 1380, donor: 'Аноним' }
    ]
  },
  {
    id: '6',
    name: 'Мурка и Барбос',
    location: 'Краснодар',
    description: 'Семейный приют для животных с передержкой на дому у волонтеров. Специализируемся на социализации животных с улицы и работе с поведенческими проблемами. Проводим курсы дрессировки и подготовку к жизни в семье.',
    animals: 45,
    needed: 2800,
    collected: 1950,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1',
    photos: [
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1551298698-66b830a4f11c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 21,
      cats: 24,
      volunteers: 10,
      adoptions: 185
    },
    history: [
      { date: '2023-07-10', amount: 220, donor: 'EQYz123456789ab...' },
      { date: '2023-08-05', amount: 350, donor: 'Аноним' },
      { date: '2023-09-12', amount: 680, donor: 'EQRcdefghijklmn...' },
      { date: '2023-10-01', amount: 700, donor: 'Аноним' }
    ]
  },
  {
    id: '13',
    name: 'Преданные сердца',
    location: 'Красноярск',
    description: 'Первый в городе приют с полноценным ветеринарным отделением и операционной. Специализируемся на лечении сложных случаев и реабилитации животных после серьезных травм. Имеем собственную лабораторию для анализов и диагностики.',
    animals: 105,
    needed: 9800,
    collected: 7350,
    image: 'https://images.unsplash.com/photo-1455526050980-d3e7b9b789a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:y9t8r7e6w5q4n3m2b1v0c9x8z7l6k5j4h3g2f1d0s9a8p7o6i5u4y3t2r1',
    photos: [
      'https://images.unsplash.com/photo-1455526050980-d3e7b9b789a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1548199192-09c73aa9c7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 55,
      cats: 50,
      volunteers: 32,
      adoptions: 275
    },
    history: [
      { date: '2023-06-30', amount: 1800, donor: 'EQX9z0l1k2j3h4g5f6d7s8a9p0o1i2u3...' },
      { date: '2023-08-14', amount: 1600, donor: 'Аноним' },
      { date: '2023-09-23', amount: 2150, donor: 'EQC8v9b0n1m2a3s4d5f6g7h8j9k0l1z2...' },
      { date: '2023-10-08', amount: 1800, donor: 'Аноним' }
    ]
  },
  {
    id: '14',
    name: 'Островок надежды',
    location: 'Севастополь',
    description: 'Уютный прибрежный приют, специализирующийся на спасении животных, пострадавших от зимних холодов и летних лесных пожаров. Программа "Лечебные прогулки" - совместные прогулки животных и людей с ограниченными возможностями на побережье.',
    animals: 60,
    needed: 4100,
    collected: 2870,
    image: 'https://images.unsplash.com/photo-1583336663277-620dc1996580?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:c9v8b7n6m5a4s3d2f1g0h9j8k7l6z5x4c3v2b1n0m9a8s7d6f5g4h3j2k1',
    photos: [
      'https://images.unsplash.com/photo-1583336663277-620dc1996580?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1596797782496-f08f3138a563?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1557495235-340eb888a9fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 32,
      cats: 28,
      volunteers: 14,
      adoptions: 145
    },
    history: [
      { date: '2023-07-08', amount: 650, donor: 'Аноним' },
      { date: '2023-08-19', amount: 820, donor: 'EQM6n7m8a9s0d1f2g3h4j5k6l7z8x9c0...' },
      { date: '2023-09-14', amount: 700, donor: 'EQP3o4i5u6y7t8r9e0w1q2n3m4b5v6c7...' },
      { date: '2023-10-20', amount: 700, donor: 'Аноним' }
    ]
  },
  {
    id: '15',
    name: 'Четыре лапы',
    location: 'Тюмень',
    description: 'Семейный приют для животных всех видов с особым вниманием к собакам северных пород. Организуем ездовые тренировки с хаски и маламутами, активно участвуем в соревнованиях. Имеем обширную территорию с трассами для тренировок.',
    animals: 80,
    needed: 5500,
    collected: 4100,
    image: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:m1a2s3d4f5g6h7j8k9l0z1x2c3v4b5n6m7a8s9d0f1g2h3j4k5l6z7x8c9',
    photos: [
      'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 65,
      cats: 15,
      volunteers: 18,
      adoptions: 190
    },
    history: [
      { date: '2023-06-22', amount: 950, donor: 'EQS8d9f0g1h2j3k4l5z6x7c8v9b0n1m2...' },
      { date: '2023-08-07', amount: 1050, donor: 'Аноним' },
      { date: '2023-09-19', amount: 1200, donor: 'EQH4j5k6l7z8x9c0v1b2n3m4a5s6d7f8...' },
      { date: '2023-10-11', amount: 900, donor: 'Аноним' }
    ]
  },
  {
    id: '16',
    name: 'Пушистый причал',
    location: 'Мурманск',
    description: 'Северный приют для бездомных животных с программой адаптации к суровым климатическим условиям. Специализируемся на спасении от жестокого обращения и реабилитации после психологических травм. Тесно сотрудничаем с полицией и зоозащитными организациями.',
    animals: 55,
    needed: 3800,
    collected: 2340,
    image: 'https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:t0r9e8w7q6n5m4b3v2c1x0z9l8k7j6h5g4f3d2s1a0p9o8i7u6y5t4r3',
    photos: [
      'https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 30,
      cats: 25,
      volunteers: 12,
      adoptions: 110
    },
    history: [
      { date: '2023-07-15', amount: 520, donor: 'Аноним' },
      { date: '2023-08-22', amount: 650, donor: 'EQE1w2q3n4m5b6v7c8x9z0l1k2j3h4g5...' },
      { date: '2023-09-27', amount: 720, donor: 'EQK6l7z8x9c0v1b2n3m4a5s6d7f8g9h0...' },
      { date: '2023-10-18', amount: 450, donor: 'Аноним' }
    ]
  },
  {
    id: '17',
    name: 'Любящие руки',
    location: 'Ярославль',
    description: 'Просветительский приют с образовательным центром по ответственному обращению с животными. Проводим уроки для школьников, ведем блог и YouTube-канал о воспитании животных. Наши специалисты проводят консультации по поведенческим проблемам.',
    animals: 70,
    needed: 4600,
    collected: 3150,
    image: 'https://images.unsplash.com/photo-1567529684892-09290a1b2d05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:i9u8y7t6r5e4w3q2n1m0b9v8c7x6z5l4k3j2h1g0f9d8s7a6p5o4i3u2y1',
    photos: [
      'https://images.unsplash.com/photo-1567529684892-09290a1b2d05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1594129478972-a4b36bcef505?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1605529681582-8a7fcc4f1e1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 36,
      cats: 34,
      volunteers: 16,
      adoptions: 160
    },
    history: [
      { date: '2023-06-05', amount: 720, donor: 'EQW5q6n7m8b9v0c1x2z3l4k5j6h7g8f9...' },
      { date: '2023-08-12', amount: 850, donor: 'Аноним' },
      { date: '2023-09-10', amount: 780, donor: 'EQN2m3a4s5d6f7g8h9j0k1l2z3x4c5v6...' },
      { date: '2023-10-25', amount: 800, donor: 'Аноним' }
    ]
  },
  {
    id: '18',
    name: 'Доброе сердце',
    location: 'Воронеж',
    description: 'Волонтерский приют с программой реабилитации для животных с ограниченными возможностями. Имеем специальные коляски для животных с парализованными конечностями, ведем работу с незрячими и глухими питомцами, помогаем им адаптироваться.',
    animals: 45,
    needed: 6300,
    collected: 4750,
    image: 'https://images.unsplash.com/photo-1507145569372-d69bae8bc9a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:p1o2i3u4y5t6r7e8w9q0n1m2b3v4c5x6z7l8k9j0h1g2f3d4s5a6p7o8',
    photos: [
      'https://images.unsplash.com/photo-1507145569372-d69bae8bc9a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1599692392256-2d254ff3b4a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 22,
      cats: 23,
      volunteers: 20,
      adoptions: 85
    },
    history: [
      { date: '2023-07-18', amount: 1200, donor: 'EQZ8x9c0v1b2n3m4a5s6d7f8g9h0j1k2...' },
      { date: '2023-08-29', amount: 950, donor: 'Аноним' },
      { date: '2023-09-21', amount: 1350, donor: 'EQD4f5g6h7j8k9l0z1x2c3v4b5n6m7a8...' },
      { date: '2023-10-16', amount: 1250, donor: 'Аноним' }
    ]
  },
  {
    id: '19',
    name: 'Лесной приют',
    location: 'Архангельск',
    description: 'Загородный приют с обширной территорией для выгула и реабилитации, расположенный в сосновом бору. Предоставляем животным максимально естественные условия содержания. Практикуем лесотерапию - оздоровительные прогулки в лесу для животных после болезней.',
    animals: 85,
    needed: 5200,
    collected: 3870,
    image: 'https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:s4a5d6f7g8h9j0k1l2z3x4c5v6b7n8m9a0s1d2f3g4h5j6k7l8z9x0c1',
    photos: [
      'https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1607215446920-d003efdcd061?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 52,
      cats: 33,
      volunteers: 18,
      adoptions: 180
    },
    history: [
      { date: '2023-06-10', amount: 870, donor: 'Аноним' },
      { date: '2023-08-21', amount: 1050, donor: 'EQY6t7r8e9w0q1n2m3b4v5c6x7z8l9k0...' },
      { date: '2023-09-12', amount: 920, donor: 'EQB2n3m4a5s6d7f8g9h0j1k2l3z4x5c6...' },
      { date: '2023-10-08', amount: 1030, donor: 'Аноним' }
    ]
  },
  {
    id: '20',
    name: 'Звериный парк',
    location: 'Ульяновск',
    description: 'Инновационный приют с концепцией открытого пространства и общественного участия. Здесь каждый желающий может прийти, поухаживать за животными, погулять с ними, а также провести время в зоне коворкинга, работая в окружении пушистых друзей.',
    animals: 65,
    needed: 3900,
    collected: 2150,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:l9k8j7h6g5f4d3s2a1p0o9i8u7y6t5r4e3w2q1n0m9b8v7c6x5z4l3k2',
    photos: [
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 31,
      cats: 34,
      volunteers: 14,
      adoptions: 140
    },
    history: [
      { date: '2023-07-06', amount: 450, donor: 'EQF3d4s5a6p7o8i9u0y1t2r3e4w5q6n7...' },
      { date: '2023-08-18', amount: 580, donor: 'Аноним' },
      { date: '2023-09-29', amount: 620, donor: 'EQJ0h1g2f3d4s5a6p7o8i9u0y1t2r3e4...' },
      { date: '2023-10-15', amount: 500, donor: 'Аноним' }
    ]
  },
  {
    id: '21',
    name: 'Меховой городок',
    location: 'Томск',
    description: 'Приют с профессиональной командой кинологов и фелинологов. Специализируемся на коррекции поведения сложных животных, проводим дрессировку и помогаем новым владельцам наладить контакт с питомцами. Имеем собственную школу для хозяев.',
    animals: 95,
    needed: 6700,
    collected: 5100,
    image: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:a8s7d6f5g4h3j2k1l0z9x8c7v6b5n4m3a2s1d0f9g8h7j6k5l4z3x2c1',
    photos: [
      'https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1493916665398-143bdeabe500?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 55,
      cats: 40,
      volunteers: 22,
      adoptions: 210
    },
    history: [
      { date: '2023-06-14', amount: 1100, donor: 'EQV5c6v7b8n9m0a1s2d3f4g5h6j7k8l9...' },
      { date: '2023-08-30', amount: 1350, donor: 'Аноним' },
      { date: '2023-09-18', amount: 1250, donor: 'EQG8h9j0k1l2z3x4c5v6b7n8m9a0s1d2...' },
      { date: '2023-10-22', amount: 1400, donor: 'Аноним' }
    ]
  },
  {
    id: '22',
    name: 'Теплый уголок',
    location: 'Хабаровск',
    description: 'Дальневосточный приют с программой подготовки животных к суровым зимам. Имеем хорошо утепленные вольеры, крытые площадки для прогулок в ненастье, мастерскую по пошиву одежды для собак мелких пород и домашний стационар для больных животных.',
    animals: 70,
    needed: 4900,
    collected: 3250,
    image: 'https://images.unsplash.com/photo-1551884831-d98853a090d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:q7w6e5r4t3y2u1i0o9p8a7s6d5f4g3h2j1k0l9z8x7c6v5b4n3m2q1w0',
    photos: [
      'https://images.unsplash.com/photo-1551884831-d98853a090d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 38,
      cats: 32,
      volunteers: 15,
      adoptions: 165
    },
    history: [
      { date: '2023-07-11', amount: 680, donor: 'Аноним' },
      { date: '2023-08-23', amount: 790, donor: 'EQT3y4u5i6o7p8a9s0d1f2g3h4j5k6l7...' },
      { date: '2023-09-16', amount: 920, donor: 'EQO1p2a3s4d5f6g7h8j9k0l1z2x3c4v5...' },
      { date: '2023-10-09', amount: 860, donor: 'Аноним' }
    ]
  },
  {
    id: '23',
    name: 'Серебряная подкова',
    location: 'Брянск',
    description: 'Уникальный приют с программой иппотерапии и реабилитации через общение с животными. Помимо кошек и собак, у нас живут спасенные лошади, козы, овцы и кролики. Наши подопечные помогают детям с особенностями развития и взрослым с посттравматическим стрессом.',
    animals: 110,
    needed: 7800,
    collected: 6500,
    image: 'https://images.unsplash.com/photo-1517502166878-35c93a0072f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:u9i8o7p6a5s4d3f2g1h0j9k8l7z6x5c4v3b2n1m0u9i8o7p6a5s4d3f2',
    photos: [
      'https://images.unsplash.com/photo-1517502166878-35c93a0072f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1522126754354-9da2594e6254?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 42,
      cats: 38,
      volunteers: 28,
      adoptions: 230
    },
    history: [
      { date: '2023-06-28', amount: 1500, donor: 'EQI6o7p8a9s0d1f2g3h4j5k6l7z8x9c0...' },
      { date: '2023-08-15', amount: 1750, donor: 'Аноним' },
      { date: '2023-09-24', amount: 1680, donor: 'EQU4i5o6p7a8s9d0f1g2h3j4k5l6z7x8...' },
      { date: '2023-10-19', amount: 1570, donor: 'Аноним' }
    ]
  },
  {
    id: '24',
    name: 'Уютный мир',
    location: 'Рязань',
    description: 'Приют с акцентом на комфорт и благополучие пожилых животных. Создаем условия, максимально приближенные к домашним: мягкие лежанки, подогреваемые полы, индивидуальные игрушки и лакомства. Практикуем "серебряное" волонтерство - пенсионеры помогают пожилым животным.',
    animals: 50,
    needed: 3600,
    collected: 2480,
    image: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    address: '0:g7h6j5k4l3z2x1c0v9b8n7m6a5s4d3f2g1h0j9k8l7z6x5c4v3b2n1m0',
    photos: [
      'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    stats: {
      dogs: 27,
      cats: 23,
      volunteers: 16,
      adoptions: 95
    },
    history: [
      { date: '2023-07-02', amount: 580, donor: 'EQR8e9w0q1n2m3b4v5c6x7z8l9k0j1h2...' },
      { date: '2023-08-26', amount: 620, donor: 'Аноним' },
      { date: '2023-09-13', amount: 730, donor: 'EQM5a6s7d8f9g0h1j2k3l4z5x6c7v8b9...' },
      { date: '2023-10-28', amount: 550, donor: 'Аноним' }
    ]
  }
];

const ShelterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tonConnectUI] = useTonConnectUI();
  const [donationAmount, setDonationAmount] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'photos'>('info');
  
  // Находим приют по ID из URL параметра
  const shelter = MOCK_SHELTERS.find(s => s.id === id);
  
  // Если приют не найден, показываем сообщение об ошибке
  if (!shelter) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Приют не найден</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Приют с ID {id} не существует или был удален.
        </p>
        <button 
          onClick={() => navigate('/shelters')}
          className="btn-primary"
        >
          Вернуться к списку приютов
        </button>
      </div>
    );
  }
  
  const progress = (shelter.collected / shelter.needed) * 100;

  // Обработчик для отправки пожертвования
  const handleDonate = async () => {
    if (!tonConnectUI.connected) {
      toast.info('Пожалуйста, подключите TON кошелек');
      return;
    }

    try {
      // В реальном приложении здесь будет вызов смарт-контракта для отправки TON
      toast.success(`Пожертвование ${donationAmount} TON успешно отправлено!`);
    } catch (error) {
      toast.error('Произошла ошибка при отправке пожертвования');
      console.error(error);
    }
  };
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={shelter.image} 
              alt={shelter.name} 
              className="w-full h-64 md:h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/800x600/e2e8f0/64748b?text=Нет+изображения';
              }}
            />
          </div>
          <div className="md:w-1/2 p-4 md:p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {shelter.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {shelter.location}
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {shelter.description}
            </p>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2 text-sm">
                <span>Собрано средств:</span>
                <span className="font-medium">{shelter.collected} / {shelter.needed} TON</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500">
                {progress.toFixed(1)}%
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  className="input w-32"
                />
                <span className="inline-flex items-center px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                  TON
                </span>
                <button 
                  onClick={handleDonate}
                  className="btn-primary flex-grow"
                >
                  Пожертвовать
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Адрес смарт-контракта: {shelter.address}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Вкладки с информацией */}
      <div className="card">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'info' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            Информация
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'history' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('history')}
          >
            История пожертвований
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'photos' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('photos')}
          >
            Фотографии
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'info' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">О приюте</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary-600">{shelter.stats.dogs}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Собак</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary-600">{shelter.stats.cats}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Кошек</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary-600">{shelter.stats.volunteers}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Волонтеров</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary-600">{shelter.stats.adoptions}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Пристроено</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Приют "{shelter.name}" активно занимается спасением и заботой о бездомных животных. 
                Мы обеспечиваем безопасную среду, медицинскую помощь и питание для наших подопечных. 
                Наша цель - найти каждому животному новый дом и любящую семью.
              </p>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">История пожертвований</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Дата</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Сумма (TON)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Отправитель</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {shelter.history.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.amount}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.donor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'photos' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Фотографии приюта</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shelter.photos.map((photo, index) => (
                  <div key={index} className="overflow-hidden rounded-lg">
                    <img 
                      src={photo} 
                      alt={`Фото ${index + 1}`} 
                      className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Нет+изображения';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterDetails; 
