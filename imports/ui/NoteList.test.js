/* Test NoteList.js */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

/* Local */
import { NoteList } from './NoteList';
import { NoteListEmptyItem } from './NoteListEmptyItem';

const notes = [{
    _id: 'noteOne',
    title: 'TitleOne',
    body: 'Body One',
    userid: 'userOne',
    updatedAt: moment().valueOf(),
}, {
    _id: 'noteTwo',
    title: 'TitleTwo',
    body: 'Body Two',
    userid: 'userTwo',
    updatedAt: moment().valueOf(),
}];

if (Meteor.isClient) {
    describe("NoteList", function () {
        it('should render the correct number of notes', function () {
            const wrapper = mount(<NoteList notes={notes} />);
            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
        });
        it('should render the empty notes component when there are no notes', function () {
            const wrapper = mount(<NoteList notes={[]} />);
            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });


    });
};
