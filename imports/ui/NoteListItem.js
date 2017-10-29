import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';


export const NoteListItem = (props) => {
    let itemClass = props.note.selected ? "item item--selected" : " item";
    return (
        <div className={itemClass} onClick={ () => {
        
            console.log("clicked note with Id, " + props.note._id);
            props.Session.set('selectedNoteId', props.note._id);
        }}>
          <h5 className="item__title">{props.note.title || 'Untitled Note'}</h5>
          <p className="item__sub-title">{ moment(props.note.updatedAt).format("DD/MM/YYYY") }</p>
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
