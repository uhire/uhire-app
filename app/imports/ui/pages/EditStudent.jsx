import React from 'react';
import { Grid, Loader, Header, Segment, Dropdown } from 'semantic-ui-react';
import { Students, StudentSchema } from '/imports/api/stuff/student';
import { Interests } from '/imports/api/stuff/interests';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import ListAddField from 'uniforms-semantic/ListAddField';
import RadioField from 'uniforms-semantic/RadioField';
import AutoField from 'uniforms-semantic/AutoField';
import { Meteor } from 'meteor/meteor';
import LongTextField from 'uniforms-semantic/LongTextField';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import InterestForm from '/imports/ui/components/InterestForm';

/** Renders the Page for editing a single document. */
class EditStudent extends React.Component {

  constructor(props) {
    super(props);
    // Added a redirectToReferer: false
    this.state = { redirectToReferer: false, options: Interests.find() };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.submit = this.submit.bind(this);

  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, description, city, locationZip, profile, picture, interests, grade, _id } = data;
    Students.update(_id, {
      $set: {
        firstName,
        lastName,
        description,
        city,
        locationZip,
        profile,
        picture,
        interests,
        grade,
      },
    }, (error) => {
      if (error) {
        return Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` });
      }
      // browserHistory.push('/login');
      // Added a redirectToReferer
      this.setState({ redirectToReferer: true });
      return Bert.alert({ type: 'success', message: 'Update succeeded' });

    });

  }


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {

    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.state.redirectToReferer) {
      return <Redirect to='/sprofile' />;
    }
    return (

        <Grid container centered>
          <Grid.Column>
            <Header as="h2" inverted textAlign="center">Edit Student</Header>
            <AutoForm schema={StudentSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <LongTextField name='description'/>
                <TextField name='city'/>
                <NumField name='locationZip' decimal={false}/>
                <TextField name='profile'/>
                <TextField name='picture'/>
                <AutoField name='interests'/>
                <RadioField name='grade'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditStudent.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Student');
  const subscription2 = Meteor.subscribe('Interests');
  return {
    doc: Students.findOne(documentId),
    ready: subscription.ready() && subscription2.ready(),
    options: Interests.find({}).fetch(),

  };
})(EditStudent);
