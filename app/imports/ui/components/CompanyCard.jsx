import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
// import { Companies } from '/imports/api/company/company';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyCard extends React.Component {


  render() {
    return (
        <Card>
          <Image src={this.props.company.image}/>


          <Card.Header>
            {this.props.company.companyName}

          </Card.Header>
          <Card.Meta>
            {this.props.company.location}

          </Card.Meta>
          <Card.Description>
            {this.props.company.description}

          </Card.Description>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CompanyCard);
