import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
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
      return <Redirect to={'/sprofile/'}/>;
    }
    if (this.state.redirectToReferer && Roles.userIsInRole(Meteor.userId(), 'company')) {
      return <Redirect to={'/add/'}/>;
    }
    if (this.state.redirectToReferer && Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return <Redirect to={'/admin/'}/>;
    }
    // Otherwise return the Login form.
    return (
        <div className="page-filler">
          <Container>
            <br></br>
            <br></br>
            <br></br>
            <Header as="h1" textAlign="center" inverted>
              Congratulations! Your Registration Was a Success.
            </Header>
            <br></br>
            <br></br>
            <br></br>

            <Grid divided="vertically" textAlign="left">
              <Grid.Row columns={2}>
                <Grid.Column width={8}>
                  <Image src='images/typewriter2.jpg' size='massive' rounded/>
                </Grid.Column>

                <Grid.Column>
                  <Header as="h2" textAlign="center" inverted>
                    Please Log In Here to Get Started.
                  </Header>
                  <Form onSubmit={this.handleSubmit}>
                    <Segment stacked>
                      <Form.Input
                          label="Email"
                          icon="user"
                          iconPosition="left"
                          name="email"
                          type="email"
                          placeholder="E-mail address"
                          onChange={this.handleChange}
                      />
                      <Form.Input
                          label="Password"
                          icon="lock"
                          iconPosition="left"
                          name="password"
                          placeholder="Password"
                          type="password"
                          onChange={this.handleChange}
                      />
                      <Form.Button content="Submit"/>
                    </Segment>
                  </Form>
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
              </Grid.Row>
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
