import React, {} from 'react';
import {
  Grid,
  Loader,
  Header,
  Segment,
  Form,
  Button,
  Checkbox,
  TextArea,
} from 'semantic-ui-react';
import { Positions } from '/imports/api/position/position';
import { Students } from '/imports/api/stuff/student';
import { Bert } from 'meteor/themeteorchef:bert';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NULL } from 'graphql/language/kinds';

/** Renders the Page for editing a single document. */
class Apply extends React.Component {

  constructor(props) {
    super(props);
    // Added a redirectToReferer: false
    this.state = {
      redirectToReferer: false,
      options: Positions.find(),
      position: NULL,
      student: NULL,
      about: '',
      submittedAbout: '',
      check: false,
    };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.submit = this.submit.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  /** On successful submit, insert the data. */
  submit() {
    const { about, check } = this.state;
    if (check === true) {
      this.setState({ submittedAbout: about });
      Meteor.call(
          'sendEmail',
          {
            to: `${this.state.position.contact}`,
            from: 'uhirenoreply@gmail.com',
            subject: `${this.state.student.firstName} ${this.state.student.lastName} is applying for 
            ${this.state.position.title}`,
            text: `Aloha from UHire,\n
          ${this.state.student.firstName} ${this.state.student.lastName} is applying for 
          ${this.state.position.title} listed on UHire.
          Professional Profile: ${this.state.student.profile}
          UHire Profile: N/A
          Email: ${this.state.student.owner}
          Submission: ${about}`,
          }, (err) => {
            if (err) {
              alert(err);
            } else {
              // success!
            }
          },
          );
      const applied = this.state.position.applied;
      applied.push(this.state.student._id);
      this.state.position.applied = applied;
      Positions.update(this.state.position._id, { $set: { applied } }, (error) => {
        if (error) {
          return Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` });
        }
        this.setState({ redirectToReferer: true });
        return Bert.alert({ type: 'success', message: 'Update succeeded' });
      });
      this.setState({ redirectToReferer: true });

    } else {
      alert('Please approve the sharing of information before you submit');
    }
  }

  handleClick() {
    const { check } = this.state;

    if (check === false) {
      this.setState({ check: true });
    } else {
      this.setState({ check: false });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.state.position === NULL) {
      this.state.position = this.props.doc;
    }
    if (this.state.student === NULL) {
      this.state.student = this.props.student[0];
    }
    if (this.state.redirectToReferer) {
      return <Redirect to='/studentHome'/>;
    }
    const { about } = this.state;

    if (!_.contains(this.state.position.applied, this.state.student._id)) {
      return (
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" inverted textAlign="center">Apply For Position</Header>
              <Segment>
                <Form onSubmit={this.submit}>

                  <Form.Field control={TextArea} label='About' placeholder='Tell us about yourself...' name='about'
                              value={about} onChange={this.handleChange}/>
                  <Form.Field control={Checkbox} label='I agree to share my information with this company'
                              onClick={this.handleClick}/>


                  <Form.Field control={Button}>Submit</Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
      );
    }
    return (
        <Header as="h2" inverted textAlign="center">You have already applied for this positons. Please wait to hear back
          from {this.state.position.companyName}.</Header>
    );
  }
}

/** Require the presence of a Position document in the props object.
 * Uniforms adds 'model' to the props, which we use. */
Apply.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  student: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Position documents.
  const subscription = Meteor.subscribe('Position');
  const subStudents = Meteor.subscribe('SelfStudent');
  return {
    doc: Positions.findOne(documentId),
    ready: subscription.ready() && subStudents.ready(),
    student: Students.find({}).fetch(),
  };
})(Apply);
