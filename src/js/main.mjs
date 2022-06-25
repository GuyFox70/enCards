document.addEventListener("DOMContentLoaded", () => {
  try {
    const getWords = (menu, card, topButtons) => {
      menu.requestWordsFromDB()
      .then(data => {
        menu.setWords(data);
    
        card.resetCounter();
        topButtons.isCard(menu, card);
      })
      .catch(err => { console.log(err); alert(err.message); });
    }

    const card = new Card;
    const menu = new Menu;
    const pages = new Pages;
    const portionWords = new PortionWords;
    const topButtons = new TopButtons;
    const tableSettings = new TableSettings;
  
    menu.init(topButtons, card);
    pages.init(portionWords, menu, card, topButtons, getWords);
    portionWords.init(card, menu, topButtons, pages, getWords);
    card.init(menu, topButtons, portionWords, pages, getWords);
    topButtons.init(menu, card, tableSettings);
    tableSettings.init();
  
    // window.addEventListener('beforeunload', () => {
    //   if (menu.getWords() !== null) localStorage.setItem('words', Helper.toJson(menu.getArrWords()));
    //   localStorage.setItem('skip', menu.getSkip());
    //   localStorage.setItem('limit', menu.getLimit());
    // });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
});