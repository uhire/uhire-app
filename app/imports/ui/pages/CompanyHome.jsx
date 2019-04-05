import React from 'react';
import { Container, Grid, Header, Image, List, Table } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class CompanyHome extends React.Component {
  render() {
    return (
        <Container>
          <br/><br/>

          <Grid columns={6} centered verticalAlign='middle' textAlign='center'>

              <Grid.Column floated='left'>
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

            <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column>

          </Grid>
          <br/><br/>
          <Container>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Position Title</Table.HeaderCell>
                  <Table.HeaderCell>Number of Openings</Table.HeaderCell>
                  <Table.HeaderCell>Interested</Table.HeaderCell>
                  <Table.HeaderCell singleLine>Date Open</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

                <Table.Row>

                 <Table.Cell></Table.Cell>
                 <Table.Cell></Table.Cell>
                 <Table.Cell></Table.Cell>
                 <Table.Cell></Table.Cell>
                 <Table.Cell></Table.Cell>


                </Table.Row>

              </Table.Body>
            </Table>
          </Container>
          <br/><br/>
          <Container>

          </Container>

        </Container>

    );
  }
}

export default CompanyHome;
