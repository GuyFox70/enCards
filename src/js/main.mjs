document.addEventListener("DOMContentLoaded", () => {
  try {
    const card = new Card;
    const menu = new Menu(card);
    const pages = new Pages;
    const protionWords = new ProtionWords;
    const topButtons = new TopButtons;
  
    menu.init();
    pages.init(protionWords, menu, card, topButtons);
    protionWords.init(card, menu, topButtons, pages);
    card.init(menu);
    topButtons.init(menu, card);
  
    // window.addEventListener('beforeunload', () => {
    //   if (menu.getWords() !== null) localStorage.setItem('words', Helper.toJson(menu.getWords()));
    //   localStorage.setItem('skip', menu.getSkip());
    //   localStorage.setItem('limit', menu.getLimit());
    // }); 
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
});