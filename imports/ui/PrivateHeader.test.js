/* Testing PrivateHeader.js */
import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
/* Test Packages */
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { PrivateHeader } from './PrivateHeader';



if (Meteor.isClient) {

  Enzyme.configure({ adapter: new Adapter() });

  describe('PrivateHeader', function () {

    it("should have a logout button", function () {
      const wrapper = mount(<PrivateHeader title="Test Private Header" handleLogout={ () => {} }/>);
      const buttonText = wrapper.find("button").text();
      expect(buttonText).toBe("Logout");
    });

    it("should display correct text", function () {
      const expectTitleText = "Test Private Header";
      const wrapper = mount(<PrivateHeader title={expectTitleText} handleLogout={ () => {} } />);
      const gotText = wrapper.find("h1").text();
      expect(gotText).toBe(expectTitleText);
    });

    /* Spy's */
    it("should call handleLogout on click", function () {
      const expectTitleText = "Test Private Header Logout";
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title={expectTitleText} handleLogout={ spy } />);
      wrapper.find('button').simulate("click");
      expect(spy).toHaveBeenCalled();
    });



  });
}
