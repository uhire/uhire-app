import React from 'react';
import { Grid, Container, Image, Icon, Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="uhire-landing-background">
          <Grid>
            <Grid.Column width={9}>
                  <Container>
                    <Image centered src='images/Business2.jpg' size='big' />
                  </Container>
            </Grid.Column>

            <Grid.Column width={5}>
                  <Container textAlign='center'>
                    <div className="landing-font">Businesses now have a
                      centralized location to advertise positions to potential employees.<br/>
                      UHire is a new way for local and non-local companies
                      to recruit students from the University of Hawaii, to make their (potential)
                      opportunities known to students.</div><br/>
                  </Container>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={2}>
            </Grid.Column>
          <Grid.Column width={5}>
            <Container textAlign='center'>
              <div className="landing-font">Students that want to learn about internships
                and job opportunities no longer have to wait until a company decides to
                visit the campus or send out some sort of announcement.<br/>
                UHire allows students to create profiles with their interests which can
                be matched with employers.</div><br/>
            </Container>
          </Grid.Column>

          <Grid.Column width={9}>
            <Container>
              <Image centered src='images/Students.jpg' size='big' />
            </Container>
          </Grid.Column>
        </Grid>

          <Grid container centered stackable columns={3}>

            <Grid.Column textAlign='center'>
              <Icon name="users" size='huge' inverted/>
              <Header as='h1' inverted>Multiple Users</Header>
              <Header as='h3' inverted>This application allows multiple companies and/or students to
                save their profiles.  Students can view a listing of all the companies that are advertising
                positions.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon name="location arrow" size='huge' inverted/>
              <Header as='h1' inverted>Location Based Searches</Header>
              <Header as='h3' inverted>Students can customize queries based on desired employment locations.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon name="mail" size='huge' inverted/>
              <Header as='h1' inverted>Communication</Header>
              <Header as='h3' inverted>Companies and students can exchange information by way of email.</Header>
            </Grid.Column>
          </Grid>

          <Container textAlign='center'>
            <a className="ui massive inverted button" role="button" href="#/signup">Sign me up!</a>
          </Container>

        </div>
    );
  }
}

export default Landing;
