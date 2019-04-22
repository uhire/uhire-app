import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, CardGroup } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Students } from '/imports/api/stuff/student';
import StudentItem from '/imports/ui/components/StudentItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class StudentProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (

        <Container>
          <Header as="h2" textAlign="center" inverted>Student Profiles </Header>
          <CardGroup centered>
            {this.props.students.map((stuff) => <StudentItem key={stuff._id} student={stuff} />)}
          </CardGroup>
        </Container>

    );
  }
}

StudentProfile.propTypes = {
  students: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('StudentProfile');
  return {
    students: Students.find({}).fetch(),
    ready: subscription.ready(),
  };
})(StudentProfile);
