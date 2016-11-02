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
  })
})
