import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Meteor.Collection('notes');

/* 
 *      Publications
 */

if (Meteor.isServer) {
   Meteor.publish('notes', function() {
      return Notes.find({ userId: this.userId });
   });
}

/* 
 *      Methods
 */
 
Meteor.methods({
    'notes.insert' (note) {
        if (!this.userId) {
            throw new Meteor.Error("You must be logged in!");
        }

        if (!note) {
            note = {
                title: '',
                body: '',
            };
        }

        new SimpleSchema({
            _id: {
                type: String,
                optional: true,
                max: 200,
            },
            title: {
                type: String,
                optional: true,
                max: 200,
            },
            body: {
                type: String,
                optional: true,
                max: 1000,
            },
        }).validate(note);

        Notes.insert({
            userId: this.userId,
            updatedAt: moment().valueOf(),
            ...note,
        });


    },
    'notes.remove' (_id, userId) {
        if (!this.userId) {
            throw new Meteor.Error("You must be logged in!");
        }
        else if (this.userId !== userId) {
            throw new Meteor.Error("This is not your note!");
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            userId: {
                type: String,
                max: 1000,
            },
        }).validate({ _id, userId });

        Notes.remove({ _id, userId });
    },
    'notes.update' (noteSearch, noteUpdate) {
        if (!this.userId) {
            throw new Meteor.Error("You must be logged in!");
        }
        else if (this.userId !== noteSearch.userId) {
            throw new Meteor.Error("This is not your note!");
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            userId: {
                type: String,
                max: 1000,
            },
        }).validate(noteSearch);


        new SimpleSchema({
            title: {
                type: String,
                optional: true,
                max: 200,
            },
            body: {
                type: String,
                optional: true,
                max: 1000,
            },
        }).validate(noteUpdate);


        Notes.update(noteSearch, {
            $set: {
                updatedAt: moment().valueOf(),
                ...noteUpdate
            }
        });

    },
});
