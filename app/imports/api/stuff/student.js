import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import {Interests, InterestSchema} from './interests';

/** Create a Meteor collection. */
const Students = new Mongo.Collection('Students');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StudentSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  description: String,
  city: String,
  locationZip: Number,
  profile: String,
  picture: {
    type: String,
    defaultValue: 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
  },
  interests: {
    type: Array,
  },
  'interests.$': {
    type: String,
    allowedValues: [ 'JavaScript', 'AI', 'Web Development', 'Project Management']
  },
  owner: String,
  grade: {
    type: String,
    allowedValues: ['Freshman', 'Sophmore', 'Junior', 'Senior', 'Graduate'],
    defaultValue: 'Junior',
  },
}, { tracker: Tracker });




/** Attach this schema to the collection. */
Students.attachSchema(StudentSchema);

/** Make the collection and schema available to other code. */
export { Students, StudentSchema };
