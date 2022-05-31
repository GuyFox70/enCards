class Pages extends Helper {
  #totalPage;

  constructor() {
    super();
    this.#totalPage = super.getSelector('#totalPage');

    this.amountWords = {};
  }


  queryAmountWords() {
    const formData = new FormData;
    const partSpeech = this.getAttr(this.getSelector('.activeTab'), 'data-partSpeech');
    formData.set('partSpeech', partSpeech);

    if (!this.amountWords[partSpeech]) {
      this.sendFetch('/getAmount', { method: 'POST', body: formData }, (err, data) => {
        if (err) {
          alert(err.message);
          this.#totalPage.innerHTML = 0;
          this.setAttr(this.#totalPage, 'data-pages', 0);
        } else {
          this.amountWords[partSpeech] = data;
          this.#totalPage.innerHTML = this.amountWords[partSpeech];
          this.setAttr(this.#totalPage, 'data-pages', this.amountWords[partSpeech]);
        }          
      });
    } else {
      this.#totalPage.innerHTML = this.amountWords[partSpeech];
      this.setAttr(this.#totalPage, 'data-pages', this.amountWords[partSpeech]);
    }
  }

  init() {
    this.queryAmountWords();
  }
}