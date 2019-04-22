import React from 'react';
import { Button, Image, Modal, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Students, StudentSchema } from '/imports/api/stuff/student';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentHomeImage extends React.Component {


  submit(data) {
    const { firstName, lastName, description, city, locationZip, profile, picture, interests, grade, _id } = data;
    Students.update(_id, { $set: {
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
    }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  render() {
    return (
        <div>
          <Image src={this.props.students.picture} centered size='medium'/><br/>

          <Modal trigger={<Button basic compact fluid size='mini' color='black'>Edit Image</Button>}>
            <AutoForm schema={StudentSchema} onSubmit={this.submit} model={this.props.students}>
              <Segment>
                <TextField name='picture'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='firstName' value={this.props.students.firstName}/>
                <HiddenField name='lastName' value={this.props.students.lastName}/>
                <HiddenField name='city' value={this.props.students.city}/>
                <HiddenField name='locationZip' value={this.props.students.locationZip}/>
                <HiddenField name='description' value={this.props.students.description}/>
                <HiddenField name='profile' value={this.props.students.profile}/>
                <HiddenField name='interests' value={this.props.students.interests}/>
                <HiddenField name='grade' value={this.props.students.grade}/>
                <HiddenField name='owner' value={this.props.students.owner}/>
              </Segment>
            </AutoForm>
          </Modal>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
StudentHomeImage.propTypes = {
  model: PropTypes.object,
  students: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudentHomeImage);
