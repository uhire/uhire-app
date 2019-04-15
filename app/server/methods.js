import { Meteor } from 'meteor/meteor';
import { Interests } from '/imports/api/stuff/interests.js';

Meteor.methods({
  getInterests () {
    return Interests.find().fetch()
  }
})