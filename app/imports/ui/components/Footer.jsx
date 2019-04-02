import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <Menu borderless fixed='bottom'>
          <Menu.Item as={NavLink} activeClassName="active" exact to="/about" key='about'>About</Menu.Item>
          <Menu.Item>Let me know what else... or how else...</Menu.Item>
        </Menu>
    );
  }
}

export default Footer;
