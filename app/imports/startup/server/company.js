import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Companies } from '../../api/company/company.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.companyName} (${data.owner})`);
  Companies.insert(data);
}

/** Initialize the collection if empty. */
if (Companies.find().count() === 0) {
  if (Meteor.settings.defaultCompany) {
    console.log('Creating default company.');
    Meteor.settings.defaultCompany.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Companies', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Companies.find({ owner: username }, { sort: { $natural: -1 }, limit: 1 });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('CompanyAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Companies.find();
  }
  return this.ready();
});
