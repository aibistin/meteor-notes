import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const PrivateHeader = (props) => {
  const navImgSource = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg";
  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" src={ navImgSource } alt="Menu Image" onClick={ () => props.handleNavToggle() }/>
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={ () =>  props.handleLogout() }>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

/* For Passing in production props */
export default withTracker((props) => {
  return {
    handleLogout: () => {
      Accounts.logout();
    },
    handleNavToggle: () => { Session.set('isNavOpen', !Session.get('isNavOpen')) },
    isNavOpen: Session.get('isNavOpen'),
  };
})(PrivateHeader);
