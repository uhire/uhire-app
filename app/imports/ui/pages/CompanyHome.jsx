import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Container, Grid, Image, List, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Positions } from '../../api/position/position.js';
import PositionItem from '/imports/ui/components/PositionItem';
import { Companies } from '/imports/api/company/company.js';
import Company from '/imports/ui/components/Company';


const jobData = [
  { position: 'Position Title', number: 1, interested: 0, views: 1, date: '2018/10/31', description: 'description' },
  { position: 'Test Title', number: 2, interested: 1, views: 12, date: '2019/12/25', description: 'long description' },

];
const stuData = [
  { name: 'John', location: 'Hawaii', email: 'john@foo.com', image: '/images/Logo.jpg' },
  { name: 'Jay', location: 'Hawaii', email: 'john@foo.com', image: '/images/Logo.jpg' },
];


/** A simple static component to render some text for the landing page. */
class CompanyHome extends React.Component {

  state = {
    column: null,
    data: jobData,
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

    const { column, data, direction } = this.state;

    return (

        <Container>
          <br/><br/>
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

          <Table sortable celled unstackable fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine sorted={column === 'title' ? direction : null}
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
                <Table.HeaderCell singleLine sorted={column === 'description' ? direction : null}
                                  onClick={this.handleSort('description')}>
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell> Edit </Table.HeaderCell>
                <Table.HeaderCell> Delete </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.positions.map((position, index) => <PositionItem key={index} position={position} />)}

            </Table.Body>
          </Table>

          <br/>
          <br/>

          <Card.Group centered>
            {_.map(stuData, ({ name, location, email, image }) => (
                <Card key={name}>
                  <Image src={image}/>
                  <Card.Content>
                    <Card.Header>
                      {name}
                    </Card.Header>
                    <Card.Meta>
                      {location}
                    </Card.Meta>
                    <Card.Description>
                      {email}
                    </Card.Description>
                  </Card.Content>
                </Card>
            ))}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
CompanyHome.propTypes = {
  positions: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subPositions = Meteor.subscribe('Positions');
  const subCompanies = Meteor.subscribe('Companies');
  return {
    positions: Positions.find({}).fetch(),
    companies: Companies.find({}).fetch(),
    ready: subPositions.ready() && subCompanies.ready(),
  };
})(CompanyHome);
