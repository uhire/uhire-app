import React from 'react';
import { Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Company extends React.Component {
  render() {
    return (
        <div>
          <Image src={this.props.company.image} size='medium' floated='right'/>
          <Button>
            <Link to={'/add/'}>Add Company</Link>
          </Button>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
Company.propTypes = {
  company: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Company);
