import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
            <span>When you are done with the NavBar and Landing Page, let me know what should be down here.</span>
          </div>
        </footer>
    );
  }
}

export default Footer;
