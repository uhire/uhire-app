// import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, CardGroup, Container, Grid, Image, List, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Positions } from '../../api/position/position.js';
import PositionItem from '/imports/ui/components/PositionItem';
/*
import { Companies } from '/imports/api/company/company.js';
import Company from '/imports/ui/components/Company';
*/
import { Students } from '/imports/api/stuff/student';
import StudentItem from '/imports/ui/components/StudentItem';

/** A simple static component to render some text for the landing page. */
class CompanyHome extends React.Component {

/*
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
*/

/*
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
*/

  render() {

    // const { column, data, direction } = this.state;

    return (

        <Container>

          <br/>
          <br/>

          <Grid columns={5} centered verticalAlign='middle' textAlign='center'>

            <Grid.Column>
              <Image
                  src='/images/Logo.jpg'
                  as='a'
                  size='small'
                  href='http://localhost:3000/#/'
                  target='_blank'
              />
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Icon name='building'/>
                  <List.Content>Company Co.</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='marker'/>
                  <List.Content>City, State</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='world'/>
                  <List.Content as='a' href='http://localhost:3000/#/'>website.com</List.Content>
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column floated='right'>

             <Button color='red' as={NavLink} exact to="/addposition"
                      key='add' content='Add Position' icon='add' />

            </Grid.Column>

          </Grid>

          <br/>
          <br/>

          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell /* sorted={column === 'title' ? direction : null}
                                  onClick={this.handleSort('title')} */>
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell /* sorted={column === 'location' ? direction : null}
                                  onClick={this.handleSort('location')} */>
                  Location
                </Table.HeaderCell>
                <Table.HeaderCell /* sorted={column === 'openings' ? direction : null}
                                  onClick={this.handleSort('openings')} */>
                  Openings
                </Table.HeaderCell>
                <Table.HeaderCell /* sorted={column === 'date' ? direction : null}
                                  onClick={this.handleSort('date')} */>
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell /* sorted={column === 'description' ? direction : null}
                                  onClick={this.handleSort('description')} */>
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell> Edit </Table.HeaderCell>
                <Table.HeaderCell> Delete </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>

              {this.props.positions.map((position) => <PositionItem key={position._id} position={position} />)}

            </Table.Body>
          </Table>

          <br/>
          <br/>

          <CardGroup centered>
            {this.props.students.map((stuff) => <StudentItem key={stuff._id} student={stuff} />)}
          </CardGroup>

        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
CompanyHome.propTypes = {
  positions: PropTypes.array.isRequired,
  // companies: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subPositions = Meteor.subscribe('Positions');
  const subCompanies = Meteor.subscribe('Companies');
  const subStudents = Meteor.subscribe('Students');

  return {
    positions: Positions.find({}).fetch(),
    // companies: Companies.find({}).fetch(),
    students: Students.find({}).fetch(),
    ready: subPositions.ready() && subCompanies.ready() && subStudents.ready(),
  };
})(CompanyHome);
