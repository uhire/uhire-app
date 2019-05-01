import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Visits } from '../../api/visit/visit.js';

if (Visits.find().count() === 0) {
  Visits.insert({ pageUrl: '/list', pageName: 'Company Profile Page', visitCount: 0 });
}

Meteor.methods({
  visitCounter(page) {
    check(page, String);
    if (page === Visits.find().fetch()[0].pageUrl) {
      Visits.update(Visits.find().fetch()[0]._id, { $inc: { visitCount: 1 } });
    }
  },
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Visits', function publish() {
  if (this.userId) {
    return Visits.find({}, { fields: { visitCount: 1 } });
  }
  return this.ready();
});
