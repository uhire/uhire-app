import React from 'react';
import { Loader, Grid, Container, Image, Table } from 'semantic-ui-react';
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
import { Card } from 'semantic-ui-react/dist/commonjs/views/Card';
import { Redirect } from 'react-router-dom';

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
    if (this.props.companies.length === 0) {
      return <Redirect to={'/add'}/>;
    }

    const { column, direction } = this.state;
    console.log(this.props.visits);
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
              <Counter count={this.props.visits[0].visitCount}/>
            </Grid.Column>
          </Grid>


          <Table sortable celled fixed>
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
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Companies');
  const subscription2 = Meteor.subscribe('Position');
  const subscription3 = Meteor.subscribe('Visits');
  return {
    // companies: Companies.find({}, { sort: { _id: 1 }, limit: 1 }).fetch(),
    positions: Positions.find({}).fetch(),
    companies: Companies.find({}).fetch(),
    visits: Visits.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(CompanyProfilePage);
