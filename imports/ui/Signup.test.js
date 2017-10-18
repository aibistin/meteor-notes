import React from 'react';
import { Meteor } from 'meteor/meteor';
/* Test Methods */
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Signup } from './Signup';

if (Meteor.isClient) {
  Enzyme.configure({ adapter: new Adapter() });

  describe("Signup", function () {
    const errorMsg = "This is banjaxed!";

    it("this should show error messages", function () {
      const wrapper = mount(<Signup createAccount={ () => {}} />);

      wrapper.setState({
        error: errorMsg,
      });

      const text = wrapper.find("p").text();
      expect(text).toBe(errorMsg);

      /* Test that the error is cleared */
      wrapper.setState({
        error: '',
      });
      expect(wrapper.find("p").length).toBe(0);
    });

    it("should call createAccount", function () {
      const email = "jake@flake.com";
      const password = "Password1";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createAccount={spy} />);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;

      wrapper.find("form").simulate("submit");
      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it("should call the error handlers for a bad password", function () {
      const email = "Vlad@impailer.com";
      const password = "x";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createAccount={spy} />);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      // console.log("wrapper email node,", wrapper.ref('email').value);

      wrapper.find("form").simulate("submit");
      expect(wrapper.state('error')).toNotBe('');
    });

    it("should set create user callback errors", function () {
      const errorReason = "Your submisson was banjaxed!";
      const password = "someGreatPassword1";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createAccount={spy} />);

      wrapper.ref('password').value = password;
//      console.log("wrapper password node,", wrapper.ref('password').value);

      wrapper.find("form").simulate("submit");
      /* Pass the errorReason string to the 'error' callback */
      spy.calls[0].arguments[1]({ reason: errorReason })
      expect(wrapper.state('error')).toBe(errorReason);
    });
  });
}
