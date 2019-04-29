import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Companies } from '/imports/api/company/company.js';
import { Students } from '/imports/api/stuff/student';
import AdminCompanyItem from '/imports/ui/components/AdminCompanyItem';
import AdminStudentItem from '/imports/ui/components/AdminStudentItem';
import { Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';


/** A simple static component to render some text for the landing page. */
class AdminHome extends React.Component {


  render() {


    return (
        <Container>
          <br/><br/>
          <Header as="h2" textAlign="center" inverted>Admin Homepage</Header>

          <Grid columns={2} centered verticalAlign='middle' textAlign='center'>

            <Grid.Column>
              <Table sortable celled unstackable fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      Company Name
                    </Table.HeaderCell>
                    <Table.HeaderCell >
                      Location
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Email
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Delete
                    </Table.HeaderCell>

                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.companies.map((company, index) => <AdminCompanyItem key={index} company={company}/>)}
                </Table.Body>
              </Table>
            </Grid.Column>

          <Grid.Column>
          <Table sortable celled unstackable fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Student Name
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Location
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Email
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Delete
                </Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.students.map((student, index) => <AdminStudentItem key={index} student={student}/>)}
            </Table.Body>
          </Table>

          </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AdminHome.propTypes = {
  positions: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subStudents = Meteor.subscribe('StudentAdmin');
  const subCompanies = Meteor.subscribe('CompanyAdmin');

  return {
    students: Students.find({}).fetch(),
    companies: Companies.find({}).fetch(),
    ready: subStudents.ready() && subCompanies.ready(),
  };
})(AdminHome);
