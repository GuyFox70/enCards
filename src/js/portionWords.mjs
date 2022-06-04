class ProtionWords {
  #portionField;
  #nextPortion;
  #prevPortion;
  #step;
  #maxPortion;
  #minPortion;
  #currentPortion;

  constructor() {
    this.#portionField = Helper.getSelector('#portionField');
    this.#nextPortion = Helper.getSelector('#nextPortion');
    this.#prevPortion = Helper.getSelector('#prevPortion');
    this.#step = 10;
    this.#maxPortion = 100;
    this.#minPortion = 10;
    this.#currentPortion = Helper.getInt(localStorage.getItem('limit')) || this.#maxPortion;
  }

  getCurrentPortion() {
    return this.#currentPortion;
  }

  #checkPortion(quantity) {
    if (quantity <= this.#minPortion)  {
      this.#currentPortion = this.#minPortion;
      this.#prevPortion.disabled = true;
      
      Helper.setAttr(this.#portionField, 'data-value', this.#currentPortion);
      Helper.addText(this.#portionField, this.#currentPortion);
    } else if (quantity >= this.#maxPortion) {
      this.#currentPortion = this.#maxPortion;
      this.#nextPortion.disabled = true;
      
      Helper.setAttr(this.#portionField, 'data-value', this.#currentPortion);
      Helper.addText(this.#portionField, this.#currentPortion);
    } else {
      Helper.rmAttr(this.#prevPortion, 'disabled');
      Helper.rmAttr(this.#nextPortion, 'disabled');
  
      Helper.setAttr(this.#portionField, 'data-value', this.#currentPortion);
      Helper.addText(this.#portionField, this.#currentPortion);
    }
  }

  isCard(card, menu, topButtons) {
    if (!Helper.hasClass(card.getFlipCard(), 'hidden')) {
      card.resetCounter();
      card.setWordToField(menu.getWords(), menu.getPartSpeech());
    } else {
      topButtons.createTable(menu.getWords(), menu.getPartSpeech());
    }
  }

  init(card, menu, topButtons, pages) {
    this.#checkPortion(this.#currentPortion);
    Helper.addText(this.#portionField, this.#currentPortion);

    Helper.setAttr(this.#portionField, 'data-value', this.#currentPortion);
  
    Helper.setEvent(this.#nextPortion, 'click', () => {
      this.#currentPortion = this.#currentPortion + this.#step;

      this.#checkPortion(this.#currentPortion);

      pages.calculateAmountPages(pages.getAmountWords()[menu.getPartSpeech()], this.#currentPortion);
      menu.setSkip(0);
      pages.checkPage(1);

      menu.setLimit(this.#currentPortion);

      menu.requestWordsFromDB()
      .then(data => {
        menu.setWords(data);

        this.isCard(card, menu, topButtons);
      })
      .catch(err => { console.log(err), alert(err.message); });
    });

    Helper.setEvent(this.#prevPortion, 'click', () => {
      this.#currentPortion = this.#currentPortion - this.#step;
      
      this.#checkPortion(this.#currentPortion);

      pages.calculateAmountPages(pages.getAmountWords()[menu.getPartSpeech()], this.#currentPortion);
      menu.setSkip(0);
      pages.checkPage(1);
      
      menu.setLimit(this.#currentPortion);

      menu.requestWordsFromDB()
      .then(data => {
        menu.setWords(data);

        this.isCard(card, menu, topButtons);
      })
      .catch(err => { console.log(err), alert(err.message); });
    });
  }
}