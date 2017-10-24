import React from 'react';
import { Meteor } from 'meteor/meteor';
/* Test Packages */
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
/* To Test */
import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
    let meteorCall;
    let browserHistory;


    describe('Editor', function () {

        beforeEach(function () {
            meteorCall = expect.createSpy();
            browserHistory = {
                push: expect.createSpy(),
            };
        });

        it('should tell user to pick or create a note when none picked', function () {
            const wrapper = mount(<Editor browserHistory={browserHistory} meteorCall={meteorCall} />);
            expect(wrapper.find('p').text()).toBe('Please create or select a note');
        });

        it('should tell user that the note was not found for incorrect id', function () {
            const badId = 'someBadId';
            const wrapper = mount(<Editor browserHistory={browserHistory} meteorCall={meteorCall} selectedNoteId={badId}/>);
            expect(wrapper.find('p').text()).toBe('No note found with id ' + badId);
        });

        it('should remove a note', function () {
            const wrapper = mount(<Editor 
            browserHistory={browserHistory} meteorCall={meteorCall}
            selectedNoteId={notes[0]._id} note={ notes[0] }/>);
            wrapper.find('button').simulate('click');
            expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
            expect(meteorCall).toHaveBeenCalledWith('notes.remove', notes[0]._id, Meteor.userId());
        });

        it('should update the note body on textarea change', function () {
            const firstNote = notes[0];
            const originalBody = firstNote.body;
            const newBody = "This is the new body text";
            const wrapper = mount(<Editor 
            browserHistory={browserHistory} meteorCall={meteorCall}
            selectedNoteId={notes[0]._id} note={ notes[0] }/>);
            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody,
                }
            });
            expect(wrapper.state('body')).toBe(newBody);
            expect(meteorCall).toHaveBeenCalledWith('notes.update', { userId: Meteor.userId(), _id: firstNote._id }, { body: newBody });
        });

        it('should update the note title on input change', function () {
            const firstNote = notes[0];
            const originalTitle = firstNote.title;
            const newTitle = "This is the new title text";
            const wrapper = mount(<Editor 
            browserHistory={browserHistory} meteorCall={meteorCall}
            selectedNoteId={notes[0]._id} note={ notes[0] }/>);
            wrapper.find('input').simulate('change', {
                target: {
                    value: newTitle,
                }
            });
            expect(wrapper.state('title')).toBe(newTitle);
            expect(meteorCall).toHaveBeenCalledWith('notes.update', { userId: Meteor.userId(), _id: firstNote._id }, { title: newTitle });
        });


        it('should set the correct state for a new note', function () {
            const wrapper = mount(<Editor 
            browserHistory={browserHistory} meteorCall={meteorCall}/>);
            /* Note: 'setProps' is an enzyme function. */
            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0],
            });

            expect(wrapper.state('title')).toBe(notes[0].title);
            expect(wrapper.state('body')).toBe(notes[0].body);
        });

        it('should not set the state for no note', function () {
            const wrapper = mount(<Editor 
            browserHistory={browserHistory} meteorCall={meteorCall}/>);
            /* Note: 'setProps' is an enzyme function. */
            wrapper.setProps({
                selectedNoteId: notes[0]._id,
            });

            expect(wrapper.state('title')).toBe('');
            expect(wrapper.state('body')).toBe('');
        });

    });
};
