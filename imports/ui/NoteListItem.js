import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';


export const NoteListItem = (props) => {
    return (
        <div>
          <h5>{props.note.title || 'Untitled Note'}</h5>
          <p>{props.note.body}</p>
          <span>{ moment(props.note.updatedAt).format("DD/MM/YYYY") }</span>
        </div>
    );
};



NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
};

/*
export default withTracker((props) => {
    return {

    };
})(NoteListItem);
*/
export default NoteListItem;