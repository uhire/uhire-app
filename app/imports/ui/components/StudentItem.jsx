import React from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import InterestItem from '/imports/ui/components/InterestItem';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentItem extends React.Component {
  render() {
    return (
        <a href={`mailto:${this.props.student.owner}`}>
        <Card>
          <Image src={this.props.student.picture} />
          <Card.Content>
            <Card.Header>{this.props.student.firstName} {this.props.student.lastName}</Card.Header>
            <Card.Meta>
              {this.props.student.grade}
            </Card.Meta>
            <Card.Description>{this.props.student.description}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Interests</Card.Header>
            <Card.Description>
              {this.props.student.interests.map((stuff, index) => <InterestItem key={index} interest={stuff} />)}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='home' />
            {this.props.student.city} {this.props.student.locationZip}
          </Card.Content>
        </Card></a>
    );
  }
}

/** Require a document to be passed to this component. */
StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudentItem);