/* eslint no-param-reassign: */

const moment = require('moment');

function clean(str) {
  str = str.replace(/<a href="/g, '(');
  str = str.replace(/" target="_blank" rel="noopener">/g, ') ');
  str = str.replace(/<\/a>/g, ' ');
  str = str.replace(/<em>/g, '');
  str = str.replace(/<\/em>/g, '');
  str = str.replace(/&quot;/g, '"');

  return str;
}

module.exports = class Pwned {
  constructor(pwn) {
    this.host = pwn.Domain;
    this.breachDate = moment(pwn.BreachDate).fromNow();
    this.isPasswordCompromised = JSON.parse(pwn.DataClasses.includes('Passwords'));
    this.isPasswordHintsCompromised = JSON.parse(pwn.DataClasses.includes('Password hints'));
    this.description = clean(pwn.Description);
  }

};
