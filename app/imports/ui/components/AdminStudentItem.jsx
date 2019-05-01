import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Students } from '../../api/stuff/student';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminStudentItem extends React.Component {

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
    Students.remove(this.props.student._id, this.deleteCallback);
  }


  render() {

    return (


        <Table.Row>
          <Table.Cell>{this.props.student.lastName} {this.props.student.firstName}</Table.Cell>
          <Table.Cell>{this.props.student.location}</Table.Cell>
          <Table.Cell>{this.props.student.owner}</Table.Cell>

          <Table.Cell><Button basic onClick={this.onClick}>Delete</Button></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
AdminStudentItem.propTypes = {
  student: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AdminStudentItem);
