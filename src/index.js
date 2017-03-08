// Import needed things that we installed with npm
import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDKp8C_etWALRAUrXg5BE7nszkKWWilkto';


// Create a new Component
class App extends Component {
  constructor(probs){
    super(probs);

    this.state= {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch(' ');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
 }


  render() {
    const videoSearch = _.debounce((term) =>{ this.videoSearch(term) }, 300);
  return (
    <div>
  <SearchBar onSearchTermChange={videoSearch}/>
  <VideoDetail video={this.state.selectedVideo}/>
  <VideoList
  onVideoSelect={selectedVideo => this.setState({selectedVideo})}
  videos={this.state.videos} />
  </div>
);
}
}

// Send this to the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
