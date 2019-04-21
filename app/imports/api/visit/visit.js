import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Visits = new Mongo.Collection('Visits');

/** Create a schema to constrain the structure of documents associated with this collection. */
const VisitSchema = new SimpleSchema({
  pageUrl: String,
  pageName: String,
  visitCount: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Visits.attachSchema(VisitSchema);

/** Make the collection and schema available to other code. */
export { Visits, VisitSchema };
