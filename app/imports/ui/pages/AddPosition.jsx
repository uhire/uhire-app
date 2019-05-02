import React from 'react';
import { Positions, PositionSchema } from '/imports/api/position/position';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import AutoField from 'uniforms-semantic/AutoField';
import NumField from 'uniforms-semantic/NumField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import SubmitField from 'uniforms-semantic/SubmitField';
import { Companies } from '/imports/api/company/company.js';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class AddPosition extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.state = { redirectToReferer: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
      this.setState({ redirectToReferer: true });
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { companyName, title, location, openings, date, description, contact, interests } = data;
    const applied = [''];
    const owner = Meteor.user().username;
    Positions.insert({
      companyName,
      title,
      location,
      openings,
      date,
      description,
      contact,
      interests,
      owner,
      applied,
    }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {

    if (this.state.redirectToReferer) {
      return <Redirect to={'/cohome'}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Position</Header>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={PositionSchema} onSubmit={this.submit}>
              <Segment>
                <TextField placeholder='Enter Position Title' name='title'/>
                <TextField placeholder='123 Company St., Honolulu, HI., 96822' name='location'/>
                <NumField placeholder='# of openings' name='openings' decimal={false}/>
                <LongTextField placeholder='Brief Position Description' name='description'/>
                <AutoField placeholder='Enter Contact Email' name='contact' />
                <AutoField name='interests'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='companyName' value={this.props.companies[0].companyName}/>
                <HiddenField name='date' value={new Date()}/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

AddPosition.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subCompanies = Meteor.subscribe('Companies');

  return {
    companies: Companies.find({}).fetch(),
    ready: subCompanies.ready(),
  };
})(AddPosition);
