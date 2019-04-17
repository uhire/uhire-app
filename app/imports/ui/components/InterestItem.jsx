import React from 'react';
import { Table, Container, Image, Card, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class InterestItem extends React.Component {
  render() {
    return (

          <Label as='a' tag>{this.props.interest}</Label>

    );
  }
}

/** Require a document to be passed to this component. */
InterestItem.propTypes = {
  interest: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(InterestItem);