class TopButtons extends Helper {
  #btnStudeid;
  #btnCard;
  #btnTable
  #activeItem;
  #table;
  #tbody;

  constructor() {
    super();
    this.#btnStudeid = super.getSelector('#btnStudeid');
    this.#btnCard = super.getSelector('#btnCard');
    this.#btnTable = super.getSelector('#btnTable');
    this.#activeItem =  this.#btnCard;
    this.#table = this.getSelector('#table');
    this.#tbody = super.getSelector('#table .table__tbody');
  }

  #rmActive() {
    this.rmClass(this.#activeItem, 'activeItem');
  }

  createTable(words, partSpeech) {
    this.addText(this.#tbody, '');
    if (words === null || words.length === 0) return;

      if (!this.hasClass(this.#table, 'hidden')) {
        this.#rmActive();
        this.addClass(this.#btnTable, 'activeItem');

        for (let i = 0; i < words.length; i++) {
          const item =words[i];

          const tr = this.createElement('div');
          this.addClass(tr, 'table__tr');

          const tdNum = this.createElement('td');
          this.addClass(tdNum, [ 'table__td', 'cell__number' ]);
          this.addText(tdNum, i + 1);
          tr.appendChild(tdNum);

          const tdWord = this.createElement('td');
          this.addClass(tdWord, [ 'table__td', 'cell__word' ]);
          this.addText(tdWord, item.word);
          tr.appendChild(tdWord);

          const tdTranscription = this.createElement('td');
          this.addClass(tdTranscription, [ 'table__td', 'cell__transcription' ]);
          this.addText(tdTranscription, item.transcription);
          tr.appendChild(tdTranscription);

          const tdTranslate = this.createElement('td');
          this.addClass(tdTranslate, [ 'table__td', 'cell__translate' ]);
          this.addText(tdTranslate, item.translate[ partSpeech ].join(', '));
          tr.appendChild(tdTranslate);

          this.#tbody.appendChild(tr);
        }

        this.#activeItem = this.#btnTable;
      }
  }

  init(menu, card) {
    this.setEventElement(this.#btnStudeid, 'click', e => {
      if (!this.hasClass(this.#btnStudeid, 'activeItem')) {
        this.#rmActive();
        this.addClass(this.#btnStudeid, 'activeItem');
        this.#activeItem = this.#btnStudeid;
      }
    });

    this.setEventElement(this.#btnCard, 'click', e => {
      if (!this.hasClass(this.#btnCard, 'activeItem')) {
        this.#rmActive();
        this.addClass(this.#btnCard, 'activeItem');

        card.resetCounter();
        card.setWordToField(menu.getWords(), menu.getPartSpeech());

        this.addClass(this.#table, 'hidden');
        this.rmClass(card.getFlipCard(), 'hidden');

        this.#activeItem = this.#btnCard;
      }
    });

    this.setEventElement(this.#btnTable, 'click', e => {
      if (!this.hasClass(this.#btnTable, 'activeItem')) {
        this.addClass(card.getFlipCard(), 'hidden');
        this.rmClass(this.#table, 'hidden');

        this.createTable(menu.getWords(), menu.getPartSpeech());
      }
    });
  }
}