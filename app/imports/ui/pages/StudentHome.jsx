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
    column: null,
    data: null,
    direction: null,
    positions: [],
    searchBy: 'interests',
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
        positions: [],
        searchBy: 'interests'
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
      positions: [],
      searchBy: 'interests'
    });
  }


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
    this.searchBy = [
      { key: 1, value: 'interests', text: 'Interests' },

    ];
    /* eslint-disable-next-line */
    for (const category of this.searchBy) {
      /* eslint-disable-next-line */
      const list = _.uniq(_.pluck(this.props.positions, category.value).flatten()).sort();
      this[category.value] = list.map((value, index) => ({ key: index, value: value, text: value }));
    }
  }

  returnPosition(positionId) {
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
    console.log(this.props.students);
    if (this.state.data == null) {
      this.setState({ data: this.props.positions });
    }
    console.log(this.props);
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
          <div>
            <Header as='h1' inverted textAlign='center'>Available Positions</Header>

            <Menu>
              <Dropdown selection defaultValue='interests' options={this.searchBy}
                        onChange={(e, data) => this.setSearchBy(e, data)}/>
              {this.state.searchBy === 'interests' ? (
                  <Dropdown placeholder='Search by Interests' fluid multiple search selection
                            options={this.interests} value={this.state.currentInterests} icon='search'
                            onChange={(event, data) => this.handleInterestChange(event, data)}
                  />
              ) : (
                  <Dropdown placeholder={`Search By ${this.state.searchBy}`} deburr fluid search selection
                            options={this[this.state.searchBy]} icon='search' allowAdditions additionLabel=''
                            onChange={(event, data) => this.handleGeneralChange(event, data, this.state.searchBy)}
                            onAddItem={(e, data) => this.handleAddition(e, data, this.state.searchBy)}
                  />
              )}
              <Button basic onClick={this.onClickClear}>Clear</Button>
            </Menu>

            <Table sortable celled selectable striped fixed>
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
                  <Table.HeaderCell width={5} sorted={column === 'description' ? direction : null}
                                    onClick={this.handleSort('description')}>
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
                        key={index} position={this.returnPosition(position._id)}/>))
                }

                {/** this.state.data.map((position) => <PositionItemProfile key={position._id} position={position}/>) **/}

              </Table.Body>
            </Table>

          </div>
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
