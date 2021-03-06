import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Checkbox, Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', inputType: 'password', redirectToReferer: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    this.setState({ inputType: this.state.inputType === 'password' ? 'text' : 'password' });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
     if (this.state.redirectToReferer && Roles.userIsInRole(Meteor.userId(), 'student')) {
      return <Redirect to={'/studentHome/'}/>;
    }
    if (this.state.redirectToReferer && Roles.userIsInRole(Meteor.userId(), 'company')) {
      return <Redirect to={'/cohome/'}/>;
    }
    if (this.state.redirectToReferer && Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return <Redirect to={'/admin/'}/>;
    }
    // Otherwise return the Login form.
    return (
        <div className="page-filler">
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>
                Login to your account
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                      required label="Email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      required label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type={this.state.inputType}
                      onChange={this.handleChange}
                  />
                  <Form.Field control={Checkbox} label='Show password' onClick={this.handleClick} />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                <Link to="/signup">Click here to Register</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Login was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};
