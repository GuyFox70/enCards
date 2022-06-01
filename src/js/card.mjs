class Card {
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
    this.#flipCard = Helper.getSelector('#flipCard');
    this.#eng = Helper.getSelector('#eng');
    this.#mistakeReport = Helper.getSelector('#mistakeReport');
    this.#btnsendReport = Helper.getSelector('#sendReport');
    this.#btnCancelReport = Helper.getSelector('#cancelReport');
    this.#btnPrev = Helper.getSelector('#prevWord');
    this.#btnKnow = Helper.getSelector('#knowWord');
    this.#btnNext = Helper.getSelector('#nextWord');
    this.#wordField = Helper.getSelector('#wordField');
    this.#translateField = Helper.getSelector('#translateField');
    this.#flipCardInner = Helper.getSelector('#flipCardInner');

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
        Helper.addText(this.#wordField, 'Example');
        Helper.addText(this.#translateField, 'Пример');
      } else {
        Helper.addText(this.#wordField, words[this.#i].word);
        Helper.addText(this.#translateField, words[this.#i].translate[partSpeech].join(', '));
      }
    }, 0);
  }

  init(menu) {
    Helper.setEvent(this.#flipCard, 'click', e => {
      if (!this.#j) {
        Helper.addClass(this.#flipCardInner, 'flip-card__inner-back');
        this.#j++;
      } else {
        Helper.rmClass(this.#flipCardInner, 'flip-card__inner-back');
        this.#j--;
      }
    });

    Helper.setEvent(this.#btnPrev, 'click', e => {
      e.stopPropagation();

      this.#i--;

      if (this.#i < 0) {
        this.#i = menu.getLimit() - 1;
      }

      this.setWordToField(menu.getWords(), menu.getPartSpeech());
    });

    Helper.setEvent(this.#btnKnow, 'click', e => {
      e.stopPropagation();
      console.log('push');
    });

    Helper.setEvent(this.#btnNext, 'click', e => {
      e.stopPropagation();

      this.#i++;

      if (this.#i >= menu.getLimit() ) {
        this.#i = 0;
      }

     this.setWordToField(menu.getWords(), menu.getPartSpeech());
    });
  }
}