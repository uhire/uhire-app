import { Meteor } from 'meteor/meteor';
import { Interests } from '../../api/stuff/interests.js';

/** Initialize the database with a default data document. */
function addData(data, collection) {
  collection.insert(data);
}

/** Initialize the collection if empty. */
if (Interests.find().count() === 0) {
  if (Meteor.settings.defaultInterests) {
    Meteor.settings.defaultInterests.map(data => addData(data, Interests));
  }
}

Meteor.publish('Interests', function publish() {
  if (this.userId) {
    return Interests.find();
  }
  return this.ready();
});
