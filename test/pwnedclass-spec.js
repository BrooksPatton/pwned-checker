const chai = require('chai');
const Pwned = require('../Pwned.class');

const should = chai.should();

describe('Pwned class', () => {
  it('The pwned object should have a host', () => {
    const pwned = new Pwned({Domain: 'https://www.google.com'});

    pwned.host.should.be.equal('https://www.google.com');
  });
});
