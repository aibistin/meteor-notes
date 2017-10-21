import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';
/* 
 *   Local Imports
 */
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
/* 
 *   Variables
 */

const onEnterNotesPage = (nextState) => {
  /* nextState.params.id is the 'id' at the end of '/dashboard/somnoteid'. Preserve this in the session for after a screen refresh */
  Session.set('selectedNoteId', nextState.params.id);
};
const onLeaveNotesPage = () => {
    Session.set('selectedNoteId', undefined);
};

export const onAuthChange = (isAuthenticated, currentStatePrivacy) => {
  const isAuthenticatedPage = currentStatePrivacy === 'auth';
  const isUnAuthenticatedPage = currentStatePrivacy === 'unauth';

  if (isUnAuthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  }
  else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }

};

export const globalOnEnter = (nextState) => {
  console.log("Global on Enter");
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentStatePrivacy', lastRoute.privacy);
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};


export const routes = (
  <Router history={browserHistory}>
   <Route onEnter={ globalOnEnter } onChange={ globalOnChange } >
     <Route path="/" component={Login}  privacy="unauth"/>
     <Route path="/signup" component={Signup} privacy="unauth"/>
     <Route path="/dashboard" component={Dashboard} privacy="auth"/>
     <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotesPage} onLeave={ onLeaveNotesPage }/>
     <Route path="*" component={NotFound}/>
   </Route>
  </Router>
);
