/**
 * @module crypto
 */
const cryptoJs = require("crypto-js");

module.exports = {
  /**
   * md5
   * @param str {string} 明文
   */
  md5: function (str) {
    return cryptoJs.MD5(str).toString();
  },
  /**
   * AES
   * @param strBuf {string|buff} 明文
   * @param encrypted {string} 密文
   * @param key {string} 秘钥
   */
  encrypt: function (strBuf, key) {
    let innerKey = cryptoJs.enc.Hex.parse(cryptoJs.MD5(key));
    let option = {
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7,
    };
    let res = cryptoJs.AES.encrypt(strBuf, innerKey, option);
    return res.ciphertext.toString();
  },
  decrypt: function (encrypted, key) {
    let encryptedHexStr = cryptoJs.enc.Hex.parse(encrypted);
    let srcs = cryptoJs.enc.Base64.stringify(encryptedHexStr);
    let innerKey = cryptoJs.enc.Hex.parse(cryptoJs.MD5(key));
    let option = {
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7,
    };
    let decrypt = cryptoJs.AES.decrypt(srcs, innerKey, option);
    let res = decrypt.toString(cryptoJs.enc.Utf8);
    return res;
  },
};
