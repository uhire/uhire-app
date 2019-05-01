import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Positions, PositionSchema } from '/imports/api/position/position';
import { Bert } from 'meteor/themeteorchef:bert';
import { Redirect } from 'react-router-dom';

import AutoForm from 'uniforms-semantic/AutoForm';
import AutoField from 'uniforms-semantic/AutoField';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditPosition extends React.Component {

  constructor(props) {
    super(props);
    // Added a redirectToReferer: false
    this.state = { redirectToReferer: false, options: Positions.find() };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.submit = this.submit.bind(this);

  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { title, location, openings, date, description, interests, contact, _id } = data;
    Positions.update(_id, { $set: { title, location, openings, date, description, contact, interests } }, (error) => {
      if (error) {
        return Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` });
      }
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
      return <Redirect to='/cohome'/>;
    }

    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Position</Header>
            <AutoForm schema={PositionSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='title'/>
                <TextField name='location'/>
                <NumField name='openings' decimal={false}/>
                <HiddenField name='date'/>
                <LongTextField name='description'/>
                <AutoField name='contact'/>
                <AutoField name='interests'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Position document in the props object.
 * Uniforms adds 'model' to the props, which we use. */
EditPosition.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Position documents.
  const subscription = Meteor.subscribe('Position');
  return {
    doc: Positions.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditPosition);
