// import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Positions } from '/imports/api/position/position.js';
import PositionItem from '/imports/ui/components/PositionItem';
import { Companies } from '/imports/api/company/company.js';
import CompanyDetails from '/imports/ui/components/CompanyDetails';
import CompanyHomeLogo from '/imports/ui/components/CompanyHomeLogo';
import { Students } from '/imports/api/stuff/student';
// import StudentItem from '/imports/ui/components/StudentItem';
import { Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** A simple static component to render some text for the landing page. */
class CompanyHome extends React.Component {

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

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    if ((this.props.companies.length === 0) && (Roles.userIsInRole(Meteor.userId(), 'company'))) {
      return <Redirect to={'/add'}/>;
    }
    console.log(this.props.companies);
    if (this.state.data == null) {
      this.state.data = this.props.positions;
    }
    console.log(this.props);
    const { column, direction } = this.state;
    return (
        <Container>

          <br/>
          <br/>

          <Grid columns={3} centered verticalAlign='middle' textAlign='center'>
            <Grid.Column>
              {this.props.companies.map((company, index) => <CompanyHomeLogo key={index} company={company}/>)}
            </Grid.Column>

            <Grid.Column width={8}>
              {this.props.companies.map((company, index) => <CompanyDetails key={index} company={company}/>)}
            </Grid.Column>

            {/** <Grid.Column floated='right'>
             <div className="ui massive inverted vertical animated button" tabIndex="5">
             <div className="visible content">Position</div>
             <div className="hidden content">
             <a href="#/addposition"> Add Position </a>
             </div>
             </div>
             </Grid.Column> */}
          </Grid>

          <br/>
          <br/>
          <Header as='h1' textAlign='center'>
            <div className="ui massive inverted vertical animated button" tabIndex="5">
              <div className="visible content">Your Positions</div>
              <div className="hidden content">
                <a href="#/addposition"> Add Position </a>
              </div>
            </div>
          </Header>

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
                <Table.HeaderCell> Interests </Table.HeaderCell>
                <Table.HeaderCell> Edit </Table.HeaderCell>
                <Table.HeaderCell> Delete </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>

              {this.state.data.map((position) => <PositionItem key={position._id} position={position}/>)}

            </Table.Body>
          </Table>

          <br/>
          <br/>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
CompanyHome.propTypes = {
  positions: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subPositions = Meteor.subscribe('Position');
  const subStudents = Meteor.subscribe('Student');
  const subCompanies = Meteor.subscribe('Companies');

  return {
    positions: Positions.find({}).fetch(),
    students: Students.find({}).fetch(),
    companies: Companies.find({}).fetch(),
    ready: subPositions.ready() && subStudents.ready() && subCompanies.ready(),
  };
})(CompanyHome);
