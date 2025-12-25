/**
 * @jest-environment jsdom
 */

import Popover from '../src/components/Popover';

describe('Popover', () => {
  let button;
  
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="testButton">Test</button>
    `;
    button = document.getElementById('testButton');
  });
  
  test('should create popover element', () => {
    const popover = new Popover(button);
    // Используем переменную popover для проверки
    expect(popover).toBeInstanceOf(Popover);
    expect(document.querySelector('.popover')).not.toBeNull();
  });
  
  test('should show popover', () => {
    const popover = new Popover(button);
    
    // Mock position calculation
    button.getBoundingClientRect = () => ({
      top: 100,
      left: 100,
      width: 100,
      height: 40
    });
    
    popover.show();
    expect(popover.isVisible).toBe(true);
  });
  
  test('should hide popover', () => {
    const popover = new Popover(button);
    popover.isVisible = true;
    popover.hide();
    expect(popover.isVisible).toBe(false);
  });
  
  test('should toggle popover', () => {
    const popover = new Popover(button);
    
    button.getBoundingClientRect = () => ({
      top: 100,
      left: 100,
      width: 100,
      height: 40
    });
    
    popover.toggle();
    expect(popover.isVisible).toBe(true);
    
    popover.toggle();
    expect(popover.isVisible).toBe(false);
  });
  
});
