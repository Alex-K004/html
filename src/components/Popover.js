export default class Popover {
  constructor(element, options = {}) {
    this.element = element;
    this.title = options.title || 'Popover title';
    this.content = options.content || 'And here\'s some amazing content. It\'s very engaging. Right?';
    this.popover = null;
    this.isVisible = false;
    
    this.handleElementClick = this.handleElementClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    
    this.init();
  }
  
  init() {
    // Create popover element
    this.popover = document.createElement('div');
    this.popover.className = 'popover';
    this.popover.style.display = 'none';
    this.popover.style.position = 'absolute';
    
    // Create arrow (будет указывать ВНИЗ на кнопку)
    const arrow = document.createElement('div');
    arrow.className = 'popover-arrow';
    
    // Create popover header
    const popoverHeader = document.createElement('div');
    popoverHeader.className = 'popover-header';
    popoverHeader.textContent = this.title;
    
    // Create popover body
    const popoverBody = document.createElement('div');
    popoverBody.className = 'popover-body';
    popoverBody.innerHTML = this.content;
    
    // Append elements
    this.popover.append(arrow, popoverHeader, popoverBody);
    
    // Add popover to body
    document.body.append(this.popover);
    
    // Add click event
    this.element.addEventListener('click', this.handleElementClick);
    
    // Close popover when clicking outside
    document.addEventListener('click', this.handleDocumentClick);
  }
  
  handleElementClick(e) {
    e.stopPropagation();
    this.toggle();
  }
  
  handleDocumentClick(e) {
    if (this.isVisible && 
        !this.popover.contains(e.target) && 
        e.target !== this.element &&
        !this.element.contains(e.target)) {
      this.hide();
    }
  }
  
  show() {
    if (this.isVisible) return;
    
    // Calculate position - ставим НАД кнопкой
    const rect = this.element.getBoundingClientRect();
    const popoverWidth = this.popover.offsetWidth || 276;
    const popoverHeight = this.popover.offsetHeight || 100;
    
    // Position popover ABOVE the element (над кнопкой)
    const top = rect.top + window.scrollY - popoverHeight - 10; // 10px отступ сверху
    const left = rect.left + window.scrollX + (rect.width / 2) - (popoverWidth / 2);
    
    // Не даем выйти за границы экрана
    const adjustedLeft = Math.max(10, Math.min(
      left,
      window.innerWidth - popoverWidth - 10
    ));
    
    this.popover.style.top = `${Math.max(10, top)}px`;
    this.popover.style.left = `${adjustedLeft}px`;
    this.popover.style.display = 'block';
    
    // Позиционируем стрелку ВНИЗУ popover (чтобы указывала на кнопку)
    const arrow = this.popover.querySelector('.popover-arrow');
    const arrowLeft = (rect.left + window.scrollX + (rect.width / 2)) - adjustedLeft - 8;
    arrow.style.left = `${arrowLeft}px`;
    arrow.style.top = 'auto';
    arrow.style.bottom = '-10px'; // Располагаем стрелку ВНИЗУ popover
    
    this.isVisible = true;
  }
  
  hide() {
    if (!this.isVisible) return;
    
    this.popover.style.display = 'none';
    this.isVisible = false;
  }
  
  toggle() {
    this.isVisible ? this.hide() : this.show();
  }
  
  destroy() {
    this.hide();
    
    if (this.element) {
      this.element.removeEventListener('click', this.handleElementClick);
    }
    
    try {
      document.removeEventListener('click', this.handleDocumentClick);
    } catch  {
      // Игнорируем ошибку
    }
    
    if (this.popover && this.popover.parentNode) {
      this.popover.remove();
    }
    
    this.element = null;
    this.popover = null;
  }
}
