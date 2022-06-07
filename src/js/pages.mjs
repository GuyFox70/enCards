class Pages {
  #totalPage;
  #currentPage;
  #amountWords;

  constructor() {
    this.#totalPage = Helper.getSelector('#totalPage');
    this.#currentPage = Helper.getSelector('#currentPage');

    this.#amountWords = {};
  }

  getAmountWords() {
    return this.#amountWords;
  }

  calculateAmountPages(totalPages, portionWords) {
    this.#setPagesField(Math.round(totalPages / portionWords));
  }

  #getCurrentPage() {
    return Helper.getInt(Helper.getAttr(this.#currentPage, 'data-page'));
  }

  #getTotalPage() {
    return Helper.getInt(Helper.getAttr(this.#totalPage, 'data-pages'));
  }

  #setPagesField(pages) {
    Helper.addText(this.#totalPage, pages);
    Helper.setAttr(this.#totalPage, 'data-pages', pages);
  }

  queryAmountWords(portionWords) {
    const formData = new FormData;
    const partSpeech = Helper.getAttr(Helper.getSelector('.activeTab'), 'data-partSpeech');
    formData.set('partSpeech', partSpeech);

    if (!this.#amountWords[partSpeech]) {
      Helper.sendFetch('/getAmount', { method: 'POST', body: formData })
      .then(data => {
        this.#amountWords[partSpeech] = data;
        this.calculateAmountPages(this.#amountWords[partSpeech], portionWords);
      })
      .catch(err => {
        this.#setPagesField(0);
        console.log(err);
        alert(err.message);
      })
    } else {
      this.calculateAmountPages(this.#amountWords[partSpeech], portionWords);
    }
  }

  #setCaretAtEnd(node) {
    const sel = document.getSelection();
    node = node.firstChild;
    sel.collapse(node, node.length);
  }

  checkPage(page) {
    const total = this.#getTotalPage();
    const num = page || this.#getCurrentPage();

    if (num > total) {
      Helper.addText(this.#currentPage, total);
      Helper.setAttr(this.#currentPage, 'data-page' , total);
    } else if (num < 1) {
      Helper.addText(this.#currentPage, 1);
      Helper.setAttr(this.#currentPage, 'data-page' , 1);
    } else {
      Helper.addText(this.#currentPage, num);
      Helper.setAttr(this.#currentPage, 'data-page', num);
    }
  }

  init(portionWords, menu, card, topButtons) {
    this.queryAmountWords(portionWords.getCurrentPortion());

    Helper.setEvent(this.#currentPage, 'click', e => { Helper.setAttr(e.target, 'contenteditable', true), e.target.focus(); });

    Helper.setEvent(this.#currentPage, 'input', e => {
      const target = e.target;
      const text = Helper.getText(target);
      const page = Helper.getInt(Helper.getText(this.#currentPage));

      if (isNaN(page) && text !== '') {
        Helper.addText(target, 1);
        Helper.setAttr(target, 'data-page' , 1);
        return;
      } else if (text === '') {
        return;
      }

      this.checkPage(page);

      this.#setCaretAtEnd(this.#currentPage);
    });

    Helper.setEvent(this.#currentPage, 'blur', e => {
      const page = this.#getCurrentPage() - 1;
      const skip = Helper.getInt(portionWords.getCurrentPortion()) * page;

      Helper.setAttr(e.target, 'contenteditable', false);

      menu.setSkip(skip);

      getWords.call(null, menu, card, topButtons);
    });

    Helper.setEvent(this.#currentPage, 'keydown', e => {
      const code = e.keyCode;

      if (code === 13) {
        const page = this.#getCurrentPage() - 1;
        const skip = Helper.getInt(portionWords.getCurrentPortion()) * page;

        Helper.setAttr(e.target, 'contenteditable', false);

        menu.setSkip(skip);

        getWords.call(null, menu, card, topButtons);
      }
    });
  }
}

function getWords(menu, card, topButtons) {
  menu.requestWordsFromDB()
  .then(data => {
    menu.setWords(data);

    card.resetCounter();
    card.isCard(menu, topButtons);
  })
  .catch(err => {
    console.log(err);
    alert(err.message);
  });
}