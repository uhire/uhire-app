import React from 'react';
import { Menu } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <Menu borderless fixed='bottom'>
          <Menu.Item>About</Menu.Item>
          <Menu.Item>Let me know what else...</Menu.Item>
        </Menu>
    );
  }
}

export default Footer;
