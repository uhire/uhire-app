import React from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Counter extends React.Component {
  // state = {
  //   count: 0,
  // }
  //
  // handleClick = () => {
  //   this.setState({ count: this.state.count + 1 });
  // }

  // <button onClick={this.handleClick}>{this.state.count}</button>

  render() {
    return (
        <div className='main_container'>
          <div className='container_inner'>
            <Container className='num_tiles' textAlign='center' fluid>{this.props.count}</Container>
          </div>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
Counter.propTypes = {
  count: PropTypes.number,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Counter);
