import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Header, Modal } from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';

// const Balloon = () => <img alt="Picture of a balloon indicator" width="25" src='/images/meteor-logo.png'/>;
const Balloon = () => <img alt="Picture of a balloon indicator" width="25"
                           src='http://speedwaymiracletournament.com/Images/cmnh-logo-no-text.png'/>;

class CompanyLocationMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: '',
      lng: '',
    };
  }

  handleClick = () => {
    // Copy http in browser to see the json format
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=
    ${this.props.location}&key=AIzaSyBLEB26Wt06KyRxHQWL7Cuq_gH9ZV0I3dI`)
        .then(response => response.json())
        .then(data => this.setState({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        }));
  };

  static defaultProps = {
    center: {
      lat: 21.4634324,
      lng: -157.9391567,
    },
    zoom: 11,
  };

  render() {
    const { lat, lng } = this.state;
    const modalPadding = { padding: '10px 10px 10px 10px' };
    return (
        /** <Modal style={modalPadding} trigger={<button onClick={this.handleClick}>{this.props.location}</button>}> */
        <Modal style={modalPadding} trigger={
          <Header as='h1' textAlign='center'>
            <div className="ui medium inverted animated green button" tabIndex="8">
              <div className="visible content">Show on Map</div>
              <div className="hidden content">
                <i className="map marker alternate icon"> </i>
                <div onClick={this.handleClick}>
                </div>
              </div>
            </div>
          </Header>}>
          {/** <button onClick={this.handleClick}>Show On Map</button>}> */}
          <div style={{ height: '100vh', width: '100%' }}>
            {/** <button onClick={this.handleClick}>{this.props.location}</button> */}

            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBLEB26Wt06KyRxHQWL7Cuq_gH9ZV0I3dI' }}
                defaultCenter={{ lat: 21.4634324, lng: -157.9391567 }}
                defaultZoom={11}
            >
              <Balloon
                  lat={lat}
                  lng={lng}
                  text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </Modal>
    );
  }
}

CompanyLocationMap.propTypes = {
  location: PropTypes.string.isRequired,
};

export default CompanyLocationMap;
