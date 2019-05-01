import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Menu style={menuStyle} attached="top" borderless inverted color='grey'>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>UHire</Header>
          </Menu.Item>

          {/** [Defines the contents available on an admin nav-bar.] */}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item>
                <Dropdown item text='All Pages'>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Admin Home Page" as={NavLink} exact to="/admin"/>
                    <Dropdown.Item icon="briefcase" text="Company Home Page" as={NavLink} exact to="/cohome"/>
                    <Dropdown.Item icon="briefcase" text="Browse Companies Page" as={NavLink} exact to="/browsecom"/>
                    <Dropdown.Item icon="student" text="Student Profile Page" as={NavLink} exact to="/sprofile"/>
                    <Dropdown.Item icon="student" text="Student Home Page" as={NavLink} exact to="/studentHome"/>
                    <Dropdown.Item icon="student" text="Browse Student Page" as={NavLink} exact to="/browsestu"/>
                    <Dropdown.Item icon="student" text="Add Student Page" as={NavLink} exact to="/addStudent"/>
                    {/** <Dropdown.Item icon="student" text="Edit Student Page"
                     as={NavLink} exact to="/editstu"/> */}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>) : ''}

          {/** [Defines the contents available on a company nav-bar.] */}
          {Roles.userIsInRole(Meteor.userId(), 'company') ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/cohome"
                          key='cohome'>
                <Header color='green' as='h3'>Company Home Page</Header>
              </Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/browsestu"
                           key='browsestu'>
                  <Header color='green'>Browse Students</Header>
                </Menu.Item>]) : ''}

          {/** [Defines the contents available on a student nav-bar.] */}
          {Roles.userIsInRole(Meteor.userId(), 'student') ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/studentHome"
                          key='studentHome'>
                <Header color='green' as='h3'>Student Home Page</Header>
              </Menu.Item>,
             /*   <Menu.Item as={NavLink} activeClassName="active" exact to="/sprofile"
                           key='sprofile'>
                  <Header color='green'>Student Profile Page</Header>
                </Menu.Item>, */
                <Menu.Item as={NavLink} activeClassName="active" exact to="/browsecom"
                           key='browsecom'>
                  <Header color='green'>Browse Companies Page</Header>
                </Menu.Item>]) : ''}

          {/** [Defines the contents available to ALL users' nav-bar.] */}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Dropdown text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
