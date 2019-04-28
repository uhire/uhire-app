// import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Positions } from '/imports/api/position/position.js';
import PositionItemProfile from '/imports/ui/components/PositionItemProfile';
import { Students } from '/imports/api/stuff/student';
import StudentDetails from '/imports/ui/components/StudentDetails';
import StudentHomeImage from '/imports/ui/components/StudentHomeImage';
import { Redirect } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class StudentHome extends React.Component {

  state = {
    column: null,
    data: null,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    if (this.props.students.length === 0) {
      return <Redirect to={'/addStudent'}/>;
    }
    if (this.state.data == null) {
      this.state.data = this.props.positions;
    }
    const { column, direction } = this.state;

    return (
        <Container>

          <br/>
          <br/>

          <Grid columns={3} centered verticalAlign='middle' textAlign='center'>

            <Grid.Column>
              {this.props.students.map((student, index) => <StudentHomeImage key={index} student={student}/>)}

            </Grid.Column>
            <Grid.Column width={9}>
              {this.props.students.map((student, index) => <StudentDetails key={index} student={student}/>)}

            </Grid.Column>

            <Grid.Column floated='right'>

            </Grid.Column>

          </Grid>

          <br/>
          <br/>
          <Header as='h1' inverted textAlign='center'>Available Positions</Header>
          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted={column === 'title' ? direction : null}
                                  onClick={this.handleSort('title')}>
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'location' ? direction : null}
                                  onClick={this.handleSort('location')}>
                  Location
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'openings' ? direction : null}
                                  onClick={this.handleSort('openings')}>
                  Openings
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'date' ? direction : null}
                                  onClick={this.handleSort('date')}>
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'description' ? direction : null}
                                  onClick={this.handleSort('description')}>
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell> Interests </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {console.log(this.state.data)}
              {console.log(this.props.students)}
              {console.log(this.props.positions)}

              {/** this.state.data.map((position) => <PositionItemProfile key={position._id} position={position}/>) **/}

            </Table.Body>
          </Table>

          <br/>
          <br/>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
StudentHome.propTypes = {
  positions: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subPositions = Meteor.subscribe('PositionStudent');
  const subStudents = Meteor.subscribe('SelfStudent');

  return {
    positions: Positions.find({}).fetch(),
    students: Students.find({}).fetch(),
    ready: subPositions.ready() && subStudents.ready(),
  };
})(StudentHome);
