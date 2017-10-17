/* Test NoteListHeader */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import enzyme from 'enzyme';
import expect from 'expect';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { NoteListHeader } from './NoteListHeader';

if (Meteor.isClient) {
    describe('NoteListHeader', function () {

        it('should call Meteor.call with notes.insert text', function () {
            const spy = expect.createSpy();
            const wrapper = mount(<NoteListHeader meteorCall={spy} />);
            wrapper.find("button").simulate("click");
            expect(spy.calls[0].arguments[0]).toBe('notes.insert');
            /* This is the only 'expect' that is needed */
             expect(spy).toHaveBeenCalledWith('notes.insert');
        });

    });
}
