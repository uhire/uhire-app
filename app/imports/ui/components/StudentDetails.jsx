import React from 'react';
import { Container, Modal, Icon, Header, Grid, Button, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Students, StudentSchema } from '/imports/api/stuff/student';
import InterestItem from '/imports/ui/components/InterestItem';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import AutoField from 'uniforms-semantic/AutoField';
import RadioField from 'uniforms-semantic/RadioField';
// import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import NumField from 'uniforms-semantic/NumField';
import LongTextField from 'uniforms-semantic/LongTextField';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentDetails extends React.Component {

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
    }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  render() {
    return (

        <Container>
          <Grid>

            <Grid.Row>
              <Grid.Column width={8}>
                <Header>
                  <Icon name='user'/>
                  <Header.Content>{this.props.student.firstName} {this.props.student.lastName}</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Modal trigger={<Icon disabled link name='edit'/>}>
                  <AutoForm schema={StudentSchema} onSubmit={this.submit} model={this.props.student}>
                    <Segment>
                      <TextField name='firstName'/>
                      <TextField name='lastName'/>
                      <SubmitField value='Submit'/>
                      <ErrorsField/>
                      <HiddenField name='city' value={this.props.student.city}/>
                      <HiddenField name='locationZip' value={this.props.student.locationZip}/>
                      <HiddenField name='description' value={this.props.student.description}/>
                      <HiddenField name='profile' value={this.props.student.profile}/>
                      <HiddenField name='picture' value={this.props.student.picture}/>
                      <HiddenField name='interests' value={this.props.student.interests}/>
                      <HiddenField name='grade' value={this.props.student.grade}/>
                      <HiddenField name='owner' value={this.props.student.owner}/>
                    </Segment>
                  </AutoForm>
                </Modal>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Header>
                  <Icon name='building'/>
                  <Header.Content>{this.props.student.city} {this.props.student.locationZip}</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Modal trigger={<Icon disabled link name='edit'/>}>
                  <AutoForm schema={StudentSchema} onSubmit={this.submit} model={this.props.student}>
                    <Segment>
                      <TextField name='city'/>
                      <TextField name='locationZip'/>
                      <SubmitField value='Submit'/>
                      <ErrorsField/>
                      <HiddenField name='firstName' value={this.props.student.firstName}/>
                      <HiddenField name='lastName' value={this.props.student.lastName}/>
                      <HiddenField name='description' value={this.props.student.description}/>
                      <HiddenField name='profile' value={this.props.student.profile}/>
                      <HiddenField name='picture' value={this.props.student.picture}/>
                      <HiddenField name='interests' value={this.props.student.interests}/>
                      <HiddenField name='grade' value={this.props.student.grade}/>
                      <HiddenField name='owner' value={this.props.student.owner}/>
                    </Segment>
                  </AutoForm>
                </Modal>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Header>
                  <Icon name='world'/>
                  <Header.Content><a href="mailto: {this.props.student.contact}">
                    {this.props.student.contact}</a></Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Modal trigger={<Icon disabled link name='edit'/>}>
                  <AutoForm schema={StudentSchema} onSubmit={this.submit} model={this.props.student}>
                    <Segment>
                      <TextField name='profile'/>
                      <SubmitField value='Submit'/>
                      <ErrorsField/>
                      <HiddenField name='firstName' value={this.props.student.firstName}/>
                      <HiddenField name='lastName' value={this.props.student.lastName}/>
                      <HiddenField name='city' value={this.props.student.city}/>
                      <HiddenField name='locationZip' value={this.props.student.locationZip}/>
                      <HiddenField name='description' value={this.props.student.description}/>
                      <HiddenField name='picture' value={this.props.student.picture}/>
                      <HiddenField name='interests' value={this.props.student.interests}/>
                      <HiddenField name='grade' value={this.props.student.grade}/>
                      <HiddenField name='owner' value={this.props.student.owner}/>
                    </Segment>
                  </AutoForm>
                </Modal>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Header>
                  <Icon name='tag'/>
                  <Header.Content>{this.props.student.interests.map((stuff, key) => <InterestItem
                      key={key} interest={stuff}/>)}</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Modal trigger={<Icon disabled link name='edit'/>}>
                  <AutoForm schema={StudentSchema} onSubmit={this.submit} model={this.props.student}>
                    <Segment>
                      <AutoField name='interests'/>
                      <SubmitField value='Submit'/>
                      <ErrorsField/>
                      <HiddenField name='firstName' value={this.props.student.firstName}/>
                      <HiddenField name='lastName' value={this.props.student.lastName}/>
                      <HiddenField name='city' value={this.props.student.city}/>
                      <HiddenField name='locationZip' value={this.props.student.locationZip}/>
                      <HiddenField name='description' value={this.props.student.description}/>
                      <HiddenField name='profile' value={this.props.student.profile}/>
                      <HiddenField name='picture' value={this.props.student.picture}/>
                      <HiddenField name='grade' value={this.props.student.grade}/>
                      <HiddenField name='owner' value={this.props.student.owner}/>
                    </Segment>
                  </AutoForm>
                </Modal>
              </Grid.Column>
            </Grid.Row>


          </Grid>
        </Container>

    );
  }
}

/** Require a document to be passed to this component. */
StudentDetails.propTypes = {
  student: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudentDetails);
