import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Grid, Input, Menu, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Companies } from '/imports/api/company/company.js';
import CompanyCard from '/imports/ui/components/CompanyCard';


/** A simple static component to render some text for the landing page. */
class BrowseCompanies extends React.Component {


  render() {
    return (

        <Container>
          <Menu.Item position="right">
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <br/>
          <Grid centered columns={3} padded='vertically'>
            <Card.Group>
              {this.props.companies.map((company, index) => <CompanyCard key={index} company={company}/>)}
            </Card.Group>
          </Grid>
          <br/>

        </Container>
    );
  }
}


/** Require an array of Stuff documents in the props. */
BrowseCompanies.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subCompanies = Meteor.subscribe('CompaniesStudent');

  return {
    companies: Companies.find({}).fetch(),
    ready: subCompanies.ready(),
  };
})(BrowseCompanies);
