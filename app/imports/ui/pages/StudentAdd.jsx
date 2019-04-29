import React from 'react';
import { Students, StudentSchema } from '/imports/api/stuff/student';
import { Grid, Header, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import AutoField from 'uniforms-semantic/AutoField';
import RadioField from 'uniforms-semantic/RadioField';
import NumField from 'uniforms-semantic/NumField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

/** Renders the Page for adding a document. */
class StudentAdd extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.state = { redirectToReferer: false };
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
      // redirect to company profile if succeed
      this.setState({ redirectToReferer: true });
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { firstName, lastName, description, city, locationZip, profile, picture, interests, grade } = data;
    const owner = Meteor.user().username;
    Students.insert({
      firstName,
      lastName,
      description,
      city,
      locationZip,
      profile,
      picture,
      interests,
      grade,
      owner,
    }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    // redirect to student profile
    if (this.state.redirectToReferer) {
      return <Redirect to={'/studentHome'}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Student</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={StudentSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='firstName' />
                <TextField name='lastName'/>
                <LongTextField name='description'/>
                <TextField name='city'/>
                <NumField name='locationZip' decimal={false}/>
                <TextField name='profile' placeholder='https://...'/>
                <TextField name='picture' />
                <AutoField name='interests'/>
                <RadioField name='grade'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default StudentAdd;
