import React from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import InterestItem from '/imports/ui/components/InterestItem';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentItem extends React.Component {
  render() {
    return (

        <Card>
          <a href={`https://${this.props.student.profile}`} target='_blank' rel='noreferrer noopener'>
            <Image src={this.props.student.picture}/>
          </a>
          <Card.Content>
            <Card.Header>{this.props.student.firstName} {this.props.student.lastName}      </Card.Header>
            <Card.Meta>
              <a href={`mailto: ${this.props.student.owner}`}>
                {this.props.student.owner}
              </a>
            </Card.Meta>
            <Card.Meta>
              {this.props.student.grade}
            </Card.Meta>
            <Card.Description>{this.props.student.description}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Interests</Card.Header>
            <Card.Description>
              {this.props.student.interests.map((stuff, index) => <InterestItem key={index} interest={stuff}/>)}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='home'/>
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
