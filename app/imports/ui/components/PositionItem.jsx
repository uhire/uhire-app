import React from 'react';
import { Feed, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PositionItem extends React.Component {
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
          <
            Table.Cell>{this.props.position.description}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
PositionItem.propTypes = {
  position: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PositionItem);
