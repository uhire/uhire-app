import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/stuff/student.js';

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

Meteor.publish('SelfStudent', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Students.find({ owner: username });
  }
  return this.ready();
});