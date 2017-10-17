/* Test NoteListItem */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import enzyme from 'enzyme';
import expect from 'expect';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
    describe('NoteListItem', function () {

        it('should display proper title, body and update date', function () {
            const title = "Some Title";
            const body = "Some body";
            const updatedAt = 1508192171892;
            const wrapper = mount(<NoteListItem note={{title, body, updatedAt}} />);
            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe(body);
            expect(wrapper.find('span').text()).toBe('16/10/2017');
        });
        
        it('should display default title if no title given', function () {
            const title = "";
            const expectTitle =  "Untitled Note";
            const body = "Some body";
            const updatedAt = 1508192171892;
            const wrapper = mount(<NoteListItem note={{title, body, updatedAt}} />);
            expect(wrapper.find('h5').text()).toBe(expectTitle);
        });
        
    });
}
