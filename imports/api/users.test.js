import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
/* Testing */
import { validateNewUser } from './users.js';
import expect from 'expect';


if (Meteor.isServer) {

  describe('users', function() {

    it('should allow a valid email address', function() {
      const testUser = {
        emails: [{
          address: "somevalidemail@email.com",
        }, ]
      };
      let res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('should not allow a bad email address', function() {
      const badUser = {
        emails: [{
          address: "whats an email address?",
        }, ]
      };
      
      expect(
        () => {
          validateNewUser(badUser)
        }
      ).toThrow();
    });


  });

}
