import { Meteor } from 'meteor/meteor';
import { Interests } from '/imports/api/stuff/interests.js';
import { Email } from "meteor/email";

Meteor.methods({
  getInterests () {
    return Interests.find().fetch()
  },

  isUser(name, owner) {
    if (name == owner) {
      return true
    }
    else return false;
  },

  sendEmail(options) {
     process.env.MAIL_URL ='smtps://uhirenoreply:1234h@1234@smtp.gmail.com:465';
      // Make sure that all arguments are strings.

      // Let other method calls from the same client start running, without
      // waiting for the email sending to complete.
      this.unblock();

    Email.send(options);
    }

})
