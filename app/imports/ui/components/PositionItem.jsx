import React from 'react';
import { Button, Container, Feed, Grid, Label, Table, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Positions } from '../../api/position/position';
import InterestItem from '/imports/ui/components/InterestItem';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PositionItem extends React.Component {

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
    const modalPadding = { padding: '30px 30px 10px 10px' };
    const descContainer = { width: '400px'};

    return (
        <Modal trigger={
          <Table.Row>
            <Table.Cell>{this.props.position.title}</Table.Cell>
            <Table.Cell>{this.props.position.location}</Table.Cell>
            <Table.Cell>{this.props.position.openings}</Table.Cell>
            <Table.Cell>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content={this.props.position.date.toLocaleDateString('en-US')}/>
                </Feed.Content>
              </Feed.Event>

            </Table.Cell>
            <Table.Cell singleLine>
              {this.props.position.description}
            </Table.Cell>
            <Table.Cell><Label.Group>{this.props.position.interests.map((stuff, index) => <InterestItem key={index} interest={stuff}/>)}</Label.Group></Table.Cell>
            <Table.Cell>
              <Link to={`/editposition/${this.props.position._id}`}>Edit</Link>
            </Table.Cell>
            <Table.Cell><Button basic onClick={this.onClick}>Delete</Button></Table.Cell>
          </Table.Row>}>

          <Table celled selectable>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{this.props.position.title}</Table.Cell>
                <Table.Cell>{this.props.position.location}</Table.Cell>
                <Table.Cell>{this.props.position.openings}</Table.Cell>
                <Table.Cell>

                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date content={this.props.position.date.toLocaleDateString('en-US')}/>
                    </Feed.Content>
                  </Feed.Event>

                </Table.Cell>
                <Table.Cell>
                  {this.props.position.description}
                </Table.Cell>
                <Table.Cell><Label.Group>{this.props.position.interests.map((stuff, index) => <InterestItem key={index} interest={stuff}/>)}</Label.Group></Table.Cell>
                <Table.Cell>
                  <Link to={`/editposition/${this.props.position._id}`}>Edit</Link>
                </Table.Cell>
                <Table.Cell><Button basic onClick={this.onClick}>Delete</Button></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal>
    );
  }
}

/** Require a document to be passed to this component. */
PositionItem.propTypes = {
  position: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PositionItem);
