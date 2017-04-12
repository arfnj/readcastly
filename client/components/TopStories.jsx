import React from 'react';
import Checkboxes from './Checkboxes.jsx'
import ArticleList from './ArticleList.jsx'
// import {Button, Col, FormControl, FormGroup, Checkbox} from 'react-bootstrap';

class TopStories extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="topStories">
        <Checkboxes getTopStories={this.props.getTopStories.bind(this)} />
        {this.props.headlines && <ArticleList articles={this.props.headlines} user={this.props.user} deleteIt={this.props.deleteIt.bind(this)} convertIt={this.props.convertIt.bind(this)} exportOptions={this.props.exportOptions} topStoryMode={this.props.topStoryMode}/>}
      </div>
    );
  }

}

export default TopStories;
