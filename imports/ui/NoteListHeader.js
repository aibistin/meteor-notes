import React from 'react';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {
    return (
      <div className="item-list__header">
      <button className="button" onClick={ () => {
          props.meteorCall('notes.insert',(err,resp) => {
             if (resp) {
                props.Session.set('selectedNoteId', resp);
             }
             else if (err) {
                console.log("Error creating new note, ", err);
             }
          });
      } }>Create Note</button>
    </div>
    );
};


NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
};



export default withTracker((props) => {
    return {
        meteorCall: Meteor.call,
        Session
    };
})(NoteListHeader);
