import React from 'react';
import { Grid, Container, Image, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="uhire-landing-background">
          <br/>
          <br/>
          <Grid>
            <Grid.Column width={9}>
              <Container>
                <Image centered src='images/Business2.jpg' size='big' rounded/>
              </Container>
            </Grid.Column>

            <Grid.Column width={5}>
              <Container textAlign='center'>
                <div className="landing-font">Businesses can create profiles and build a position advertisement
                  as a way of finding the perfect match to qualified students.
                </div>
                <br/>
              </Container>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={2}>
            </Grid.Column>
            <Grid.Column width={5}>
              <Container textAlign='center'>
                <div className="landing-font">Students can create a profile with interest topics and location queries
                  to help find the right job at the right location.
                </div>
                <br/>
              </Container>
            </Grid.Column>

            <Grid.Column width={9}>
              <Container>
                <Image centered src='images/Students.jpg' size='big' rounded/>
              </Container>
            </Grid.Column>
          </Grid>

          <Grid container centered stackable columns={3}>

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
          <br/>
          <br/>
          <Container textAlign='center'>
            <a className="ui massive inverted button" role="button" href="#/signup">Sign me up!</a>
          </Container>

        </div>
    );
  }
}

export default Landing;
