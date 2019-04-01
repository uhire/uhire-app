import React from 'react';
//import { } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class About extends React.Component {
  render() {
    return (
<span>
  Project: Company Connector
  Overview
  The problem: Many UH computer science and engineering students want to learn about internship and job opportunities, but currently they must wait until a company decides to visit the campus or send out some sort of announcement. There is no efficient way for students to understand the “landscape” of internship and job opportunities that might be available in the future, so they can prepare for them now.

  The solution: The Company Connector web application provides a new way for local and non-local companies who want to recruit students from UH to make their (potential) opportunities known to students. At the same time, students can create profiles on the site with their interests. The site can match students to employers and vice-versa.

  Approach
  Instead of sending out announcements each year, a company can create a page in the site that lists:

  A brief overview of the company.
  Geographic location of the company.
  A list of positions that they commonly recruit for from new UH graduates. Each position has a brief description, a set of skills, whether it’s an internship, permanent position, or both, how many people they would like to hire, and salary range.
  Links to pages for additional information.
  Contact email(s) for followup.
  Students who visit the site can create a profile with their interests (skills), preferred geographic location, and link to their professional portfolio page.

  Admins can monitor the site for inappropriate content, and create new categories of musical tastes, capabilities, and goals.

  Note: if you choose this idea for your final project, you cannot name it “Company Connectro”. Come up with a different name for your final project.

  Some mockup pages include:

  Landing page
  Student home page.
  Company home page
  Admin home page
  Student profile page.
  Company profile page
  Browse companies and users by skill, geographic preference, etc.
  Use case ideas
  Whether or not the following bullet points list all pages or not, the completed use case should show an end-to-end scenario of using the system.

  New user goes to landing page, logs in, gets home page, sets up profile. (How do they learn how system works?)
  Admin goes to landing page, logs in, gets home page, edits site.
  User goes to landing page, logs in, finds companies with compatible interests, contacts them.
  Beyond the basics
  After implementing the basic functionality, here are ideas for more advanced features:

  Notifications via email and/or SMS.
</span>
    );
  }
}

export default About;
