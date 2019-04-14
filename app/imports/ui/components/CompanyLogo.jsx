import React from 'react';
import { Image, Button, Modal, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Companies, CompanySchema } from '/imports/api/company/company';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Company extends React.Component {

  submit(data) {
    const { companyName, location, description, contact, image, _id } = data;
    Companies.update(_id, { $set: { companyName, location, description, contact, image } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  render() {
    return (
        <div>
          <Image src={this.props.company.image} size='medium' floated='right'/>
          <Modal trigger={<Button size='mini'>Edit</Button>}>
            <AutoForm schema={CompanySchema} onSubmit={this.submit} model={this.props.company}>
              <Segment>
                <TextField name='image'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='companyName' value={this.props.company.companyName}/>
                <HiddenField name='location' value={this.props.company.location}/>
                <HiddenField name='description' value={this.props.company.description}/>
                <HiddenField name='contact' value={this.props.company.contact}/>
                <HiddenField name='owner' value={this.props.company.owner}/>
              </Segment>
            </AutoForm>
          </Modal>
          <Button>
            <Link to={'/add/'}>Add Company</Link>
          </Button>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
Company.propTypes = {
  model: PropTypes.object,
  company: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Company);
