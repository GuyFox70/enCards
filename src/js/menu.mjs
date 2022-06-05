class Menu {
  #menuItem;
  #topBtMenu;
  #menu;
  #i;
  #partSpeech;
  #words;
  #limit;
  #skip;

  constructor() {
    this.#menuItem = Helper.getSelectorAll('.menu__item');
    this.#topBtMenu = Helper.getSelector('#topBtMenu');
    this.#menu = Helper.getSelector('#menu');
    this.#partSpeech = Helper.getAttr(Helper.getSelector('.activeTab'), 'data-partSpeech');
    this.#i = 0;
    this.#words = Helper.fromJson(localStorage.getItem('words')) || null;
    this.#skip = Helper.getInt(localStorage.getItem('skip')) || 0;
    this.#limit = Helper.getInt(localStorage.getItem('limit')) || 100;
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

  setSkip(skip) {
    this.#skip = skip;
  }

  setWords(words) {
    this.#words = words;
  }

  requestWordsFromDB() {
    const formData = new FormData;
    formData.set('skip', this.#skip);
    formData.set('limit', this.#limit);
    formData.set('partSpeech', this.#partSpeech);

    return new Promise((resolve, reject) => {
      Helper.sendFetch('/getWords', { method: 'POST', body: formData })
      .then(resolve)
      .catch(reject);
    });
  }

  #addEventItemsMenu(card) {
    for (const item of this.#menuItem) {
      Helper.setEvent(item, 'click', () => {
        if (this.#partSpeech !== Helper.getAttr(item, 'data-partSpeech')) {
          this.#menuItem.forEach(elem => Helper.rmClass(elem, 'activeTab'));
          Helper.addClass(item, 'activeTab');

          this.#partSpeech = Helper.getAttr(item, 'data-partSpeech');

          Helper.rmAttr(this.#menu, 'style');
          Helper.rmClass(this.#topBtMenu, 'activeItem');
          this.#i--;

          this.requestWordsFromDB()
          .then(data => {
            this.#words = data;
            card.resetCounter();
            card.setWordToField(this.#words, this.#partSpeech);
          })
          .catch(err => { console.log(err), alert(err.message); });
        }
      });
    }
  }

  init(topButtons, card) {
    if (this.#words === null) {
      this.requestWordsFromDB()
      .then(data => {
        this.#words = data;
        card.setWordToField(this.#words, this.#partSpeech, topButtons.isEnglish());
      })
      .catch(err => { console.log(err), alert(err.message); });
    } else {
      card.setWordToField(this.#words, this.#partSpeech, topButtons.isEnglish());
    }

    this.#addEventItemsMenu(card);

    Helper.setEvent(this.#topBtMenu, 'click', () => {
      if (!this.#i) {
        Helper.addClass(this.#topBtMenu, 'activeItem');
        Helper.setAttr(this.#menu, 'style', 'left: 0; transition: left .3s linear;');
        this.#i++;
      } else {
        Helper.rmClass(this.#topBtMenu, 'activeItem');
        Helper.rmAttr(this.#menu, 'style');  
        this.#i--;
      }
    });
  }
}