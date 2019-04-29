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
import StudentAdd from '../pages/StudentAdd';
import Apply from '../pages/Apply';
import PositionHome from '../pages/PositionHome';

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
              <ProtectedRoute path="/signout" component={Signout}/>
              <AdminProtectedRoute path="/admin" component={AdminHome}/>
              <CompanyProtectedRoute path="/coregis" component={CompanyRegistration}/>
              <CompanyProtectedRoute path="/browsestu" component={BrowseStudents}/>
              <CompanyProtectedRoute path="/addposition" component={AddPosition}/>
              <CompanyProtectedRoute path="/editposition/:_id" component={EditPosition}/>
              <CompanyProtectedRoute path="/phome/:_id" component={PositionHome}/>
              <ProtectedRoute path="/companyprofile/:companyName" component={CompanyProfilePage}
                                     onClick={Meteor.call('visitCounter', '/list')}/>
              <CompanyProtectedRoute path="/add" component={CompanyAdd}/>
              <CompanyProtectedRoute path="/cohome" component={CompanyHome}/>
              { /**<ProtectedRoute path="/sprofile" component={StudentProfile}/> */}
              <StudentProtectedRoute path="/browsecom" component={BrowseCompanies}/>
              <StudentProtectedRoute path="/studentHome" component={StudentHome}/>
              <StudentProtectedRoute path="/addStudent" component={StudentAdd}/>
              <StudentProtectedRoute path="/editstu/:_id" component={EditStudent}/>
              <StudentProtectedRoute path="/apply/:_id" component={Apply}/>
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
              (<Redirect to={{ pathname: '/', state: { from: props.location } }}/>
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
              (<Redirect to={{ pathname: '/', state: { from: props.location } }}/>
              );
        }}
    />
);
/**
 * CompanyProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login, company or admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const CompanyProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && (isCompany || isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/', state: { from: props.location } }}/>
              ));
        }}
    />
);
/**
 * StudentProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login, student or admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const StudentProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && (isStudent || isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/', state: { from: props.location } }}/>
              ));
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
/** Require a component and location to be passed to each CompanyProtectedRoute. */
CompanyProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};
/** Require a component and location to be passed to each StudentProtectedRoute. */
StudentProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
