import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Dropdown, Checkbox } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '', password: '', role: '', error: '', inputType: 'password',
      redirectToReferer: false, check: false,
    };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    this.setState({ inputType: this.state.inputType === 'password' ? 'text' : 'password' });
  }

  handleCheck() {
    const { check } = this.state;

    if (check === false) {
      this.setState({ check: true });
    } else {
      this.setState({ check: false });
    }
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password, role, check } = this.state;
    if ((!role || !password) || check === false) {
      this.setState({ error: 'Fields Can Not Be Blank' });
      throw new Meteor.Error('Fields Can Not Be Blank');
    }
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
      /** {
        key: 'Admin',
        text: 'Admin',
        value: 'admin',
        icon: 'user',
      }, */
    ];
    // Added a redirectToReferer to redirect to home pages
    if (this.state.redirectToReferer) {
      return <Redirect to={'/sucReg/'}/>;
    }
    /** if (this.state.redirectToReferer && this.state.role === 'student') {
      return <Redirect to={'/studentHome/'}/>;
    }
     if (this.state.redirectToReferer && this.state.role === 'company') {
      return <Redirect to={'/add/'}/>;
    }
     if (this.state.redirectToReferer && this.state.role === 'admin') {
      return <Redirect to={'/admin/'}/>;
    } */

    return (
        <div className="page-filler">
          <Container>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <Header as="h2" textAlign="center" inverted>
                  Register your account
                </Header>

                <Form name='Form' onSubmit={this.handleSubmit}>
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
                    <Form.Field control={Checkbox} label='Show password' onClick={this.handleClick}/>
                    <br/>
                    <Form.Field required control={Dropdown} label='Choose a Profession' onChange={this.handleChange}
                                fluid selection options={profession} name={'role'}/>
                    <br/>
                    <Form.Field required control={Checkbox}
                                label='By checking this box, I agree to share my information'
                                onClick={this.handleCheck}/>
                    <br/>
                    <Form.Button color="green" content="Submit"/>
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
        </div>
    );
  }
}
