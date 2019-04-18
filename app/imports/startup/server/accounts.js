import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';

/* eslint-disable no-console */

Meteor.methods({

  createNewUser(email, password, role) {
    check(email, String);
    check(password, String);
    check(role, String);
    console.log(`  Creating user ${email}.`);
    const userID = Accounts.createUser({
      username: email,
      email: email,
      password: password,
    });
    if (role === 'admin') {
      Roles.addUsersToRoles(userID, 'admin');
    } else if (role === 'company') {
        Roles.addUsersToRoles(userID, 'company');
      } else if (role === 'student') {
          Roles.addUsersToRoles(userID, 'student');
        }
  },
});

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
