import React from 'react';
import { Grid, Loader, Header, Segment, Container, Card, CardGroup } from 'semantic-ui-react';
import { Positions, PositionSchema } from '/imports/api/position/position';
import { Bert } from 'meteor/themeteorchef:bert';
import { Redirect } from 'react-router-dom';
import { Students, StudentSchema } from '/imports/api/stuff/student';
import StudentItem from '/imports/ui/components/StudentItem';
import AutoForm from 'uniforms-semantic/AutoForm';
import AutoField from 'uniforms-semantic/AutoField';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class PositionHome extends React.Component {

  constructor(props) {
    super(props);
    // Added a redirectToReferer: false
    this.state = { redirectToReferer: false, options: Positions.find(), students: null, };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56

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
      console.log(students2);
      const applied2 = this.props.doc.applied;
      console.log(applied2);
      const students3 = [];
      applied2.forEach(function (element) {
        students3.push(students2.find(function(element2){
          return element2._id == element;
        }));
      });
      this.state.students = students3;
    }

  return(

      <div className="page-filler">
        <Container>
        <Header as="h2" textAlign="center" inverted>Student Profiles </Header>
          <CardGroup centered>

            {this.state.students.map((stuff) => <a href={`mailto: ${stuff.owner}`}><StudentItem key={stuff._id} student={stuff}/></a>)}
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
  const sub2 = Meteor.subscribe('Students');
  return {
    doc: Positions.findOne(documentId),
    ready: subscription.ready(),
    students: Students.find({}).fetch(),
  };
})(PositionHome);
