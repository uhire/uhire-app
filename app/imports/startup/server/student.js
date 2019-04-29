import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/stuff/student.js';
import { Roles } from 'meteor/alanning:roles';


/** Initialize the database with a default data document. */
function addData(data, collection) {
  console.log(`  Adding: (${data.owner})`);
  collection.insert(data);
}

/** Initialize the collection if empty. */
if (Students.find().count() === 0) {
  if (Meteor.settings.defaultStudentData) {
    console.log('Creating default data.');
    Meteor.settings.defaultStudentData.map(data => addData(data, Students));
  }
}

Meteor.publish('Student', function publish() {
  if (this.userId) {
    return Students.find();
  }
  return this.ready();
});

Meteor.publish('StudentProfile', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Students.find({ owner: username }, { sort: { $natural: -1 }, limit: 1 });
  }
  return this.ready();
});


Meteor.publish('SelfStudent', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Students.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StudentAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Students.find({});
  }
  return this.ready();
});
