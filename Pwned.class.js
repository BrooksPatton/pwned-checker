const moment = require('moment');

module.exports = class Pwned {
  constructor(pwn) {
    this.host = pwn.Domain;
    this.breachDate = moment(pwn.BreachDate).fromNow();
    this.isPasswordCompromised = JSON.parse(pwn.DataClasses.includes('Passwords'));
    this.isPasswordHintsCompromised = JSON.parse(pwn.DataClasses.includes('Password hints'));
    this.description = pwn.Description;
  }
};
