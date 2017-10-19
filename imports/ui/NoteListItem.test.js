/* Test NoteListItem */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import enzyme from 'enzyme';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
/* Local Imports */
import { notes } from '../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient) {

    let Session;

    beforeEach(() => {
        Session = {
            set: expect.createSpy(),
        };
    });

    describe('NoteListItem', function () {

        it('should display proper title, body and update date', function () {
            //            const updatedAt = notes[0].updatedAt;
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);
            expect(wrapper.find('h5').text()).toBe(notes[0].title);
            //            expect(wrapper.find('p').text()).toBe(body);
            expect(wrapper.find('p').text()).toBe('16/10/2017');
        });

        it('should display default title if no title given', function () {
            const expectTitle = "Untitled Note";
            const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />);
            expect(wrapper.find('h5').text()).toBe(expectTitle);
        });
        
        it('should call set on click', function (){
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);
            wrapper.find('div').simulate('click');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
            expect(notes[0].selected).toBe(true);
        });

    });
}
