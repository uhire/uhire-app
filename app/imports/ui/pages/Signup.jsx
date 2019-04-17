import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Dropdown } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', role: '', error: '', redirectToReferer: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password, role } = this.state;
    Meteor.call('createNewUser', email, password, role);
    this.setState({ error: '', redirectToReferer: true });
  }

  /** Display the signup form. */
  render() {

    // Profession added as role indicator
    const profession = [
      {
        key: 'Company',
        text: 'Company',
        value: 'company',
        icon: 'briefcase',
      },
      {
        key: 'Student',
        text: 'Student',
        value: 'student',
        icon: 'student',
      },
      {
        key: 'Admin',
        text: 'Admin',
        value: 'admin',
        icon: 'user',
      },
    ];

    // Added a redirectToReferer to redirect to home pages
    if (this.state.redirectToReferer && this.state.role === 'student') {
      return <Redirect to={'/studentHome/'}/>;
    }
    if (this.state.redirectToReferer && this.state.role === 'company') {
      return <Redirect to={'/coHome/'}/>;
    }
    if (this.state.redirectToReferer && this.state.role === 'admin') {
      return <Redirect to={'/admin/'}/>;
    }

    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>
                Register your account
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
                  <Dropdown
                      placeholder='Choose a Profession'
                      fluid
                      selection
                      options={profession}
                      name={'role'}
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
