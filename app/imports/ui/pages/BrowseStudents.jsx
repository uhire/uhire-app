import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Grid, Input, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Students } from '/imports/api/stuff/student.js';
import StudentItem from '/imports/ui/components/StudentItem';


/** A simple static component to render some text for the landing page. */
class BrowseStudents extends React.Component {
  render() {
    return (

        <Container>
          <Menu.Item position="right">
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <br/>
          <Grid centered columns={3} padded='vertically'>
            <Card.Group>
              {this.props.students.map((stuff) => <StudentItem key={stuff._id} student={stuff} />)}
            </Card.Group>
          </Grid>
          <br/>
        </Container>
    );
  }
}


/** Require an array of Stuff documents in the props. */
BrowseStudents.propTypes = {
  students: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subStudents = Meteor.subscribe('Student');

  return {
    students: Students.find({}).fetch(),
    ready: subStudents.ready(),
  };
})(BrowseStudents);
