class Validator {
  isEmail(str) {
    return /^[a-zA-z0-9_\-\.]+@(yandex|narod|ya|mail|list|inbox|bk|gmail){1}.(ru|com|ua|kz|by){1}$/.test(str);
  }

  isDomain(str) {
    return /^www\.[a-z]+.[a-z]{2,10}$/.test(str);
  }

  isNumber(str) {
    return /^[0-9]+$/.test(str);
  }

  isHtml(str) {
   return /(<[a-z\s=""-_\/]+>)|(<\/[a-z]{1,5}>)/g.test(str);
  }
}

export default Validator;