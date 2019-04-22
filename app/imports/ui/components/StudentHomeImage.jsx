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
          <Image src={this.props.student.picture} centered size='medium'/><br/>

          <Modal trigger={<Button basic compact fluid size='mini' color='black'>Edit Image</Button>}>
            <AutoForm schema={StudentSchema} onSubmit={this.submit} model={this.props.student}>
              <Segment>
                <TextField name='picture'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='firstName' value={this.props.student.firstName}/>
                <HiddenField name='lastName' value={this.props.student.lastName}/>
                <HiddenField name='city' value={this.props.student.city}/>
                <HiddenField name='locationZip' value={this.props.student.locationZip}/>
                <HiddenField name='description' value={this.props.student.description}/>
                <HiddenField name='profile' value={this.props.student.profile}/>
                <HiddenField name='interests' value={this.props.student.interests}/>
                <HiddenField name='grade' value={this.props.student.grade}/>
                <HiddenField name='owner' value={this.props.student.owner}/>
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
  student: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudentHomeImage);
