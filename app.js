/* eslint no-console: "off" */

const HAVE_I_BEEN_PWNED_API_URL = 'https://haveibeenpwned.com/api/v2/breachedaccount'

const meow = require('meow')
const axios = require('axios')
const chalk = require('chalk')
const os = require('os')
const path = require('path')
const fs = require('fs')
const moment = require('moment')
const _ = require('lodash')

const Pwned = require('./Pwned.class')

const cli = meow(`
  Usage
    $ node app.js <input>

  Options
    -e, --email Email address

  Examples
    $ node app.js -e test@example.com
`, {
  alias: {
    e: 'email'
  }
})

function print (str, color) {
  switch (color) {
    case 'red':
      console.info(chalk.red(str))
      break
    case 'green':
      console.info(chalk.green(str))
      break
    default:
      console.info(str)
  }
}

function printReport (data, config) {
  const lastChecked = moment(config.lastChecked ? config.lastChecked : 0)

  print(`
  Pwned report for ${cli.flags.e}
  -------------------------------
  `)

  data.map(item => new Pwned(item))
    .filter(obj => lastChecked - obj.addedDateRaw <= 0)
    .forEach((obj) => {
      print('')
      print(`Host: ${obj.host}`)
      print(`Breach Date: ${obj.breachDate}`)
      print(`Password compromised: ${obj.isPasswordCompromised}`, obj.isPasswordCompromised ? 'red' : 'green')
      print(`Password hints compromised: ${obj.isPasswordHintsCompromised}`, obj.isPasswordHintsCompromised ? 'red' : 'green')
      print(`Report: ${obj.description}`)
    })

  print('-------------------------------')
}

function loadConfigFile (configDirPath, filename) {
  let config
  try {
    config = fs.readFileSync(path.join(configDirPath, filename), 'utf8')
  } catch (e) {
    if (e.errno === -2) {
      config = createConfigfile(configDirPath, filename)
    } else {
      console.error('There was an error reading the config file', e)
    }
  }

  return config
}

function createConfigfile (configDirPath, filename, config) {
  if (!config) {
    config = [
      {
        email: cli.flags.email,
        lastChecked: null
      }
    ]
  }

  try {
    fs.mkdirSync(configDirPath)
  } catch (e) {
    if (e.errno !== -17) {
      console.error('There was an error creating the config directory', e)

      process.exit(e.errno)
    }
  }

  try {
    fs.writeFileSync(path.join(configDirPath, filename), JSON.stringify(config))
  } catch (e) {
    console.error('There was an error creating the config file', e)

    process.exit(e.errno)
  }

  return config
}

function updateConfig (config, email) {
  return config.map((obj) => {
    if (obj.email === email) obj.lastChecked = moment().valueOf()

    return obj
  })
}

const homedir = os.homedir()
const config = JSON.parse(loadConfigFile(path.join(homedir, '/.pwned-checker'), 'config.json'))
const configForEmail = _.find(config, {email: cli.flags.email})

axios.get(`${HAVE_I_BEEN_PWNED_API_URL}/${cli.flags.e}`)
  .then((res) => {
    printReport(res.data, configForEmail)

    createConfigfile(path.join(homedir, '/.pwned-checker'), 'config.json', updateConfig(config, cli.flags.email))
  })
  .catch((err) => {
    console.error('There was an error with getting the pwned information', err)
  })

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
