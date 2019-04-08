import _ from 'lodash';
import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { Container, Header, Card, Image } from 'semantic-ui-react';
// import { withTracker } from 'meteor/react-meteor-data';
/** import PropTypes from 'prop-types';
//import { Card } from 'semantic-ui-react/dist/commonjs/views/Card';
// import { Companies } from '../../api/company/company.js'; */


const jobData = [
  { position: 'Position Title', number: 1, interested: 0, views: 1, date: '2018/10/31', description: 'description' },
  { position: 'Test Title', number: 2, interested: 1, views: 12, date: '2019/12/25', description: 'long description' },

];

const companyData = [
  { name: 'CompanyOne', location: 'Hawaii', email: 'email.com', image: '/images/Logo.jpg', date: '2019/3/25' },
  { name: 'CompanyTwo', location: 'Hawaii', email: 'email.com', image: '/images/Logo.jpg', date: '2019/3/26' },
  { name: 'CompanyThree', location: 'Hawaii', email: 'email.com', image: '/images/Logo.jpg', date: '2019/3/27' },
  { name: 'CompanyFour', location: 'Hawaii', email: 'email.com', image: '/images/Logo.jpg', date: '2019/3/28' },
];

/** A simple static component to render some text for the landing page. */
class StudentHome extends React.Component {

  state = {
    column: null,
    data: jobData,
    direction: null,
  };

  handleSort = clickedColumn => () => {
    const { column, data } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });
    }

   // this.setState({
    //  data: data.reverse(),
    //  direction: direction === 'ascending' ? 'descending' : 'ascending',
   // });
  }

  render() {

    // const { column, data, direction } = this.state;

    return (
        <Container>
          <br/><br/>
          <Header as="h2" textAlign="center" inverted>Student Homepage</Header>

          <Container>
                <Card.Group centered>
                  {_.map(companyData, ({ name, location, email, image, date }) => (
                      <Card key={name}>
                        <Card.Content>
                          <Image src={image}/>
                          <Card.Header>
                            {name}
                          </Card.Header>
                          <Card.Meta>
                            {location}
                          </Card.Meta>
                          <Card.Description>
                            {email}
                          </Card.Description>
                          <Card.Description>
                            {date}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                  ))}
                </Card.Group>
          </Container>

        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
/** StudentHome.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
}; */

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default
/*
withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Companies');
  return {
    companies: Companies.find({}).fetch(),
    ready: subscription.ready(),
  };
})
*/(StudentHome);
