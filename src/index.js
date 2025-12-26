import './styles/styles.css';
import Popover from './components/Popover';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('popoverBtn');
  
  // Создаем popover с текстом из задания
  const popover = new Popover(button, {
    title: 'Popover title',
    content: 'And here\'s some amazing content. It\'s very engaging. Right?'
  });
  
  // Для отладки можно добавить в глобальную область видимости
  window.popover = popover;
});
