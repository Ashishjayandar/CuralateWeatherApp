import React, { Component } from 'react';
import Search from './Search';
import Current from './Current';
import History from './History';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      page: props.page,
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ page: nextProps.page })
  }

  handleSearch(query) {
    this.setState({ query: this.getLocation(query), page: 'current' })
  }

  getLocation(query) {
    if (!query.coords) {
      console.log(`Geolocating ${query.query_string}!`)
      return 'geolocation';
    } else {
      console.log('Got a location!');
      return query;
    }
  }

  render(){
    const pageFinder = {
      'search': <Search handleSearch={this.handleSearch}/>,
      'current': <Current location={this.state.query} />,
      'history': <History location={this.state.query} />,
      'about': "I am about!",
    }
    return(
      <div>
        {pageFinder[this.state.page]}
      </div>
    );
  }
}

export default Content;
