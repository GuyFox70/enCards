class Card extends Helper {
  #flipCard;
  #flipCardInner;
  #eng;
  #mistakeReport;
  #btnsendReport;
  #btnCancelReport;
  #btnPrev;
  #btnKnow;
  #btnNext;
  #i;
  #j;
  #wordField;
  #translateField;

  constructor() {
    super();
    this.#flipCard = super.getSelector('#flipCard');
    this.#eng = super.getSelector('#eng');
    this.#mistakeReport = super.getSelector('#mistakeReport');
    this.#btnsendReport = super.getSelector('#sendReport');
    this.#btnCancelReport = super.getSelector('#cancelReport');
    this.#btnPrev = super.getSelector('#prevWord');
    this.#btnKnow = super.getSelector('#knowWord');
    this.#btnNext = super.getSelector('#nextWord');
    this.#wordField = super.getSelector('#wordField');
    this.#translateField = super.getSelector('#translateField');
    this.#flipCardInner = super.getSelector('#flipCardInner');

    this.#i = 0;
    this.#j = 0;
  }

  getFlipCard() {
    return this.#flipCard
  }

  getWordField() {
    return this.#wordField;
  }

  getTranslateField() {
    return this.#translateField;
  }

  resetCounter() {
    this.#i = 0;
  }

  setWordToField(words, partSpeech) {
    setTimeout(() => {
      if (words === null || words.length === 0) {
        alert('Empty');
        this.#wordField.innerHTML = 'Example';
        this.#translateField.innerHTML = 'Пример';
      } else {
        this.#wordField.innerHTML = words[this.#i].word;
        this.#translateField.innerHTML = words[this.#i].translate[partSpeech].join(', ');
      }
    }, 0);
  }

  init(menu) {
    this.setEventElement(this.#flipCard, 'click', e => {
      if (!this.#j) {
        this.addClass(this.#flipCardInner, 'flip-card__inner-back');
        this.#j++;
      } else {
        this.rmClass(this.#flipCardInner, 'flip-card__inner-back');
        this.#j--;
      }
    });

    this.setEventElement(this.#btnPrev, 'click', e => {
      e.stopPropagation();

      this.#i--;

      if (this.#i < 0) {
        this.#i = menu.getLimit() - 1;
      }

      this.setWordToField(menu.getWords(), menu.getPartSpeech());
    });

    this.setEventElement(this.#btnKnow, 'click', e => {
      e.stopPropagation();
      console.log('push');
    });

    this.setEventElement(this.#btnNext, 'click', e => {
      e.stopPropagation();

      this.#i++;

      if (this.#i >= menu.getLimit() ) {
        this.#i = 0;
      }

     this.setWordToField(menu.getWords(), menu.getPartSpeech());
    });
  }
}