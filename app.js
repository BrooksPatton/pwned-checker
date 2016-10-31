/* eslint no-console: "off" */

const HAVE_I_BEEN_PWNED_API_URL = 'https://haveibeenpwned.com/api/v2/breachedaccount';

const meow = require('meow');
const axios = require('axios');
const chalk = require('chalk');

const Pwned = require('./Pwned.class');

const cli = meow(`
  Usage
    $ node app.js <input>

  Options
    -e, --email Email address

  Example
    $ node app.js -e test@example.com
`, {
  alias: {
    e: 'email',
  },
});


function print(str, color) {
  switch (color) {
    case 'red':
      console.info(chalk.red(str));
      break;
    case 'green':
      console.info(chalk.green(str));
      break;
    default:
      console.info(str);
  }
}

function printReport(data) {
  print(`
  Pwned report for ${cli.flags.e}
  -------------------------------
  `);

  const pwneds = data.map(item => new Pwned(item));

  pwneds.forEach((obj) => {
    print('');
    print(`Host: ${obj.host}`);
    print(`Breach Date: ${obj.breachDate}`);
    print(`Password compromised: ${obj.isPasswordCompromised}`, obj.isPasswordCompromised ? 'red' : 'green');
    print(`Password hints compromised: ${obj.isPasswordHintsCompromised}`, obj.isPasswordHintsCompromised ? 'red' : 'green');
    print(`Report: ${obj.description}`);
  });

  print('-------------------------------');
}

axios.get(`${HAVE_I_BEEN_PWNED_API_URL}/${cli.flags.e}`)
  .then((res) => {
    printReport(res.data);
  })
  .catch((err) => {
    console.error('There was an error with getting the pwned information', err);
  });


/*
Pwned report for test@example.com
---------------------------------
Host: otherhost.com
BreachDate: March 15, 2016
password compromised: false
report: In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and (http://stricture-group.com/files/adobe-top100.txt) many were quickly resolved back to plain text. The unencrypted hints also (http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html) disclosed much about the passwords adding further to the risk that hundreds of millions of Adobe customers already faced.

Host: 000webhost.com
BreachDate: March 1, 2015
password compromised: true
report: http://www.troyhunt.com/2015/10/breaches-traders-plain-text-passwords.html
*/
