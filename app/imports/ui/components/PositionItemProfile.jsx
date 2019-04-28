import React from 'react';
import { Button, Feed, Label, Table, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Positions } from '../../api/position/position';
import InterestItem from '/imports/ui/components/InterestItem';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PositionItemProfile extends React.Component {

  render() {

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
            <Table.Cell>
              <Label.Group>
                {this.props.position.interests.map((stuff, index) => <InterestItem key={index} interest={stuff}/>)}
              </Label.Group>
            </Table.Cell>
          </Table.Row>
        }>

          <Table celled selectable>
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
            </Table.Row>
          </Table>

        </Modal>
    );
  }
}

/** Require a document to be passed to this component. */
PositionItemProfile.propTypes = {
  position: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PositionItemProfile);
