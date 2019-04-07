import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <Container>
          <Menu inverted borderless fixed='bottom' color='grey'>
            <Menu.Item as={NavLink} exact to="/about" key='about'>About</Menu.Item>


            <Menu.Item position="right" href='https://github.com/uhire/uhire.github.io' target='_blank' >
              Source
            </Menu.Item>
          </Menu>
        </Container>
    );
  }
}

export default Footer;
