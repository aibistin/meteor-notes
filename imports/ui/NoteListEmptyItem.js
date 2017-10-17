import { Meteor } from 'meteor/meteor';
import React from 'react';


export const NoteListEmptyItem = () => {
    return (
        <div>
          <h5>You Have No Notes</h5>
          <p>Please create a new note to get started</p>
        </div>
    );
};



export default NoteListEmptyItem;