import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Menu, Loader, Header, Dropdown, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Students } from '/imports/api/stuff/student.js';
import StudentItem from '/imports/ui/components/StudentItem';

/** A simple static component to render some text for the landing page. */
class BrowseStudents extends React.Component {

  state = {
    students: [],
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
      { key: 2, value: 'lastName', text: 'Last Name' },

    ];
    /* eslint-disable-next-line */
    for (const category of this.searchBy) {
      /* eslint-disable-next-line */
      const list = _.uniq(_.pluck(this.props.students, category.value).flatten()).sort();
      this[category.value] = list.map((value, index) => ({ key: index, value: value, text: value }));
    }
  }

  returnCompany(studentId) {
    return Students.findOne({ _id: studentId });
  }

  setSearchBy(event, data) {
    this.setState({ searchBy: data.value });
  }

  handleAddition(e, { value }, category) {
    const students = this.props.students.filter(
        (x) => (x[category].toUpperCase().indexOf(value.toUpperCase()) !== -1),
    );
    this.setState({ students: students });
  }

  handleGeneralChange(event, data, category) {
    const students = this.props.students.filter(
        (x) => (x[category].toUpperCase().indexOf(data.value.toUpperCase()) !== -1),
    );
    this.setState({ students: students });
  }

  handleInterestChange(event, data) {
    // eslint-disable-next-line
    const students = this.props.students.filter((x) => _.intersection(x.interests, data.value).length === data.value.length);
    this.setState({ students: students });
    this.setState({ currentInterests: data.value });
  }

  onClickClear() {
    this.setState({ students: [] });
    this.setState({ currentInterests: [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const cardPadding = { padding: '30px 0px 0px 0px' };
    const contentStyle = { marginBottom: '50px' };

    this.createOptions();

    return (
        <div style={contentStyle}>
          <Container>
            <Header as="h2" dividing textAlign="center" inverted>Student Directory</Header>
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

            <Card.Group centered style={cardPadding}>
              {this.state.students.length === 0 ? (
                  this.props.students.map((student, index) => <StudentItem key={index} student={student}/>)
              ) : (
                  this.state.students.map((student, index) => <StudentItem
                      key={index} student={this.returnCompany(student._id)}/>))
              }
            </Card.Group>
          </Container>
        </div>
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
    students: Students.find({}).fetch().sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }),
    ready: subStudents.ready(),
  };
})(BrowseStudents);
