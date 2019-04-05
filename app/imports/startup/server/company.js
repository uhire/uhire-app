import { Meteor } from 'meteor/meteor';
import { Companies } from '../../api/company/company.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Companies', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Companies.find({ owner: username });
  }
  return this.ready();
});
