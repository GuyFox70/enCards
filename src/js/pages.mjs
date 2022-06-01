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

  init(amountWords, menu, card) {
    this.#getCommonAmountWords(amountWords.getAmountWords());

    Helper.setEvent(this.#currentPage, 'blur', e => {
      console.log(Helper.getInt(Helper.getAttr(e.target, 'data-page')));
    });
  }
}