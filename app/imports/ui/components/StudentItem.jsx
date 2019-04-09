import React from 'react';
import { Table, Container, Image, Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentItem extends React.Component {
  render() {
    return (

        <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
          <Card.Content>
            <Card.Header>{this.props.student.firstName} {this.props.student.lastName}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.student.grade}</span>
            </Card.Meta>
            <Card.Description>{this.props.student.description}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Interests</Card.Header>
            <Card.Description>{this.props.student.interests}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='home' />
            {this.props.student.city} {this.props.student.locationZip}
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudentItem);