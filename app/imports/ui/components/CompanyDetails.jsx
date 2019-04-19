import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { Companies } from '/imports/api/company/company';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyDetails extends React.Component {


  render() {
    return (

        <List>
          <List.Item
              icon='building'
              content={this.props.company.companyName}
          />

          <List.Item
              icon='marker'
              content={this.props.company.location}
          />

          <List.Item
              icon='linkify'
              content={<a href={this.props.company.contact}>
                {this.props.company.contact}
              </a>}
          />

        </List>

    );
  }
}

/** Require a document to be passed to this component. */
CompanyDetails.propTypes = {
  company: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CompanyDetails);
