// all js are automatically loaded

// import the react library
import React, { Component } from 'react'; // string matches the node_modules folder
import ReactDOM from 'react-dom';
import axios from 'axios';
import ImageList from './components/image_list';

// create a component
class App extends Component {
  constructor (props) {
    super(props);

    this.state = { images: [] };
  }
  componentWillMount () {
    // fantastic place to load data
    axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
      .then(response => this.setState({ images: response.data.data }));
  };

  render () {
    return (
      <div>
        <ImageList images={this.state.images} />
      </div>
    );
  }
};

// render this component
Meteor.startup(() => { // executes after meteor application loads and renders html
  ReactDOM.render(<App />, document.querySelector('.container'));
});
