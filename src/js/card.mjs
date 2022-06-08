class Card {
  #flipCard;
  #flipCardInner;
  #mistakeReport;
  #btnsendReport;
  #btnCancelReport;
  #btnPrev;
  #btnStudied;
  #btnNext;
  #i;
  #j;
  #wordField;
  #translateField;

  constructor() {
    this.#flipCard = Helper.getSelector('#flipCard');
    this.#mistakeReport = Helper.getSelector('#mistakeReport');
    this.#btnsendReport = Helper.getSelector('#sendReport');
    this.#btnCancelReport = Helper.getSelector('#cancelReport');
    this.#btnPrev = Helper.getSelector('#prevWord');
    this.#btnStudied = Helper.getSelector('#studied');
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

  setWordToField(words, partSpeech, isEng) {
    setTimeout(() => {
      if (words === null || words.length === 0) {
        alert('Empty');
        Helper.addText(this.#wordField, '-------');
        Helper.addText(this.#translateField, '-------');
      } else {
        Helper.addText(this.#wordField, isEng ? words[this.#i].word : words[this.#i].translate[partSpeech].join(', '));
        Helper.addText(this.#translateField, isEng ? words[this.#i].translate[partSpeech].join(', ') : words[this.#i].word);
      }
    }, 0);
  }

  init(menu, topButtons, portionWords, pages, getWords) {
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

      this.setWordToField(menu.getArrWords(), menu.getPartSpeech(), topButtons.isEnglish());
    });

    Helper.setEvent(this.#btnStudied, 'click', e => {
      e.stopPropagation();

      menu.pushToStudied(this.#i);

      const words = menu.getArrWords().filter((elem, index) => { if (index !== this.#i) return elem; });
      const length = words.length;

      if (this.#i >= length) this.#i = length === 0 ? length : length - 1;

      if (length === 0) {
        const calculateSkip = () => Helper.getInt(portionWords.getCurrentPortion()) * (pages.getCurrentPage() - 1);
        const skip = calculateSkip();
        
        // menu.setSkip(skip);

        // getWords.call(null, menu, this, topButtons);
      } else {
        menu.overwriteWords(words);
        this.setWordToField(menu.getArrWords(), menu.getPartSpeech(), topButtons.isEnglish());
      }


    });

    Helper.setEvent(this.#btnNext, 'click', e => {
      e.stopPropagation();

      this.#i++;

      if (this.#i >= menu.getLimit() ) {
        this.#i = 0;
      }

     this.setWordToField(menu.getArrWords(), menu.getPartSpeech(), topButtons.isEnglish());
    });
  }
}