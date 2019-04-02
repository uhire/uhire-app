import React from 'react';
import { Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class About extends React.Component {
  render() {
    return (

        <Container centered text>
          <br/><br/>
          <p>
            <h2>The problem:</h2> Many UH computer science and engineering students want to learn about internship and job opportunities, but currently they must wait until a company decides to visit the campus or send out some sort of announcement. There is no efficient way for students to understand the “landscape” of internship and job opportunities that might be available in the future, so they can prepare for them now.
          </p>
          <p>
            <h2>The solution</h2>: The Company Connector web application provides a new way for local and non-local companies who want to recruit students from UH to make their (potential) opportunities known to students. At the same time, students can create profiles on the site with their interests. The site can match students to employers and vice-versa.
          </p>
          <p>
            <h2>Approach</h2>
            Instead of sending out announcements each year, a company can create a page in the site that lists:
          </p>
          <p>
            A brief overview of the company.
            Geographic location of the company.
            A list of positions that they commonly recruit for from new UH graduates. Each position has a brief description, a set of skills, whether it’s an internship, permanent position, or both, how many people they would like to hire, and salary range.
            Links to pages for additional information.
            Contact email(s) for followup.
          </p>
          <p>
            Students who visit the site can create a profile with their interests (skills), preferred geographic location, and link to their professional portfolio page.
          </p>
          <p>
            Admins can monitor the site for inappropriate content, and create new categories of musical tastes, capabilities, and goals.
          </p>

        </Container>

    );
  }
}

export default About;
