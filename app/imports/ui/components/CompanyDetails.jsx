import React from 'react';
import { Container, Modal, Icon, Header, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Companies, CompanySchema } from '/imports/api/company/company';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
// import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyDetails extends React.Component {

  submit(data) {
    const { companyName, location, description, contact, image, _id } = data;
    Companies.update(_id, { $set: { companyName, location, description, contact, image } }, (error) => (error ?
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
                  <Icon name='building'/>
                  <Header.Content>{this.props.company.companyName}</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Modal trigger={<Icon disabled link name='edit'/>}>
                  <AutoForm schema={CompanySchema} onSubmit={this.submit} model={this.props.company}>
                    <TextField name='companyName'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                    <HiddenField name='location' value={this.props.company.location}/>
                    <HiddenField name='description' value={this.props.company.description}/>
                    <HiddenField name='contact' value={this.props.company.contact}/>
                    <HiddenField name='image' value={this.props.company.image}/>
                    <HiddenField name='owner' value={this.props.company.owner}/>
                  </AutoForm>
                </Modal>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>

              <Grid.Column width={8}>
                <Header>
                  <Icon name='marker'/>
                  <Header.Content>{this.props.company.location}</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Modal trigger={<Icon disabled link name='edit'/>}>
                  <AutoForm schema={CompanySchema} onSubmit={this.submit} model={this.props.company}>
                    <TextField name='location'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                    <HiddenField name='companyName' value={this.props.company.companyName}/>
                    <HiddenField name='description' value={this.props.company.description}/>
                    <HiddenField name='contact' value={this.props.company.contact}/>
                    <HiddenField name='image' value={this.props.company.image}/>
                    <HiddenField name='owner' value={this.props.company.owner}/>
                  </AutoForm>
                </Modal>
              </Grid.Column>

            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Header>
                  <Icon name='world'/>
                  <Header.Content><a href="mailto: {this.props.company.contact}">
                    {this.props.company.contact}</a></Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Modal trigger={<Icon disabled link name='edit'/>}>
                  <AutoForm schema={CompanySchema} onSubmit={this.submit} model={this.props.company}>
                    <TextField name='contact'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                    <HiddenField name='companyName' value={this.props.company.companyName}/>
                    <HiddenField name='location' value={this.props.company.location}/>
                    <HiddenField name='description' value={this.props.company.description}/>
                    <HiddenField name='image' value={this.props.company.image}/>
                    <HiddenField name='owner' value={this.props.company.owner}/>
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
CompanyDetails.propTypes = {
  company: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CompanyDetails);
