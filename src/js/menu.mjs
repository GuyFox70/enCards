class Menu extends Helper {
  #menuItem;
  #topBtMenu;
  #menu;
  #i;
  #partSpeech;
  #words;
  #limit;
  #skip;
  #card;

  constructor(card) {
    super();
    this.#menuItem = super.getSelectorAll('.menu__item');
    this.#topBtMenu = super.getSelector('#topBtMenu');
    this.#menu = super.getSelector('#menu');
    this.#partSpeech = super.getAttr(super.getSelector('.activeTab'), 'data-partSpeech');
    this.#i = 0;
    this.#words = super.fromJson(localStorage.getItem('words')) || null;
    this.#skip = super.getInt(localStorage.getItem('skip')) || 0;
    this.#limit = super.getInt(localStorage.getItem('limit')) || 100;
    this.#card = card;
  }

  getSkip() {
    return this.#skip;
  }

  getLimit() {
    return this.#limit;
  }

  getPartSpeech() {
    return this.#partSpeech;
  }

  getWords() {
    return this.#words;
  }

  setLimit(limit) {
    this.#limit = limit;
  }

  setWords(words) {
    this.#words = words;
  }

  requestWordsFromDB(skip, limit, callback) {
    const formData = new FormData;
    formData.set('skip', skip);
    formData.set('limit', limit);
    formData.set('partSpeech', this.#partSpeech);
  
    this.sendFetch('/getWords', { method: 'POST', body: formData }, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data);
      }
    });
  }

  #addEventItemsMenu() {
    for (const item of this.#menuItem) {
      this.setEventElement(item, 'click', () => {
        if (this.#partSpeech !== this.getAttr(item, 'data-partSpeech')) {
          this.#menuItem.forEach(elem => this.removeClass(elem, 'activeTab'));
          this.addClass(item, 'activeTab');

          this.#partSpeech = this.getAttr(item, 'data-partSpeech');

          this.removeAttr(this.#menu, 'style');
          this.removeClass(this.#topBtMenu, 'activeItem');
          this.#i--;

          this.requestWordsFromDB(this.#skip, this.#limit, (err, data) => {
            if (err) {
              alert(err.message);
            } else {
              this.#words = data;
              this.#card.setI(0);
              this.#card.setWordToField(this.#words, this.#partSpeech);
            }
          });
        }
      });
    }
  }

  init() {
    if (this.#words === null) {
      this.requestWordsFromDB(this.#skip, this.#limit, (err, data) => {
        if (err) {
          alert(err.message);
        } else {
          this.#words = data;
          this.#card.setWordToField(this.#words, this.#partSpeech);
        }
      });
    } else {
      this.#card.setWordToField(this.#words, this.#partSpeech);
    }

    this.#addEventItemsMenu();

    this.setEventElement(this.#topBtMenu, 'click', () => {
      if (!this.#i) {
        this.addClass(this.#topBtMenu, 'activeItem');
        this.setAttr(this.#menu, 'style', 'left: 0; transition: left .3s linear;');
        this.#i++;
      } else {
        this.rmClass(this.#topBtMenu, 'activeItem');
        this.rmAttr(this.#menu, 'style');  
        this.#i--;
      }
    });
  }
}