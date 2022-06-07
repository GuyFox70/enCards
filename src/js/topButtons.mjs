class TopButtons {
  #btnStudeid;TopButtons
  #btnCard;
  #btnTable
  #activeItem;
  #table;
  #tbody;
  #eng;
  #rus;
  #flagEng;
  #flagMode;

  constructor() {
    this.#eng = Helper.getSelector('#eng');
    this.#rus = Helper.getSelector('#rus');
    this.#btnStudeid = Helper.getSelector('#btnStudeid');
    this.#btnCard = Helper.getSelector('#btnCard');
    this.#btnTable = Helper.getSelector('#btnTable');
    this.#activeItem =  this.#btnCard;
    this.#table = Helper.getSelector('#table');
    this.#tbody = Helper.getSelector('#table .table__tbody');
    this.#flagEng = 1;
    this.#flagMode = 2;
  }

  isEnglish() {
    return this.#flagEng;
  }

  getMode() {
    return this.#flagMode;
  }

  #rmActive() {
    Helper.rmClass(this.#activeItem, 'activeItem');
  }

  createTable(words, partSpeech) {
    Helper.addText(this.#tbody, '');
    if (words === null || words.length === 0) return;

    this.#rmActive();
    Helper.addClass(this.#btnTable, 'activeItem');

    for (let i = 0; i < words.length; i++) {
      const item =words[i];

      const tr = Helper.createElement('div');
      Helper.addClass(tr, 'table__tr');

      const tdNum = Helper.createElement('td');
      Helper.addClass(tdNum, [ 'table__td', 'cell__number' ]);
      Helper.addText(tdNum, i + 1);
      tr.appendChild(tdNum);

      const tdWord = Helper.createElement('td');
      Helper.addClass(tdWord, [ 'table__td', 'cell__word' ]);
      Helper.addText(tdWord, item.word);
      tr.appendChild(tdWord);

      const tdTranscription = Helper.createElement('td');
      Helper.addClass(tdTranscription, [ 'table__td', 'cell__transcription' ]);
      Helper.addText(tdTranscription, item.transcription);
      tr.appendChild(tdTranscription);

      const tdTranslate = Helper.createElement('td');
      Helper.addClass(tdTranslate, [ 'table__td', 'cell__translate' ]);
      Helper.addText(tdTranslate, item.translate[ partSpeech ].join(', '));
      tr.appendChild(tdTranslate);

      this.#tbody.appendChild(tr);
    }

    this.#activeItem = this.#btnTable;
  }

  isCard(menu, card) {
    if (this.#flagMode === 2) {
      card.setWordToField(menu.getArrWords(), menu.getPartSpeech(), this.#flagEng);
    } else if (this.#flagMode === 3) {
      this.createTable(menu.getArrWords(), menu.getPartSpeech());
    } else {
      return;
    }
  }

  init(menu, card) {
    // Button English
    Helper.setEvent(this.#eng, 'click', e => {
      this.#flagEng = 1;
      this.isCard(menu, card);
    });
    // Button Russain
    Helper.setEvent(this.#rus, 'click', e => {
      this.#flagEng = 0;
      this.isCard(menu, card);
    });
    // Button Studied
    Helper.setEvent(this.#btnStudeid, 'click', e => {
      if (this.#flagMode !== 1) {
        this.#rmActive();
        Helper.addClass(this.#btnStudeid, 'activeItem');
        this.#activeItem = this.#btnStudeid;

        this.#flagMode = 1;
      }
    });
    // Button Card
    Helper.setEvent(this.#btnCard, 'click', e => {
      if (this.#flagMode !== 2) {
        this.#rmActive();
        Helper.addClass(this.#btnCard, 'activeItem');

        card.resetCounter();
        card.setWordToField(menu.getArrWords(), menu.getPartSpeech(), this.#flagEng);

        Helper.addClass(this.#table, 'hidden');
        Helper.rmClass(card.getFlipCard(), 'hidden');

        this.#activeItem = this.#btnCard;

        this.#flagMode = 2;
      }
    });
    // Button Table
    Helper.setEvent(this.#btnTable, 'click', e => {
      if (this.#flagMode !== 3) {
        Helper.addClass(card.getFlipCard(), 'hidden');
        Helper.rmClass(this.#table, 'hidden');

        this.createTable(menu.getArrWords(), menu.getPartSpeech());

        this.#flagMode = 3;
      }
    });
  }
}