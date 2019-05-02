import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Dropdown, Checkbox } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

/** Signup component is similar to signin component, but we attempt to create a new user instead. */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '', password: '', role: '', error: '', inputType: 'password', verifyPassword: '',
      redirectToReferer: false, check: false,
    };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleEmailValidation = this.handleEmailValidation.bind(this);
    this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Function to verify password matches */
  handleKeyUp() {
    if (this.state.password === this.state.verifyPassword) {
      this.setState({ error: '' });
    } else {
      this.setState({ error: 'Passwords do not match.' });
    }
  }

  /** Email Validation */
  handleEmailValidation() {
    const comRegex = /.+.com$/;
    const atSymbolRegex = /.+@/;

    if (!comRegex.test(this.state.email) && !atSymbolRegex.test(this.state.email)) {
      this.setState({ error: 'Current email is not an email. Please include "@ and .com". ' });
    } else
      if (!comRegex.test(this.state.email)) {
        this.setState({ error: 'Current email is not an email. Please include ".com". ' });
      } else
        if (!atSymbolRegex.test(this.state.email)) {
          this.setState({ error: 'Current email is not an email. Please include "@". ' });
        } else {
          this.setState({ error: '' });
        }
  }

  /** Password Validation to include certain characters */
  handlePasswordValidation() {
    const capitalLetterRegex = /.*[A-Z]+.*/;
    const numberRegex = /\d+/;
    const specialCharacterRegex = /\W+/;

    if (!capitalLetterRegex.test(this.state.password) && !numberRegex.test(this.state.password)
        && !specialCharacterRegex.test(this.state.password)) {
      this.setState({
        error: 'Password must include at least 1 number, ' +
            '1 Capital Letter, and 1 Special Character.',
      });
    } else
      if (!capitalLetterRegex.test(this.state.password) && !numberRegex.test(this.state.password)) {
        this.setState({ error: 'Password must include at least 1 number, and 1 Capital Letter.' });
      } else
        if (!capitalLetterRegex.test(this.state.password) && !specialCharacterRegex.test(this.state.password)) {
          this.setState({ error: 'Password must include at least 1 Special Character, and 1 Capital Letter.' });
        } else
          if (!numberRegex.test(this.state.password) && !specialCharacterRegex.test(this.state.password)) {
            this.setState({ error: 'Password must include at least 1 Special Character, and 1 number.' });
          } else
            if (!capitalLetterRegex.test(this.state.password)) {
              this.setState({ error: 'Password must include at least 1 Capital Letter.' });
            } else
              if (!specialCharacterRegex.test(this.state.password)) {
                this.setState({ error: 'Password must include at least 1 Special Character.' });
              } else
                if (!numberRegex.test(this.state.password)) {
                  this.setState({ error: 'Password must include at least 1 number.' });
                } else {
                  this.setState({ error: '' });
                }
  }

  /** Function to verify password input */
  handleClick() {
    this.setState({ inputType: this.state.inputType === 'password' ? 'text' : 'password' });
  }

  /** Disclaimer function to ensure that it is acknowledged */
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
      this.setState({ error: 'Fields Can Not Be Blank.' });
      throw new Meteor.Error('Fields Can Not Be Blank.');
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
    ];
    // Added a redirectToReferer to redirect to successful registration
    if (this.state.redirectToReferer) {
      return <Redirect to={'/sucReg/'}/>;
    }

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
                        onKeyUp={this.handleEmailValidation}
                    />
                    <Form.Input
                        required label="Password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type={this.state.inputType}
                        onChange={this.handleChange}
                        onKeyUp={this.handlePasswordValidation}
                    />
                    <Form.Input
                        required label="Verify Password"
                        icon="lock"
                        iconPosition="left"
                        name="verifyPassword"
                        placeholder="Password"
                        type={this.state.inputType}
                        onKeyUp={this.handleKeyUp}
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
                    <Form.Button name="submit" color="green" content="Submit"/>
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
