import { Students } from '/imports/api/company/company';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha, chai */

if (Meteor.isServer) {
  describe('student', function testSuite() {
    const firstName = 'Peter';
    const lastName = 'Newton';
    const description = 'Hello';
    const city = 'Mililani';
    const locationZip = '96789';
    const profile = 'yuup';
    const picture = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
    const interests = 'JavaScript';
    const owner = 'Pete';
    const grade = 'Freshman';

    before(function setup() {
      removeAllEntities();
    });
    after(function teardown() {
      removeAllEntities();
    });

    it('should return a string', function() {
      expect(firstName).to.be.a('string');
    });
    it('should return a string', function() {
      expect(lastName).to.be.a('string');
    });
    it('should return a string', function() {
      expect(description).to.be.a('string');
    });
    it('should return a string', function() {
      expect(city).to.be.a('string');
    });
    it('should return a number', function() {
      expect(locationZip).to.be.a('number');
    });
    it('should return a string', function() {
      expect(profile).to.be.a('string');
    });
    it('should return a string', function() {
      expect(picture).to.be.a('string');
    });
    it('should return a string', function() {
      expect(interests).to.be.a('string');
    });
    it('should return a string', function() {
      expect(owner).to.be.a('string');
    });
    it('should return a string', function() {
      expect(grade).to.be.a('string');
    });
  });
}
