class Pages {
  #totalPage;
  #currentPage;
  #amountWords;
  #p;

  constructor() {
    this.#totalPage = Helper.getSelector('#totalPage');
    this.#currentPage = Helper.getSelector('#currentPage');
    this.#p = 0;

    this.#amountWords = {};
  }

  calculateAmountPages(totalPages, amountWords) {
    this.#p = Math.round(totalPages / amountWords);
  }

  #setPagesField(pages) {
    Helper.addText(this.#totalPage, pages);
    Helper.setAttr(this.#totalPage, 'data-pages', pages);
  }

  #getCommonAmountWords(amountWords) {
    const formData = new FormData;
    const partSpeech = Helper.getAttr(Helper.getSelector('.activeTab'), 'data-partSpeech');
    formData.set('partSpeech', partSpeech);

    if (!this.#amountWords[partSpeech]) {
      Helper.sendFetch('/getAmount', { method: 'POST', body: formData })
      .then(data => {
        this.#amountWords[partSpeech] = data;
        this.calculateAmountPages(this.#amountWords[partSpeech], amountWords);
        this.#setPagesField(this.#p);
      })
      .catch(err => {
        this.#setPagesField(0);
        console.log(err);
        alert(err.message);
      })
    } else {
      this.calculateAmountPages(this.#amountWords[partSpeech], amountWords);
      this.#setPagesField(this.#p);
    }
  }

  #setCaretAtEnd(node) {
    const sel = document.getSelection();
    node = node.firstChild;
    sel.collapse(node, node.length);
  }

  init(amountWords, menu, card, topButtons) {
    this.#getCommonAmountWords(amountWords.getAmountWords());

    Helper.setEvent(this.#currentPage, 'input', e => {
      const target = e.target;
      const text = Helper.getText(target);
      const page = Helper.getInt(Helper.getText(target));

      if (isNaN(page) && text !== '') {
        Helper.addText(target, 1);
        Helper.setAttr(target, 'data-page' , 1);
        return;
      } else if (text === '') {
        return;
      }

      const total = Helper.getInt(Helper.getAttr(this.#totalPage, 'data-pages')); 

      if (page > total) {
        Helper.addText(target, total);
        Helper.setAttr(target, 'data-page' , total);
      } else if (page < 1) {
        Helper.addText(target, 1);
        Helper.setAttr(target, 'data-page' , 1);
      } else {
        Helper.addText(target, page);
        Helper.setAttr(target, 'data-page' , page);
      }

      this. #setCaretAtEnd(this.#currentPage);
    });

    Helper.setEvent(this.#currentPage, 'blur', e => {
      const page = Helper.getInt(Helper.getAttr(e.target, 'data-page')) - 1;
      const skip = Helper.getInt(amountWords.getAmountWords()) * page;

      menu.setSkip(skip);

      menu.requestWordsFromDB()
      .then(data => {
        menu.setWords(data);

        amountWords.isCard(card, menu, topButtons);
      })
      .catch(err => {
        console.log(err);
        alert(err.message);
      })
    });
  }
}