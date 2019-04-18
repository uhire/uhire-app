import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import CompanyAdd from '../pages/CompanyAdd';
import CompanyProfilePage from '../pages/CompanyProfilePage';
import AdminHome from '../pages/AdminHome';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import StudentHome from '../pages/StudentHome';
import StudentProfile from '../pages/StudentProfile';
import CompanyHome from '../pages/CompanyHome';
import CompanyRegistration from '../pages/CompanyRegistration';
import SuccessfulRegistration from '../pages/SuccessfulRegistration';
import EditPosition from '../pages/EditPosition';
import AddPosition from '../pages/AddPosition';
import EditStudent from '../pages/EditStudent';
import BrowseStudents from '../pages/BrowseStudents';
import BrowseCompanies from '../pages/BrowseCompanies';


/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/sucReg" component={SuccessfulRegistration}/>
              <Route path="/coregis" component={CompanyRegistration}/>
              <Route path="/browsestu" component={BrowseStudents}/>
              <Route path="/browsecom" component={BrowseCompanies}/>
              <ProtectedRoute path="/list" component={CompanyProfilePage}/>
              <ProtectedRoute path="/add" component={CompanyAdd}/>
              { /* cannot remain unprotected */ }
              <Route path="/cohome" component={CompanyHome}/>
              <Route path="/sprofile" component={StudentProfile}/>
              <ProtectedRoute path="/addposition" component={AddPosition}/>
              <ProtectedRoute path="/studentHome" component={StudentHome}/>
              <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
              <ProtectedRoute path="/editposition/:_id" component={EditPosition}/>
              <ProtectedRoute path="/editstu/:_id" component={EditStudent}/>
              <AdminProtectedRoute path="/admin" component={AdminHome}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
