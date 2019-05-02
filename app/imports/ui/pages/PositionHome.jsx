import React from 'react';
import { Loader, Header, Container, CardGroup } from 'semantic-ui-react';
import { Positions } from '/imports/api/position/position';
import { Redirect } from 'react-router-dom';
import { Students } from '/imports/api/stuff/student';
import StudentItem from '/imports/ui/components/StudentItem';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class PositionHome extends React.Component {

  constructor(props) {
    super(props);
    // Added a redirectToReferer: false
    this.state = { redirectToReferer: false, options: Positions.find(), students: null };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {

    if (this.state.redirectToReferer) {
      return <Redirect to='/cohome'/>;
    }
    if (this.state.students === null) {
      this.state.students = this.props.students;
      const students2 = this.state.students;
      const applied2 = this.props.doc.applied;
      const students3 = [];
      applied2.forEach(function (element) {
        students3.push(students2.find(function (element2) {
          return element2._id === element;
        }));
      });
      this.state.students = students3;
    }

    return (

        <div className="page-filler">
          <Container>
            <Header as="h2" textAlign="center" inverted>Profiles of applicants for
              the {this.props.doc.title} position</Header>
            <CardGroup centered>

              {this.state.students.map((stuff) => <StudentItem key={stuff._id}
                               student={stuff}/>)}
            </CardGroup>
          </Container>
        </div>
    );
  }
}

/** Require the presence of a Position document in the props object.
 * Uniforms adds 'model' to the props, which we use. */
PositionHome.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  students: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Position documents.
  const subscription = Meteor.subscribe('Position');
  return {
    doc: Positions.findOne(documentId),
    ready: subscription.ready(),
    students: Students.find({}).fetch(),
  };
})(PositionHome);
