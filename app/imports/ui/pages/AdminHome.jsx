import _ from 'lodash';
import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Table } from 'semantic-ui-react';
// import { withTracker } from 'meteor/react-meteor-data';
/** import PropTypes from 'prop-types';
// import { Companies } from '../../api/company/company.js'; */


const jobData = [
  { position: 'Position Title', number: 1, interested: 0, views: 1, date: '2018/10/31', description: 'description' },
  { position: 'Test Title', number: 2, interested: 1, views: 12, date: '2019/12/25', description: 'long description' },

];
const stuData = [
  { name: 'John', location: 'Hawaii', email: 'john@foo.com', image: '/images/meteor-logo.png', date: '2019/06/09' },
  { name: 'Jay', location: 'Hawaii', email: 'john@foo.com', image: '/images/meteor-logo.png', date: '2019/07/10' },
];

const companyData = [
  { name: 'CompanyOne', location: 'Hawaii', email: 'email.com', image: '/images/meteor-logo.png', date: '2019/3/25' },
];

/** A simple static component to render some text for the landing page. */
class AdminHome extends React.Component {

  state = {
    column: null,
    data: jobData,
    direction: null,
  };

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

    const { column, direction } = this.state;

    return (
        <Container>
          <br/><br/>
          <Header as="h2" textAlign="center" inverted>Admin Homepage</Header>

          <Grid columns={2} centered verticalAlign='middle' textAlign='center'>

            <Grid.Column>
              <Table sortable celled unstackable fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell singleLine sorted={column === 'name' ? direction : null}
                                      onClick={this.handleSort('name')}>
                      Company Name
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'location' ? direction : null}
                                      onClick={this.handleSort('location')}>
                      Location
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'email' ? direction : null}
                                      onClick={this.handleSort('email')}>
                      Email
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'date' ? direction : null}
                                      onClick={this.handleSort('date')}>
                      Date
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {_.map(stuData, ({ name, location, email, date }) => (
                      <Table.Row key={name}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{location}</Table.Cell>
                        <Table.Cell>{email}</Table.Cell>
                        <Table.Cell>{date}</Table.Cell>
                      </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>

          <Grid.Column>
          <Table sortable celled unstackable fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine sorted={column === 'companyName' ? direction : null}
                                  onClick={this.handleSort('companyName')}>
                  Company Name
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'location' ? direction : null}
                                  onClick={this.handleSort('location')}>
                  Location
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'email' ? direction : null}
                                  onClick={this.handleSort('email')}>
                  Email
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'date' ? direction : null}
                                  onClick={this.handleSort('date')}>
                  Date
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {_.map(companyData, ({ name, location, email, date }) => (
                  <Table.Row key={name}>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{location}</Table.Cell>
                    <Table.Cell>{email}</Table.Cell>
                    <Table.Cell>{date}</Table.Cell>
                  </Table.Row>
              ))}
            </Table.Body>
          </Table>

          </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
/** AdminHome.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
}; */

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default
/*
withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Companies');
  return {
    companies: Companies.find({}).fetch(),
    ready: subscription.ready(),
  };
})
*/(AdminHome);
