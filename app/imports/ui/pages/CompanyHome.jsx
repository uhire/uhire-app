import _ from 'lodash';
import React from 'react';
import { Card, Container, Grid, Image, List, Table } from 'semantic-ui-react';

const jobData = [
  { position: 'Position Title', number: 1, interested: 0, views: 1, date: '2018/10/31', description: 'description' },
  { position: 'Test Title', number: 2, interested: 1, views: 12, date: '2019/12/25', description: 'long description' },

];
const stuData = [
  { name: 'John', location: 'Hawaii', email: 'john@foo.com', image: '/images/meteor-logo.png' },
  { name: 'Jay', location: 'Hawaii', email: 'john@foo.com', image: '/images/meteor-logo.png' },
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
          <Grid columns={6} centered verticalAlign='middle' textAlign='center'>

            <Grid.Column>
              <Image
                  src='/images/meteor-logo.png'
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

            <Grid.Column>

            </Grid.Column>
            <Grid.Column>

            </Grid.Column>
            <Grid.Column>

            </Grid.Column>
            <Grid.Column>

            </Grid.Column>

          </Grid>

          <Table sortable celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine sorted={column === 'position' ? direction : null}
                                  onClick={this.handleSort('position')}>
                  Positions Listed
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'number' ? direction : null}
                                  onClick={this.handleSort('number')}>
                  Number of Openings</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'interested' ? direction : null}
                                  onClick={this.handleSort('interested')}>
                  Interested</Table.HeaderCell>
                <Table.HeaderCell singleLine sorted={column === 'date' ? direction : null}
                                  onClick={this.handleSort('date')}>
                  Date Open</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'description' ? direction : null}
                                  onClick={this.handleSort('description')}>
                  Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {_.map(data, ({ position, number, interested, views, date, description }) => (
                  <Table.Row key={position}>
                    <Table.Cell>{position}</Table.Cell>
                    <Table.Cell>{number}</Table.Cell>
                    <Table.Cell>{interested}</Table.Cell>
                    <Table.Cell>{views}</Table.Cell>
                    <Table.Cell>{date}</Table.Cell>
                    <Table.Cell>{description}</Table.Cell>
                  </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <br/><br/>
          <Container>
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
        </Container>
    );
  }
}
export default CompanyHome;
