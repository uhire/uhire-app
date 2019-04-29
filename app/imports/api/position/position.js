import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Positions = new Mongo.Collection('Positions');

/** Create a schema to constrain the structure of documents associated with this collection */
const PositionSchema = new SimpleSchema({
  title: String,
  location: String,
  openings: Number,
  date: Date,
  description: String,
  contact: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  interests: {
    type: Array,
  },
  'interests.$': {
    type: String,
    allowedValues: [ 'JavaScript', 'AI', 'Web Development', 'Project Management', 'Data Processing', 'Systems Analysis', 'Conservation', 'Circuit Design', 'Game Development', 'Machine Learning', 'Internet of Things', 'Cyber Security', 'Data Visualization', 'Virtual Reality', '3D Modeling', 'Information Technlogy', 'Systems Management', 'Augmented Reality', 'Algorithms' ],
  },
  owner: String,
  companyName: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Positions.attachSchema(PositionSchema);

/** Make the collection and schema available to other code. */
export { Positions, PositionSchema };
