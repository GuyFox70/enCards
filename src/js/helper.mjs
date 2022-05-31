class Helper {
  constructor() {}

  createElement(elem) {
    return document.createElement(elem);
  }

  addText(elem, text) {
    elem.innerHTML = text;
  }

  getInt(num) {
    return parseInt(num);
  }

  getFloat(num) {
    return parseFloat(num);
  }

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
    return document.querySelectorAll(selector);
  }

  getAttr(elem, attr) {
    return elem.getAttribute(attr);
  }

  setAttr(elem, key, value) {
    elem.setAttribute(key, value);
  }

  rmAttr(elem, key) {
    elem.removeAttribute(key);
  }

  sendFetch(path, options, callback) {
    fetch(path, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      callback(new Error('Fetch is failed!'));
    })
    .then(response => {
      if (response.state) {
        callback(null, response.data);
      } else {
        callback(new Error('Somethins wrong with response!'));
      }

    })
    .catch(err => alert(err.message));
  }

  setEventElement(elem, event, fn) {
    elem.addEventListener(event, fn);
  }

  addClass(elem, nameClass) {
    if (Array.isArray(nameClass)) {
      nameClass.forEach(str => elem.classList.add(str))
    } else {
      elem.classList.add(nameClass);
    }
  }

  rmClass(elem, nameClass) {
    elem.classList.remove(nameClass);
  }

  hasClass(elem, className) {
   return elem.classList.contains(className); 
  }
}

export default Helper;