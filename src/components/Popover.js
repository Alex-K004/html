export default class Popover {
  constructor(element) {
    this.element = element;
    this.popover = null;
    this.isVisible = false;
    this.init();
  }

  init() {
    // Create popover element
    this.popover = document.createElement('div');
    this.popover.className = 'popover';
    this.popover.style.display = 'none';
    
    // Create arrow
    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'popover-header';
    header.textContent = 'Popover title';
    
    // Create body
    const body = document.createElement('div');
    body.className = 'popover-body';
    body.textContent = 'And here\'s some amazing content. It\'s very engaging. Right?';
    
    // Assemble
    this.popover.appendChild(arrow);
    this.popover.appendChild(header);
    this.popover.appendChild(body);
    
    // Add to DOM
    document.body.appendChild(this.popover);
    
    // Add event listeners
    this.element.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
    
    document.addEventListener('click', (e) => {
      if (this.isVisible && 
          !this.popover.contains(e.target) && 
          e.target !== this.element) {
        this.hide();
      }
    });
  }

  show() {
    if (this.isVisible) return;
    
    const rect = this.element.getBoundingClientRect();
    const popoverWidth = 276;
    
    // Position above button, centered
    const top = window.scrollY + rect.top - this.popover.offsetHeight - 10;
    const left = window.scrollX + rect.left + (rect.width / 2) - (popoverWidth / 2);
    
    this.popover.style.width = `${popoverWidth}px`;
    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
    this.popover.style.display = 'block';
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
}
