import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";

const renderLabel = label => ({
  color: 'blue',
  content: `Customized label - ${label.text}`,
  icon: 'check',
});

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class InterestForm extends React.Component {
  render() {
    return (
        <Form.Dropdown
            multiple
            selection
            fluid
            options={this.props.interests}
            placeholder='Choose an option'
            renderLabel={renderLabel}
        />
    );
  }
}

/** Require a document to be passed to this component. */
InterestForm.propTypes = {
  interests: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */

export default withRouter(InterestForm);
