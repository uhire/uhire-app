import React from 'react';
import { Companies, CompanySchema } from '/imports/api/company/company';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

/** Renders the Page for adding a document. */
class CompanyAdd extends React.Component {

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
    const { companyName, location, image, description, contact } = data;
    const owner = Meteor.user().username;
    Companies.insert({ companyName, location, image, description, contact, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    // redirect to company profile
    if (this.state.redirectToReferer) {
      return <Redirect to={'/list/'}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Company</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={CompanySchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='companyName'/>
                <TextField name='location'/>
                <TextField name='image'/>
                <LongTextField name='description'/>
                <TextField name='contact'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default CompanyAdd;
