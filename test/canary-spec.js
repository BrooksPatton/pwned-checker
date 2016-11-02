const chai = require('chai');

const should = chai.should();

describe('Canary test', () => {
  it('5 should be 5', () => {
    const five = 5;
    five.should.be.equal(5);
  });
});
