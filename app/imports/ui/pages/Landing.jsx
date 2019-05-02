import React from 'react';
import { Grid, Container, Image, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {

    const gridPadding = { paddingTop: '50px' };

    return (
        <div className=''>

          <Grid container compact stackable centered columns={3} className="middlecontent">
              <br/><br/>
              <Grid.Row className={gridPadding}>

              <Image src='/images/landing.png'/>
            </Grid.Row>
            <Grid.Column textAlign='center'>
              <Icon name="users" size='huge' inverted/>
              <Header as='h1' inverted>Multiple Users</Header>
              <Header as='h3' inverted>This application allows multiple companies and/or students to
                save their profiles. Students can view a listing of all the companies that are advertising
                positions.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon name="location arrow" size='huge' inverted/>
              <Header as='h1' inverted>Location Based Searches</Header>
              <Header as='h3' inverted>Students can customize queries based on desired employment locations.  Embedded
                map feature allows quick viewing of unfamiliar area.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon name="mail" size='huge' inverted/>
              <Header as='h1' inverted>Communication</Header>
              <Header as='h3' inverted>Companies and students can exchange information by way of email.</Header>
            </Grid.Column>
          </Grid>

          <Grid container compact stackable centered columns={3} className="middlecontent">
              <br/><br/>
              <Grid.Column textAlign='center'>
                <Icon name="briefcase" size='huge' inverted/>
                <Header as='h1' inverted>Companies</Header>
                <Header as='h3' inverted>Businesses can create profiles and build a position advertisement
                  as a way of finding the perfect match to qualified students.
                </Header>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <Icon name="graduation cap" size='huge' inverted/>
                <Header as='h1' inverted>Students</Header>
                <Header as='h3' inverted>Students can create profiles with interest topics and location queries
                  to help find the right job at the right location.</Header>
              </Grid.Column>
          <br/>
          <br/>
            </Grid>

          <Container textAlign='center'>
            <br/>
            <br/>
            <a className="ui massive inverted button" role="button" href="#/signup">Sign me up!</a>
            <br/><br/>
          </Container>
        </div>
    );
  }
}

export default Landing;
