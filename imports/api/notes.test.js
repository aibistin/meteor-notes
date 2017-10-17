import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import { Notes } from './notes';
/* Testers */
import expect from 'expect';

if (Meteor.isServer) {
   
   Meteor.publish('notes', function() {
      return Notes.find({ userId: this.userId });
   });

   describe("notes", function() {

      const userId1 = 'goodUser1';
      const userId2 = 'goodUser2';
      const userId3 = 'goodUser3';

      const noteOne = {
         title: "noteOne",
         body: "noteOne note",
      };

      const noteTwo = {
         _id: 'noteTwoId',
         title: "noteTwo",
         body: "noteTwo note",
         userId: userId2,
      };

      const noteThree = {
         _id: 'noteThreeId',
         title: "noteThree",
         body: "noteThree note",
         userId: userId3,
      };


      /* 
       *  Adding Notes
       */
      it('should allow a user to add notes', function() {
         const userId = userId1;

         Meteor.server.method_handlers['notes.insert'].apply({ userId }, [noteOne]);
          let res = Notes.findOne({ userId, title: noteOne.title });
         expect(res).toExist();
         expect(res).toInclude(noteOne);
         expect(res.updatedAt).toExist();
         expect(res.updatedAt).toBeGreaterThan(0);

      });

      it('should not allow a user to add notes with extra attributes', function() {
         const userId = userId1;
         noteOne.extraAttr = "Someting unwanted";
         expect(() => {
            Meteor.server.method_handlers['notes.insert'].apply({ userId }, [noteOne]);
         });
         delete noteOne.extraAttr;
      });


      it('should not allow no user to add a note', function() {
         expect(() => {
            Meteor.server.method_handlers['notes.insert'].apply({}, [noteOne]);
         }).toThrow();
      });

      /* 
       * Test  Remove Notes
       */
      beforeEach(function() { // Seed data for Notes remove
         Notes.remove({});
         //noteTwo.userId = userId2;
         Notes.insert({
            ...noteTwo,
            updatedAt: moment().valueOf(),
         });
         Notes.insert({
            ...noteThree,
            updatedAt: moment().valueOf(),
         });
      });

      it('should allow user to remove a note', function() {
         const userId = noteTwo.userId;

         let res = Notes.findOne({ userId, _id: noteTwo._id });
         expect(res).toExist(); // Just check that we have a note.
         Meteor.server.method_handlers['notes.remove'].apply({ userId }, [noteTwo._id, userId]);
         res = Notes.findOne({ userId, _id: noteTwo._id });
         expect(res).toNotExist(); // Now it's gone
      });

      it('should not allow an remove without an user', function() {
         let res = Notes.findOne({ _id: noteTwo._id });
         expect(res).toExist(); // Just check that we have a note
         expect(() => {
            Meteor.server.method_handlers['notes.remove'].apply({}, [noteTwo._id]);
         }).toThrow();
      });

      it('should not allow a remove without a note id', function() {
         const userId = noteTwo.userId;
         let res = Notes.findOne({ _id: noteTwo._id });
         expect(res).toExist(); // Just check that we have a note
         expect(() => {
            Meteor.server.method_handlers['notes.remove'].apply({ userId }, []);
         }).toThrow();
      });

      /* 
       *  Test Update Notes
       */
      it('should allow user to update a note', function() {
         const userId = noteTwo.userId;

         let res = Notes.findOne({ userId, _id: noteTwo._id });
         expect(res).toExist(); // Just check that we have a note

         expect(res).toInclude({
            title: noteTwo.title,
            userId: noteTwo.userId,
            body: noteTwo.body,
         }); // Make sure we are testing the correct note
         let origDateUpdated = res.updatedAt;

         let title = "Updated note 2 title";
         let body = "Updated note 2 body";
         Meteor.server.method_handlers['notes.update'].apply({ userId }, [{ _id: noteTwo._id, userId }, { title, body }]);
         res = Notes.findOne({ userId, _id: noteTwo._id });

         expect(res).toExist(); // Got new version of note
         expect(res).toInclude({ userId, title, body, });
         expect(res.updatedAt).toBeGreaterThan(origDateUpdated);
      });

      it('should not allow update without a user', function() {
         const userId = noteTwo.userId;

         let res = Notes.findOne({ userId, _id: noteTwo._id });
         expect(res).toExist(); // Just check that we have a note
         let title = "Updated note 2 title";
         let body = "Updated note 2 body";
         expect(() => {
            Meteor.server.method_handlers['notes.update'].apply({}, [{ _id: noteTwo._id, userId }, { title, body }]);
         }).toThrow();

      });

      it('should not allow update without a note id', function() {
         const userId = noteTwo.userId;
         let res = Notes.findOne({ userId, _id: noteTwo._id });
         expect(res).toExist(); // Just check that we have a note
         let title = "Updated note 2 title";
         let body = "Updated note 2 body";
         expect(() => {
            Meteor.server.method_handlers['notes.update'].apply({ userId }, [{ userId }, { title, body }]);
         }).toThrow();

      });

      it('should not allow a user to update notes by ading extra attributes', function() {
         const userId = noteTwo.userId;
         let title = "Updated note 2 title";
         let body = "Updated note 2 body";

         expect(() => {
            Meteor.server.method_handlers['notes.update'].apply({ userId }, [{ _id: noteTwo._id, userId }, { title, body, extraAttr: "Some garbage" }]);
         });
      });

      /*
       *    Test publications
       */
      it('should return the correct # of notes for this user', function(){
         let res = Meteor.server.publish_handlers.notes.apply({userId: noteTwo.userId});
         let theNotes = res.fetch();
         expect(theNotes.length).toBe(1);
        expect(theNotes[0]).toInclude(noteTwo);
      });

      it('should return no notes user with no notes', function(){
         let res = Meteor.server.publish_handlers.notes.apply({userId: 'noteLessUser'});
         let theNotes = res.fetch();
         expect(theNotes.length).toBe(0);
      });




   });

}
