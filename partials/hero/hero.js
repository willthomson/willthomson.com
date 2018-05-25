export default class HeroPartial {
  constructor(config) {
    this.config = config || {};

    this.importanceButtonContainerClass = 'hero__importance-btns';
    this.importanceButtonClass = 'hero__importance-btn';
    this.importanceAttr = 'data-importance';

    this.importanceValues = [
      {
        name: 'Small',
        value: 1
      }, {
        name: 'Medium',
        value: 2
      }, {
        name: 'Large',
        value: 3
      },
    ];
    this.init();
  }

  init() {
    const buttonContainer = document.querySelector(`.${this.importanceButtonContainerClass}`);

    // Create the buttons
    this.importanceValues.forEach(importanceValue => {
      buttonContainer.innerHTML += `<button class="${this.importanceButtonClass}" data-importance="${importanceValue.value}">${importanceValue.name}</button>`;
    });

    // Add click events
    document.querySelectorAll(`.${this.importanceButtonClass}`).forEach(btn => {
      btn.addEventListener('click', e => {
        const importance = e.target.getAttribute(this.importanceAttr);
        const bodyEl = document.querySelector('body');

        // Remove all importance classnames from body
        this.importanceValues.forEach(importanceValue => {
          bodyEl.classList.remove(`importance-${importanceValue.value}`);
        });

        // Add the importance classname from the clicked button
        bodyEl.classList.add(`importance-${importance}`);
      });
    });
  }
}
