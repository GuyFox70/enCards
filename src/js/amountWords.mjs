class AmountWords extends Helper {
  #amountField;
  #nextAmount;
  #prevAmount;
  #step;
  #maxAmount;
  #minAmount;
  #amount;
  #currentPage;
  #maxAmountPages;
  #minAmountPages;

  constructor() {
    super();
    this.#amountField = super.getSelector('#amountField');
    this.#nextAmount = super.getSelector('#nextAmount');
    this.#prevAmount = super.getSelector('#prevAmount');
    this.#step = 10;
    this.#maxAmount = 100;
    this.#minAmount = 10;
    this.#amount = super.getInt(localStorage.getItem('limit')) || this.#maxAmount;
    this.#currentPage = super.getSelector('#currentPage');
    this.#maxAmountPages = 1;
    this.#minAmountPages = 1;
  }

  #checkLimit(quantity) {
    if (quantity <= this.#minAmount)  {
      this.#amount = this.#minAmount;
      this.#prevAmount.disabled = true;
      
      this.setAttr(this.#amountField, 'data-value', this.#amount);
      this.#amountField.innerHTML = this.#amount;
    } else if (quantity >= this.#maxAmount) {
      this.#amount = this.#maxAmount;
      this.#nextAmount.disabled = true;
      
      this.setAttr(this.#amountField, 'data-value', this.#amount);
      this.#amountField.innerHTML = this.#amount;
    } else {
      this.rmAttr(this.#prevAmount, 'disabled');
      this.rmAttr(this.#nextAmount, 'disabled');
  
      this.setAttr(this.#amountField, 'data-value', this.#amount);
      this.#amountField.innerHTML = this.#amount;
    }
  }

  init(card, menu, topButtons) {
    this.#checkLimit(this.#amount);
    this.#amountField.innerHTML = this.#amount;

    this.setAttr(this.#amountField, 'data-value', this.#amount);
  
    this.setEventElement(this.#nextAmount, 'click', () => {
      this.#amount = this.#amount + this.#step;

      this.#checkLimit(this.#amount);

      menu.setLimit(this.#amount);

      menu.requestWordsFromDB(menu.getSkip(), this.#amount, (err, data) => {
        if (err) {
          alert(err.message);
        } else {
          menu.setWords(data);

          if (!this.hasClass(card.getFlipCard(), 'hidden')) {
            card.resetCounter();
            card.setWordToField(menu.getWords(), menu.getPartSpeech());
          } else {
            topButtons.createTable(menu.getWords(), menu.getPartSpeech());
          }
        }
      });
    });

    this.setEventElement(this.#prevAmount, 'click', () => {
      this.#amount = this.#amount - this.#step;
      
      this.#checkLimit(this.#amount);
      
      menu.setLimit(this.#amount);
      menu.requestWordsFromDB(menu.getSkip(), this.#amount, (err, data) => {
        if (err) {
          alert(err.message);
        } else {
          menu.setWords(data);
    
          if (!this.hasClass(card.getFlipCard(), 'hidden')) {
            card.resetCounter();
            card.setWordToField(menu.getWords(), menu.getPartSpeech());
          } else {
            topButtons.createTable(menu.getWords(), menu.getPartSpeech());
          }
        }
      });
    });
  }
}