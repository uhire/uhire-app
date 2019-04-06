import React from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Company extends React.Component {
  render() {
    return (
        <Segment.Group>
          <Segment>
            Company Name: <br/>
            {this.props.company.companyName}
          </Segment>
          <Segment>
            Location: <br/>
            {this.props.company.location}
          </Segment>
          <Segment>
            Description: <br/>
            {this.props.company.description}
          </Segment>
          <Segment>
            Contact Info: <br/>
            {this.props.company.contact}
          </Segment>
        </Segment.Group>
    );
  }
}

/** Require a document to be passed to this component. */
Company.propTypes = {
  company: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Company);
