// import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Dropdown, Grid, Header, Loader, Menu, Table } from 'semantic-ui-react';
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
    positions: [],
    searchBy: 'interests',
  };

  constructor(props) {
    super(props);
    this.handleInterestChange = this.handleInterestChange.bind(this);
    this.handleGeneralChange = this.handleGeneralChange.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.setSearchBy = this.setSearchBy.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
  }

  createOptions() {
    // this.searchBy = searchByList.map((value, index) => ({ key: index, value: value, text: value }));
    this.searchBy = [
      { key: 1, value: 'interests', text: 'Interests' },
      { key: 2, value: 'title', text: 'Title' },


    ];
    /* eslint-disable-next-line */
    for (const category of this.searchBy) {
      /* eslint-disable-next-line */
      const list = _.uniq(_.pluck(this.props.positions, category.value).flatten()).sort();
      this[category.value] = list.map((value, index) => ({ key: index, value: value, text: value }));
    }
  }

  returnCompany(positionId) {
    return Positions.findOne({ _id: positionId });
  }

  setSearchBy(event, data) {
    this.setState({ searchBy: data.value });
  }

  handleAddition(e, { value }, category) {
    const positions = this.props.positions.filter(
        (x) => (x[category].toUpperCase().indexOf(value.toUpperCase()) !== -1),
    );
    this.setState({ positions: positions });
  }

  handleGeneralChange(event, data, category) {
    const positions = this.props.positions.filter(
        (x) => (x[category].toUpperCase().indexOf(data.value.toUpperCase()) !== -1),
    );
    this.setState({ positions: positions });
  }


  handleInterestChange(event, data) {
    // eslint-disable-next-line
    const positions = this.props.positions.filter((x) => _.intersection(x.interests, data.value).length === data.value.length);
    this.setState({ positions: positions });
    this.setState({ currentInterests: data.value });
  }

  onClickClear() {
    this.setState({ positions: [] });
    this.setState({ currentInterests: [] });
  }


  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    if (this.props.students.length === 0) {
      return <Redirect to={'/addStudent'}/>;
    }
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
          <Menu>
            <Dropdown selection defaultValue='interests' options={this.searchBy}
                      onChange={(e, data) => this.setSearchBy(e, data)}/>
            <Dropdown placeholder='Search by Interests' fluid multiple search selection
                      options={this.interests} value={this.state.currentInterests} icon='search'
                      onChange={(event, data) => this.handleInterestChange(event, data)}
            />
            <Button basic onClick={this.onClickClear}>Clear</Button>
          </Menu>
          <Table sortable celled selectable striped fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Location
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Openings
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell width={5}>
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell width={3}> Interests </Table.HeaderCell>

              </Table.Row>
            </Table.Header>


            <Table.Body>
              {this.state.positions.length === 0 ? (
                  this.props.positions.map((position, index) => <PositionItemProfile key={index} position={position}/>)
              ) : (
                  this.state.positions.map((position, index) => <PositionItemProfile
                      key={index} position={this.returnCompany(position._id)}/>))
              }

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
    positions: Positions.find({}).fetch().sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }),
    students: Students.find({}).fetch(),
    ready: subPositions.ready() && subStudents.ready(),
  };
})(StudentHome);
