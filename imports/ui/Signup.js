import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
/* 
    Testing using: 
    meteor add practicalmeteor:mocha
    meteor npm install --save-dev expect@1
    
    # Some enzyme stuff
    meteor npm i --save-dev react-test-renderer@15
    meteor npm i --save-dev enzyme enzyme-adapter-react-15
  
    meteor add react-meteor-data
    
*/

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 characters long' });
    }

    this.props.createAccount({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      }
      else {
        this.setState({ error: '' });
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Have an account?</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createAccount: PropTypes.func.isRequired,
};


export default withTracker((props) => {
  return {
    createAccount: Accounts.createUser,
  };
})(Signup);
