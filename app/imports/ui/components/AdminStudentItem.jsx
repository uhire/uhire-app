import React from 'react';
import { Button, Container, Feed, Grid, Label, Table, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Companies } from '../../api/company/company';
import { Students } from '../../api/stuff/student';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminCompanyItem extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
      this.formRef.reset();
    }
  }

  onClick() {
    Companies.remove(this.props.company._id, this.deleteCallback);
  }


  render() {

    return (


        <Table.Row>
          <Table.Cell>{this.props.company.companyName}</Table.Cell>
          <Table.Cell>{this.props.company.location}</Table.Cell>
          <Table.Cell>{this.props.company.owner}</Table.Cell>

          <Table.Cell><Button basic onClick={this.onClick}>Delete</Button></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
AdminCompanyItem.propTypes = {
  company: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AdminCompanyItem);
