export default class helper {
  /**
   * 休眠
   * @param ms
   * @returns
   */
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * 字符串加密
   * @param str 字符串
   * @param pwd 加密串
   * @returns
   */
  encrypt(str, pwd) {
    if (str == "") {
      return "";
    }
    str = encodeURIComponent(str);
    if (!pwd || pwd == "") {
      pwd = "123456";
    }
    pwd = encodeURIComponent(pwd);
    if (pwd == "" || pwd.length <= 0) {
      return "";
    }
    let prand: any = "";
    for (let i = 0, len = pwd.length; i < len; i += 1) {
      prand += pwd.charCodeAt(i).toString();
    }
    let sPos = Math.floor(prand.length / 5);
    let mult = parseInt(
      prand.charAt(sPos) +
        prand.charAt(sPos * 2) +
        prand.charAt(sPos * 3) +
        prand.charAt(sPos * 4) +
        prand.charAt(sPos * 5)
    );
    let incr = Math.ceil(pwd.length / 2);
    let modu = Math.pow(2, 31) - 1;
    if (mult < 2) {
      return "";
    }
    let salt: any = Math.round(Math.random() * 1000000000) % 100000000;
    prand += salt;
    while (prand.length > 10) {
      prand = (
        parseInt(prand.substring(0, 10)) +
        parseInt(prand.substring(10, prand.length))
      ).toString();
    }
    prand = (mult * prand + incr) % modu;
    let encChr: any;
    let encStr: any = "";
    for (let i = 0, len = str.length; i < len; i += 1) {
      encChr = parseInt(
        (str.charCodeAt(i) ^ Math.floor((prand / modu) * 255)).toString()
      );
      if (encChr < 16) {
        encStr += "0" + encChr.toString(16);
      } else {
        encStr += encChr.toString(16);
      }
      prand = (mult * prand + incr) % modu;
    }
    salt = salt.toString(16);
    while (salt.length < 8) {
      salt = "0" + salt;
    }
    encStr += salt;
    return encStr;
  }

  /**
   * 字符串解密
   * @param str 字符串
   * @param pwd 加密串
   * @returns
   */
  decrypt(str, pwd) {
    if (str == "") {
      return "";
    }
    if (!pwd || pwd == "") {
      pwd = "123456";
    }
    pwd = encodeURIComponent(pwd);
    if (str == undefined || str.length < 8) {
      return "";
    }
    if (pwd == undefined || pwd.length <= 0) {
      return "";
    }
    let prand: any = "";
    for (let i = 0, len = pwd.length; i < len; i += 1) {
      prand += pwd.charCodeAt(i).toString();
    }
    let sPos = Math.floor(prand.length / 5);
    let mult = parseInt(
      prand.charAt(sPos) +
        prand.charAt(sPos * 2) +
        prand.charAt(sPos * 3) +
        prand.charAt(sPos * 4) +
        prand.charAt(sPos * 5)
    );
    let incr = Math.round(pwd.length / 2);
    let modu = Math.pow(2, 31) - 1;
    let salt = parseInt(str.substring(str.length - 8, str.length), 16);
    str = str.substring(0, str.length - 8);
    prand += salt;
    while (prand.length > 10) {
      prand = (
        parseInt(prand.substring(0, 10)) +
        parseInt(prand.substring(10, prand.length))
      ).toString();
    }
    prand = (mult * prand + incr) % modu;
    let encChr: any;
    let encStr = "";
    for (let i = 0, len = str.length; i < len; i += 2) {
      encChr = parseInt(
        (
          parseInt(str.substring(i, i + 2), 16) ^
          Math.floor((prand / modu) * 255)
        ).toString()
      );
      encStr += String.fromCharCode(encChr);
      prand = (mult * prand + incr) % modu;
    }
    return decodeURIComponent(encStr);
  }

  /**
   * 生成验证码
   * @param params 参数
   * @returns
   */
  captcha(params) {
    const { width = 120, height = 40, noise = 0 } = params;
    const captcha = require("svg-captcha");
    const res = captcha.create({
      width,
      height,
      noise,
      charPreset: "0123456789",
    });
    return res;
  }
}
