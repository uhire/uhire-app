import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Positions } from '../../api/position/position.js';


/** Initialize the database with a default data document. */
function addData(data, collection) {
  console.log(`  Adding: (${data.owner})`);
  collection.insert(data);
}

if (Positions.find().count() === 0) {
  if (Meteor.settings.defaultPositions) {
    console.log('Creating default position.');
    Meteor.settings.defaultPositions.map(data => addData(data, Positions));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Position', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Positions.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */

Meteor.publish('PositionAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Positions.find();
  }
  return this.ready();
});


Meteor.publish('PositionStudent', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    return Positions.find();
  }
  return this.ready();
});
