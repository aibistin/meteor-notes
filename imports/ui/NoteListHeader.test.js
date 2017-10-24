/* Test NoteListHeader */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import enzyme from 'enzyme';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
/* Local Imports */
import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
    describe('NoteListHeader', function () {
        let meteorCall;
        let Session;
        beforeEach(function () {
            meteorCall = expect.createSpy();
            Session = {
                set: expect.createSpy(),
            };
        });

        it('should perform Meteor.call notes.insert text and set session', function () {
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find("button").simulate("click");
            /* Simulate calling 'notes.insert' with function 'error' = undefined and 'resp' = note._id */
            meteorCall.calls[0].arguments[1](undefined, notes[0]._id);
            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId',notes[0]._id);
        });
        
        it('should not set session with failed insert', function (){
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find("button").simulate("click");
            meteorCall.calls[0].arguments[1]('Some annoying error', undefined);
            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toNotHaveBeenCalled();
        });

    });
}
