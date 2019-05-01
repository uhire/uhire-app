import React from 'react';
import { Loader, Grid, Container, Image, Table, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import Company from '/imports/ui/components/Company';
import CompanyLogo from '/imports/ui/components/CompanyLogo';
import Counter from '/imports/ui/components/Counter';
import { Companies } from '/imports/api/company/company.js';
import { Positions } from '/imports/api/position/position.js';
import { Visits } from '/imports/api/visit/visit.js';
import PositionItemProfile from '/imports/ui/components/PositionItemProfile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Card } from 'semantic-ui-react/dist/commonjs/views/Card';
import { Roles } from 'meteor/alanning:roles';
import { Redirect } from 'react-router-dom';
import CompanyLocationMap from '/imports/ui/components/CompanyLocationMap';
/** Renders the Page for adding a document. */
class CompanyProfilePage extends React.Component {

  state = {
    column: null,
    data: null,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    if ((this.props.companies.length === 0) && (Roles.userIsInRole(Meteor.userId(), 'student'))) {
      return <Redirect to={'/add'}/>;
    }
    const { column, direction } = this.state;
    return (
        <Container>
          <Image src='images/Background4CD.jpg' className='company-profile-page-banner' centered/>
          <br/>
          <Grid columns={2} divided>
            <Grid.Column width={12}>
              {this.props.companies.map((company, index) => <Company key={index} company={company}/>)}
            </Grid.Column>
            <Grid.Column width={3}>
              {this.props.companies.map((company, index) => <CompanyLogo key={index} company={company}/>)}
              <br/>
              <div className="map-button">
              <CompanyLocationMap location={this.props.companies[0].location}/>
              </div>
              <br/>
              <Counter count={this.props.visits[0].visitCount}/>
            </Grid.Column>
          </Grid>

          <Header as='h1' inverted textAlign='center'>
            {`Available Positions at ${this.props.companies[0].companyName}`}</Header>
          <Table sortable celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted={column === 'title' ? direction : null}
                                  onClick={this.handleSort('title')}>
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'location' ? direction : null}
                                  onClick={this.handleSort('location')}>
                  Location
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'openings' ? direction : null}
                                  onClick={this.handleSort('openings')}>
                  Openings
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'date' ? direction : null}
                                  onClick={this.handleSort('date')}>
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'description' ? direction : null}
                                  onClick={this.handleSort('description')}>
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell>Interests</Table.HeaderCell>
                <Table.HeaderCell>Apply</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>

              {this.props.positions.map((position) => <PositionItemProfile key={position._id} position={position}/>)}

            </Table.Body>
          </Table>

        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
CompanyProfilePage.propTypes = {
  positions: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
  visits: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const documentId = match.params.companyName;

  const subscription = Meteor.subscribe('Companies');
  const subscription2 = Meteor.subscribe('Position');
  const subscription3 = Meteor.subscribe('Visits');
  const subscription4 = Meteor.subscribe('CompanyAdmin');
  const subscription5 = Meteor.subscribe('CompaniesStudent');
  const subscription6 = Meteor.subscribe('PositionStudent');
  return {
    positions: Positions.find({ companyName: documentId }).fetch(),
    companies: Companies.find({ companyName: documentId }).fetch(),
    visits: Visits.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready() && subscription.ready()
        && subscription4.ready() && subscription5.ready() && subscription6.ready(),
  };
})(CompanyProfilePage);
