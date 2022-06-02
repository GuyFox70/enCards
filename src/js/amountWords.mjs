class AmountWords {
  #amountField;
  #nextAmount;
  #prevAmount;
  #step;
  #maxAmount;
  #minAmount;
  #amount;
  #maxAmountPages;
  #minAmountPages;

  constructor() {
    this.#amountField = Helper.getSelector('#amountField');
    this.#nextAmount = Helper.getSelector('#nextAmount');
    this.#prevAmount = Helper.getSelector('#prevAmount');
    this.#step = 10;
    this.#maxAmount = 100;
    this.#minAmount = 10;
    this.#amount = Helper.getInt(localStorage.getItem('limit')) || this.#maxAmount;
    this.#maxAmountPages = 1;
    this.#minAmountPages = 1;
  }

  getAmountWords() {
    return this.#amount;
  }

  #checkLimit(quantity) {
    if (quantity <= this.#minAmount)  {
      this.#amount = this.#minAmount;
      this.#prevAmount.disabled = true;
      
      Helper.setAttr(this.#amountField, 'data-value', this.#amount);
      Helper.addText(this.#amountField, this.#amount);
    } else if (quantity >= this.#maxAmount) {
      this.#amount = this.#maxAmount;
      this.#nextAmount.disabled = true;
      
      Helper.setAttr(this.#amountField, 'data-value', this.#amount);
      Helper.addText(this.#amountField, this.#amount);
    } else {
      Helper.rmAttr(this.#prevAmount, 'disabled');
      Helper.rmAttr(this.#nextAmount, 'disabled');
  
      Helper.setAttr(this.#amountField, 'data-value', this.#amount);
      Helper.addText(this.#amountField, this.#amount);
    }
  }

  init(card, menu, topButtons) {
    this.#checkLimit(this.#amount);
    Helper.addText(this.#amountField, this.#amount);

    Helper.setAttr(this.#amountField, 'data-value', this.#amount);
  
    Helper.setEvent(this.#nextAmount, 'click', () => {
      this.#amount = this.#amount + this.#step;

      this.#checkLimit(this.#amount);

      menu.setLimit(this.#amount);

      menu.requestWordsFromDB()
      .then(data => {
        menu.setWords(data);

        if (!Helper.hasClass(card.getFlipCard(), 'hidden')) {
          card.resetCounter();
          card.setWordToField(menu.getWords(), menu.getPartSpeech());
        } else {
          topButtons.createTable(menu.getWords(), menu.getPartSpeech());
        }
      })
      .catch(err => { console.log(err), alert(err.message); });
    });

    Helper.setEvent(this.#prevAmount, 'click', () => {
      this.#amount = this.#amount - this.#step;
      
      this.#checkLimit(this.#amount);
      
      menu.setLimit(this.#amount);

      menu.requestWordsFromDB()
      .then(data => {
        menu.setWords(data);

        if (!Helper.hasClass(card.getFlipCard(), 'hidden')) {
          card.resetCounter();
          card.setWordToField(menu.getWords(), menu.getPartSpeech());
        } else {
          topButtons.createTable(menu.getWords(), menu.getPartSpeech());
        }
      })
      .catch(err => { console.log(err), alert(err.message); });
    });
  }
}