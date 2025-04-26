// Полифилы для Node.js API в браузере
import { Buffer } from 'buffer';

// Делаем Buffer доступным глобально
window.Buffer = Buffer;

// Полифилы для работы с ton-core
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window;
} 