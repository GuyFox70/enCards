class TableSettings {
  #tableSettings;
  #tableSettingsImg;
  #showTranslate;
  #hideTranslate;
  #gearBox;
  #i;
  #translateCells;

  constructor() {
    this.#tableSettings = Helper.getSelector('#tableSettings');
    this.#tableSettingsImg = Helper.getSelector('#tableSettings img');
    this.#showTranslate = Helper.getSelector('#showTranslate');
    this.#hideTranslate = Helper.getSelector('#hideTranslate');
    this.#gearBox = Helper.getSelector('#tableSettingsBox');
    this.#i = 0;
    this.#translateCells = null;
  }

  getTableSettingsTag() {
    return this.#tableSettings;
  }
  
  getTableSettingsImgTag() {
    return this.#tableSettingsImg;
  }

  getGearBox() {
    return this.#gearBox;
  }

  resetCounter() {
    this.#i = 0;
    this.#translateCells = null;
  }

  setChecked() {
    this.#showTranslate.checked = true;
  }

  init() {
    // Table settings
    Helper.setEvent(this.#tableSettings, 'click', e => {
      if (!this.#i) {
        Helper.addClass(this.#tableSettingsImg, 'rotate60');
        Helper.rmClass(this.#gearBox, 'hide');
        Helper.addClass(this.#gearBox, 'tableSettingsBoxOpacity1');
        this.#i++;
      } else {
        Helper.rmClass(this.#tableSettingsImg, 'rotate60');
        Helper.rmClass(this.#gearBox, 'tableSettingsBoxOpacity1');
        Helper.addClass(this.#gearBox, 'hide');
        this.#i--;
      }
    });
    // Show translate
    Helper.setEvent(this.#showTranslate, 'click', e => {
      for (const cell of this.#translateCells) {
        Helper.rmClass(cell, 'textTransperent');
      }

      this.#translateCells = null;
    });
    // Hide translate
    Helper.setEvent(this.#hideTranslate, 'click', e => {
      if (this.#translateCells === null) this.#translateCells = Helper.getSelectorAll('.cell__translate');
    
      for (let i = 1; i < this.#translateCells.length; i++) {
        Helper.addClass(this.#translateCells[i], 'textTransperent');
      }
    });
  }
}