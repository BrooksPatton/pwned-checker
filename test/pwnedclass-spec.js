/* eslint no-undef: "off" */

const chai = require('chai')
const Pwned = require('../Pwned.class')
const moment = require('moment')

chai.should()

describe('Pwned class', () => {
  it('The pwned object should have a host', () => {
    const now = new Date()

    const pwnedStuff = {
      Domain: 'https://www.google.com',
      BreachDate: now,
      DataClasses: 'Passwords, Password hints',
      Description: 'In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, <em>encrypted</em> password and a password hint in plain text. The password cryptography was poorly done and <a href="http://stricture-group.com/files/adobe-top100.txt" target="_blank" rel="noopener">many were quickly resolved back to plain text</a>. The unencrypted hints also <a href="http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html" target="_blank" rel="noopener">disclosed much about the passwords</a> adding further to the risk that hundreds of millions of Adobe customers already faced.'
    }

    const pwned = new Pwned(pwnedStuff)

    pwned.host.should.be.equal('https://www.google.com')
    pwned.breachDate.should.be.equal(moment(now).fromNow())
    pwned.isPasswordCompromised.should.be.true
    pwned.isPasswordHintsCompromised.should.be.true
    pwned.description.should.be.equal('In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and (http://stricture-group.com/files/adobe-top100.txt) many were quickly resolved back to plain text. The unencrypted hints also (http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html) disclosed much about the passwords adding further to the risk that hundreds of millions of Adobe customers already faced.')
    pwned.addedDateRaw.valueOf().should.be.a('number')
  })

  it('The clean method should strip html including quotes', () => {
    const pwnedStuff = {
      Title: 'Yahoo',
      Name: 'Yahoo',
      Domain: 'yahoo.com',
      BreachDate: '2012-07-11',
      AddedDate: '2013-12-04T00:00:00Z',
      PwnCount: 453427,
      Description: 'In July 2012, Yahoo! had their online publishing service &quot;Voices&quot; compromised via a SQL injection attack. The breach resulted in the disclosure of nearly half a million usernames and passwords stored in plain text. The breach showed that of the compromised accounts, a staggering <a href="http://www.troyhunt.com/2012/07/what-do-sony-and-yahoo-have-in-common.html" target="_blank" rel="noopener">59% of people who also had accounts in the Sony breached reused their passwords across both services</a>.',
      DataClasses: [
        'Email addresses',
        'Passwords'
      ],
      IsVerified: true,
      IsSensitive: false,
      IsActive: true,
      IsRetired: false,
      LogoType: 'svg'
    }

    const pwned = new Pwned(pwnedStuff)

    pwned.description.should.be.equal('In July 2012, Yahoo! had their online publishing service "Voices" compromised via a SQL injection attack. The breach resulted in the disclosure of nearly half a million usernames and passwords stored in plain text. The breach showed that of the compromised accounts, a staggering (http://www.troyhunt.com/2012/07/what-do-sony-and-yahoo-have-in-common.html) 59% of people who also had accounts in the Sony breached reused their passwords across both services.')
  })
})
