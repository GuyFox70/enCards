document.addEventListener("DOMContentLoaded", () => {
  class Main extends Helper {
    constructor() {
      super();
    }

    init() {
      try {
        const card = new Card;
        const menu = new Menu(card);
        const pages = new Pages;
        const amountWords = new AmountWords;
        const topButtons = new TopButtons;
      
        menu.init();
        pages.init();
        amountWords.init(card, menu, topButtons);
        card.init(menu);
        topButtons.init(menu, card);
      
        window.addEventListener('beforeunload', () => {
          if (menu.getWords() !== null) localStorage.setItem('words', this.toJson(menu.getWords()));
          localStorage.setItem('skip', menu.getSkip());
          localStorage.setItem('limit', menu.getLimit());
        }); 
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
  }

  const main = new Main;
  main.init();
});