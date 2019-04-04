import React from 'react';
import { Grid, Container, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="uhire-landing-background">
          <Grid>
            <Grid.Column width={9}>
                  <Container>
                    <Image centered src='images/Business2.jpg' size='big' fluid />
                  </Container>
            </Grid.Column>

            <Grid.Column width={5}>
                  <Container textAlign='center'>
                    <div className="landing-font">Businesses now have a
                      centralized location to advertise positions to potential employees.<br/>
                      UHire is a new way for local and non-local companies
                      to recruit students from UH to make their (potential)
                      opportunities known to students.</div><br/>
                  </Container>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={2}>
            </Grid.Column>
          <Grid.Column width={5}>
            <Container textAlign='center'>
              <div className="landing-font">Students that want to learn about internship
                and job opportunities no longer have to wait until a company decides to
                visit the campus or send out some sort of announcement.<br/>
                UHire allows students to create profiles with their interests which can
                be matched to employers.</div><br/>
            </Container>
          </Grid.Column>

          <Grid.Column width={9}>
            <Container>
              <Image centered src='images/Students.jpg' size='big' fluid />
            </Container>
          </Grid.Column>
        </Grid>
        </div>
    );
  }
}

export default Landing;
