import React from 'react';
import { Meteor } from 'meteor/meteor';
/* Test Methods */
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Login } from './Login';

if (Meteor.isClient) {
  Enzyme.configure({ adapter: new Adapter() });

  describe("Login", function () {
    const errorMsg = "This is banjaxed!";

    it("this should show error messages", function () {
      const wrapper = mount(<Login loginWithPassword={ () => {}} />);

      wrapper.setState({
        error: errorMsg,
      });

      const text = wrapper.find("p").text();
      expect(text).toBe(errorMsg);

      wrapper.setState({
        error: '',
      });
      expect(wrapper.find("p").length).toBe(0);
    });

    it("should call loginWithPassword", function () {
      const email = "jake@flake.com";
      const password = "Password1";
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      
      //console.log("wrapper good email node,", wrapper.ref('email').value);

      wrapper.find("form").simulate("submit");

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);

    });


    it("should call the error handlers when given bad information", function () {
      const email = "Vlad";
      const password = "x";
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
     // console.log("wrapper email node,", wrapper.ref('email').value);

      wrapper.find("form").simulate("submit");

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
      spy.calls[0].arguments[2]({}); // Calling loginWithPassword with the err argument
     // const eText = wrapper.find("p").text();
      //console.log("Error Text: " + eText);
      
      expect(wrapper.state('error')).toNotBe('');
      spy.calls[0].arguments[2](); // No error argument
      expect(wrapper.state('error')).toBe('');
       
    });
  });
}
