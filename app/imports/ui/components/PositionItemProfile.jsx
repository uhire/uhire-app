import React from 'react';
import { Button, Feed, Table, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Positions } from '../../api/position/position';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PositionItemProfile extends React.Component {


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
    Positions.remove(this.props.position._id, this.deleteCallback);
  }

  render() {

    return (
        <Table.Row>
          <Table.Cell>{this.props.position.title}</Table.Cell>
          <Table.Cell>{this.props.position.location}</Table.Cell>
          <Table.Cell>{this.props.position.openings}</Table.Cell>
          <Table.Cell>

            <Feed.Event>
              <Feed.Content>
                <Feed.Date content={this.props.position.date.toLocaleDateString('en-US')} />
              </Feed.Content>
            </Feed.Event>

          </Table.Cell>
          <Table.Cell>
            <Modal trigger={<Button size='mini' floated='right' compact>view</Button>}>
              {this.props.position.description}
            </Modal>
            {this.props.position.description}
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
PositionItemProfile.propTypes = {
  position: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PositionItemProfile);
