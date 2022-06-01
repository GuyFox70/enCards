class Helper {

  static createElement(elem) {
    return document.createElement(elem);
  }

  static addText(elem, text) {
    elem.innerHTML = text;
  }

  static getInt(num) {
    return parseInt(num);
  }

  static getFloat(num) {
    return parseFloat(num);
  }

  static toJson(elem) {
    return JSON.stringify(elem);
  }

  static fromJson(elem) {
    return JSON.parse(elem);
  }

  static getSelector(selector) {
    return document.querySelector(selector);
  }

  static getSelectorAll(selector) {
    return document.querySelectorAll(selector);
  }

  static getAttr(elem, attr) {
    return elem.getAttribute(attr);
  }

  static setAttr(elem, key, value) {
    elem.setAttribute(key, value);
  }

  static rmAttr(elem, key) {
    elem.removeAttribute(key);
  }

  static sendFetch(path, options) {
    return new Promise((resolve, reject) => {
      fetch(path, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        reject(new Error('Fetch is failed!'));
      })
      .then(response => {
        if (response.state) {
          resolve(response.data);
        } else {
          reject(new Error('Somethins wrong with response!'));
        }
      })
      .catch(reject);
    });
  }

  static setEvent(elem, event, fn) {
    elem.addEventListener(event, fn);
  }

  static rmEvent(elem, event, fn) {
    elem.removeEventListener(event, fn);
  }

  static addClass(elem, nameClass) {
    if (Array.isArray(nameClass)) {
      nameClass.forEach(str => elem.classList.add(str))
    } else {
      elem.classList.add(nameClass);
    }
  }

  static rmClass(elem, nameClass) {
    elem.classList.remove(nameClass);
  }

  static hasClass(elem, className) {
   return elem.classList.contains(className); 
  }
}

export default Helper;