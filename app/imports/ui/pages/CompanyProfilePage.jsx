import React from 'react';
import { Loader, Grid, Container, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import Company from '/imports/ui/components/Company';
import CompanyLogo from '/imports/ui/components/CompanyLogo';
import { Companies } from '/imports/api/company/company.js';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class CompanyProfilePage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Image src='images/Background4CD.jpg' className='company-profile-page-banner' centered />
          <br/>
          <Grid columns={2} divided>
            <Grid.Column width={12}>
              {this.props.companies.map((company, index) => <Company key={index} company={company}/>)}
            </Grid.Column>
            <Grid.Column width={3}>
              {this.props.companies.map((company, index) => <CompanyLogo key={index} company={company}/>)}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
CompanyProfilePage.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Companies');
  return {
    // companies: Companies.find({}, { sort: { _id: 1 }, limit: 1 }).fetch(),
    companies: Companies.find({}, { sort: { _id: -1 }, limit: 1 }).fetch(),
    ready: subscription.ready(),
  };
})(CompanyProfilePage);
