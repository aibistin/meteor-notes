import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
/* Local Imports */
import { Notes } from '../api/notes';
export class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  handleTitleChange(e) {
    console.log("Title Target, ", e.target);
    console.log("Title Target name, ", e.target.name);
    console.log("Title Target valya, ", e.target.value);
    this.props.meteorCall('notes.update', { userId: Meteor.userId(), _id: this.props.note._id }, { title: e.target.value });
  }

  handleBodyChange(e) {
    console.log("Body Target, ", e.target);
    console.log("Body Target name, ", e.target.name);
    console.log("Body Target valya, ", e.target.value);
    this.props.meteorCall('notes.update', { userId: Meteor.userId(), _id: this.props.note._id }, { body: e.target.value });
  }

  render() {
    if (this.props.note) {
      return (
        <div>
          <input name="title" 
              value={this.props.note.title} 
              placeholder="Untitled Note" 
              onChange={this.handleTitleChange.bind(this)}
              />
          <textarea name="body" placeholder="Your note here..." 
                    value={ this.props.note.body ? this.props.note.body : ''}
                    onChange={this.handleBodyChange.bind(this)}>
          </textarea>
          <button>Delete Note</button>
       </div>
      );
    }
    else {
      return (
        <div>
      { this.props.selectedNoteId ?  <p>No note found with id{ this.props.selectedNoteId }</p> : <p>Please create or select a note</p>}
      </div>
      );
    }
  }
}


Editor.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  note: PropTypes.object,
  selectNoteId: PropTypes.string,
};

/* container for production rendering */
export default withTracker((props) => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    //note: Notes.findOne({ _id: selectedNoteId }).fetch(),
    note: Notes.findOne(selectedNoteId),
    meteorCall: Meteor.call,
  };
})(Editor);
