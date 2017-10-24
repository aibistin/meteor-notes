import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';


export const NoteListItem = (props) => {
    return (
        <div onClick={ () => {
            console.log("clicked note with Id, " + props.note._id);
            props.Session.set('selectedNoteId', props.note._id);
        }}>
          <h5>{props.note.title || 'Untitled Note'}</h5>
          {/* props.note.selected ? 'Selected this note' : '' */}
          <p>{ moment(props.note.updatedAt).format("DD/MM/YYYY") }</p>
        </div>
    );
};



NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired,
};


export default withTracker((props) => {
    return { Session };
})(NoteListItem);