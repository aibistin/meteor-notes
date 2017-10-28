import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
/* Local Imports */
import { Notes } from '../api/notes';
export class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  /* Lifecycle Methods */
  componentDidUpdate(prevProps, prevState) {
    /* To Allow for better editing of title and body */
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
    const currentNoteId = this.props.note ? this.props.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body,
      });
    }
  }

  /* Events */
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.meteorCall('notes.update', { userId: Meteor.userId(), _id: this.props.note._id }, { title });
  }

  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.meteorCall('notes.update', { userId: Meteor.userId(), _id: this.props.note._id }, { body });
  }

  handleDelete(e) {
    this.props.meteorCall('notes.remove', this.props.note._id, Meteor.userId());
    Session.set('selectedNoteId', undefined);
    this.props.browserHistory.push('/dashboard');
  }


  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input name="title"  value={this.state.title}  placeholder="Untitled Note"  onChange={this.handleTitleChange.bind(this)} />
          <textarea name="body" placeholder="Your note here"  value={ this.state.body } onChange={this.handleBodyChange.bind(this)}> </textarea>
          <div>
            <button onClick={ this.handleDelete.bind(this) }>Delete Note</button>
          </div>
       </div>
      );
    }
    else {
      return (
        <div className="editor">
          <p>
          { this.props.selectedNoteId ? "No note found with id { this.props.selectedNoteId }" : "Please create or select a note"}
          </p>
      </div>
      );
    }
  }
}


Editor.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  note: PropTypes.object,
  selectNoteId: PropTypes.string,
  browserHistory: PropTypes.object.isRequired
};

/* container for production rendering */
export default withTracker((props) => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    //note: Notes.findOne({ _id: selectedNoteId }).fetch(),
    note: Notes.findOne(selectedNoteId),
    meteorCall: Meteor.call,
    browserHistory,
  };
})(Editor);
