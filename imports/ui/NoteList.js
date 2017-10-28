import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

/* Local Imports */
import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {
    return (
        <div className="item-list" >
          { props.notes.length === 0 ? <NoteListEmptyItem/> : undefined } 
          <NoteListHeader />
          NoteList Count: { props.notes.length }
          {
              props.notes.map( (note) =>  {
                  return <NoteListItem key={note._id} note={note} />;
              })
          }
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
};

export default withTracker((props) => {
    Meteor.subscribe('notes');
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        notes: Notes.find({},{ sort: { updatedAt: -1 } }).fetch().map((note) => {
            // note.selected  = (note._id === selectedNoteId);
            return {
                ...note,
                selected: (note._id === selectedNoteId),
            }
        }),
    };

})(NoteList);
