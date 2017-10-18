import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }


  render() {
    return (
      <div>
      Editor
      </div>
    );
  }
}


Editor.propTypes = {};

/* container for production rendering */
export default withTracker((props) => {
  return {};
})(Editor);
