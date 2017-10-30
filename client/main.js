import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentStatePrivacy = Session.get('currentStatePrivacy');
  onAuthChange(isAuthenticated, currentStatePrivacy);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
    Session.set('isNavOpen', false);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen);
});

/* React render */
Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById('app'));
});
