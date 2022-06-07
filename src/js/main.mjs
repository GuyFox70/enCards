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
    const menu = new Menu();
    const pages = new Pages;
    const protionWords = new ProtionWords;
    const topButtons = new TopButtons;
  
    menu.init(topButtons, card);
    pages.init(protionWords, menu, card, topButtons, getWords);
    protionWords.init(card, menu, topButtons, pages, getWords);
    card.init(menu, topButtons);
    topButtons.init(menu, card);
  
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