class TableSettings {
  #tableSettings;
  #gearBox;

  constructor() {
    this.#tableSettings = Helper.getSelector('#tableSettings');
    this.#gearBox = Helper.getSelector('#tableSettingsBox');
  }

  getTableSettingsTag() {
    return this.#tableSettings;
  }

  init() {
    let i = 0;
    // Table settings
    Helper.setEvent(this.#tableSettings, 'click', e => {
      if (!i) {
        Helper.rmClass(this.#gearBox, 'hide');
        Helper.addClass(this.#gearBox, 'tableSettingsBoxOpacity1');
        i++;
      } else {
        Helper.rmClass(this.#gearBox, 'tableSettingsBoxOpacity1');
        Helper.addClass(this.#gearBox, 'hide');
        i--;
      }
    });
  }
}