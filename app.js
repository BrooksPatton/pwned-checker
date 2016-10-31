/* eslint no-console: "off" */

const HAVE_I_BEEN_PWNED_API_URL = 'https://haveibeenpwned.com/api/v2/breachedaccount';

const meow = require('meow');
const axios = require('axios');

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


function generateReport() {
  const report = `
  Pwned report for ${cli.flags.e}
  -------------------------------
  `;

  return report;
}

function print(str) {
  console.info(str);
}

axios.get(`${HAVE_I_BEEN_PWNED_API_URL}/${cli.flags.e}`)
  .then((res) => {
    const report = generateReport(res.data);
    print(report);
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
report: http://www.troyhunt.com/2015/10/breaches-traders-plain-text-passwords.html

Host: 000webhost.com
BreachDate: March 1, 2015
password compromised: true
report: http://www.troyhunt.com/2015/10/breaches-traders-plain-text-passwords.html
*/
