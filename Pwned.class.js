module.exports = class Pwned {
  constructor(pwn) {
    this.host = pwn.Domain;
    this.breachDate = pwn.BreachDate;
    this.isPasswordCompromised = JSON.parse(pwn.DataClasses.includes('Passwords'));
    this.isPasswordHintsCompromised = JSON.parse(pwn.DataClasses.includes('Password hints'));
    this.description = pwn.Description;
  }
};
