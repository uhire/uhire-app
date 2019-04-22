import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Card, Dropdown, Grid, Header, Loader, Input, Menu, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Companies } from '/imports/api/company/company';
import CompanyCard from '/imports/ui/components/CompanyCard';


/** A simple static component to render some text for the landing page. */
class BrowseCompanies extends React.Component {

/**
  render() {
    return (

        <Container>
          <Menu.Item position="right">
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <br/>
          <Grid centered columns={3} padded='vertically'>

              {this.props.companies.map((company, index) => <CompanyCard key={index} company={company}/>)}
          </Grid>
          <br/>

        </Container>
    );
  }
}  * */


state = {
  companies: [],
  searchBy: 'interests',
  currentInterests: [],
};

  constructor(props) {
    super(props);
    this.handleInterestChange = this.handleInterestChange.bind(this);
    this.handleGeneralChange = this.handleGeneralChange.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.setSearchBy = this.setSearchBy.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
  }

  createOptions() {
    // this.searchBy = searchByList.map((value, index) => ({ key: index, value: value, text: value }));
    this.searchBy = [
      { key: 1, value: 'companyName', text: 'Name' },
    ];
    /* eslint-disable-next-line */
    for (const category of this.searchBy) {
      /* eslint-disable-next-line */
      const list = _.uniq(_.pluck(this.props.companies, category.value).flatten()).sort();
      this[category.value] = list.map((value, index) => ({ key: index, value: value, text: value }));
    }
  }

  returnCompany(companyId) {
    return Companies.findOne({ _id: companyId });
  }

  setSearchBy(event, data) {
    this.setState({ searchBy: data.value });
  }

  handleAddition(e, { value }, category) {
    const companies = this.props.companies.filter((x) => (x[category].toUpperCase().indexOf(value.toUpperCase()) !== -1));
    this.setState({ companies: companies });
  }

  handleGeneralChange(event, data, category) {
    const companies = this.props.companies.filter((x) => (x[category].toUpperCase().indexOf(data.value.toUpperCase()) !== -1));
    this.setState({ companies: companies });
  }

  handleInterestChange(event, data) {
    /* eslint-disable-next-line */
    const companies = this.props.companies.filter((x) => _.intersection(x.interests, data.value).length === data.value.length);
    this.setState({ companies: companies });
    this.setState({ currentInterests: data.value });
  }

  onClickClear() {
    this.setState({ companies: [] });
    this.setState({ currentInterests: [] });
  }


/** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
render() {
  return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
}

/** Render the page once subscriptions have been received. */
renderPage() {
  const cardPadding = { padding: '30px 0px 0px 0px' };
  const contentStyle = { marginBottom: '50px' };
  if (this.interests === undefined) {
    this.createOptions();
  }
  return (
      <div style={contentStyle}>
        <Container>
          <Header as="h2" dividing textAlign="center">Directory</Header>
          <Menu>
            <Dropdown selection defaultValue='interests' options={this.searchBy}
                      onChange={(e, data) => this.setSearchBy(e, data)}/>
            {this.state.searchBy === 'interests' ? (
                <Dropdown placeholder='Search by Company Name' fluid multiple search selection
                          options={this.interests} value={this.state.currentInterests} icon='search'
                          onChange={(event, data) => this.handleInterestChange(event, data)}
                />
            ) : (
                <Dropdown placeholder={`Search By ${this.state.searchBy}`} deburr fluid search selection
                          options={this[this.state.searchBy]} icon='search' allowAdditions additionLabel=''
                          onChange={(event, data) => this.handleGeneralChange(event, data, this.state.searchBy)}
                          onAddItem={(e, data) => this.handleAddition(e, data, this.state.searchBy)}
                />
            )}
            <Button basic onClick={this.onClickClear}>Clear</Button>
          </Menu>
          <Card.Group style={cardPadding}>
            {this.state.companies.length === 0 ? (
                this.props.companies.map((company, index) => <CompanyCard key={index} company={company}/>)
            ) : (
                this.state.companies.map((company, index) => <CompanyCard key={index} company={this.returnCompany(company._id)}/>))
            }
          </Card.Group>
        </Container>
      </div>
  );
}
}


/** Require an array of Stuff documents in the props. */
BrowseCompanies.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subCompanies = Meteor.subscribe('CompaniesStudent');
  const subAdmin = Meteor.subscribe('CompanyAdmin');

  return {
    companies: Companies.find({}).fetch().sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }),
    ready: subCompanies.ready() && subAdmin.ready(),
  };
})(BrowseCompanies);
