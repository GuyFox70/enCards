class Helper {
  toJson(elem) {
    return JSON.stringify(elem);
  }

  fromJson(elem) {
    return JSON.parse(elem);
  }

  getSelector(selector) {
    return document.querySelector(selector);
  }

  getSelectorAll(selector) {
    return document.querySelectorALL(selector);
  }

  getAttribute(elem, attr) {
    return elem.getAttribute(attr);
  }

  addAttribute(elem, key, value) {
    return elem.setAttribute(key, value);
  }

  sendFetch(path, options, fn) {
    fetch(path, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Somethins wrong with response!')
    })
    .then(response => {
      fn.call(null, response);
    })
    .catch(err => console.log(`Fetch is failed ${ err.message }`));
  }

  addEvent(elem, event, fn) {
    elem.addEventListener(event, fn);
  }
}

export default Helper;