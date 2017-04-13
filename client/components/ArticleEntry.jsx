// ArticleEntry component (i.e., indiv. Article Entry)
  // - stateful component

import React from 'react';
import {Button, Col, FormControl, FormGroup, Row} from 'react-bootstrap';

class ArticleEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {method: '', voice: this.props.user.voice_pref};
	};

	makeVoiceMenu(voices) {
		return(
			<div className="voice-chooser">
				<FormGroup controlId="voiceSelect">
	      	<FormControl componentClass="select" value={this.state.voice} onChange={this.handleVoiceChange.bind(this)} placeholder="banana">
	      	<option value="Joanna">Voice Choice</option>
	      	{voices.map((voice,i) => {
	      		return voice.flag ? (<option key={i} value={voice.name} >{voice.name}</option>) :
	      			(<option key={i} disabled="disabled" >{voice.name}</option>)
	      		})}
	      	</FormControl>
	    	</FormGroup>
			</div>
		);
	}

	handleVoiceChange(voice) {
		this.setState({voice: voice.target.value}, () => console.log(this.state));
	}

	voiceMenu() {return (this.makeVoiceMenu(this.props.exportOptions.voices));}

	makeExportMenu(methods) {
		return(
			<div className="conversion-chooser">
				<FormGroup controlId="conversionSelect">
	      	<FormControl componentClass="select" value={this.state.method} onChange={this.handleMethodChange.bind(this)} placeholder="banana">
	      	<option value="stream">Delivery Method</option>
	      	{methods.map((option,i) => (
						<option key={i} value={option.id} >{option.method}</option>
					))}
	      	</FormControl>
	    	</FormGroup>
			</div>
		);
	}

	handleMethodChange(method) {
		this.setState({method: method.target.value}, () => console.log(this.state));
	}

	exportMenu() {return (this.makeExportMenu(this.props.exportOptions.methods));};

	showInfo() {console.log('article:', this.props.article);};

	export() {
		if (!this.state.method || !this.state.voice) {
			alert('Please be sure to choose both a voice and a delivery method!');
		} else {
			let articleObj = {
				method: this.state.method,
				voice: this.state.voice,
				article: this.props.article
			};
			this.props.convertIt(articleObj);
		}
	}

	render() {
		return (
			<Row>
				<Col md={12} className="list-group-item article-entry">
					<Col md={3} className="articleImage">
						{this.props.article.image && <img className="article-sampleImage img-responsive img-rounded center-block" src={this.props.article.image} />}
					</Col>
					<Col md={7} className="article-info">
		  			{this.props.article.title && <div className="article-title"><span><a href={this.props.article.url}><b>{this.props.article.title}</b></a></span></div>}
		  			{this.props.article.author && <div className="article-author"><span>{this.props.article.author}</span></div>}
		  			{this.props.article.publication_date && <div className="article-publishDate"><span>{this.props.article.publication_date}</span></div>}
		  			{this.props.article.source_name && <div className="article-source"><span><i>{this.props.article.source_name}</i></span></div>}
		  			{this.props.article.excerpt && <div className="article-excerpt"><span>Excerpt: </span><span>{this.props.article.excerpt}</span></div>}
		  			{!this.props.topStoryMode && <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.props.deleteIt(this.props.article.url)}>Remove From Library</Button>}
		  			{this.props.topStoryMode && <Button bsStyle="warning" bsSize="xsmall" onClick={() => this.props.deleteIt(this.props.article.url)}>Add to Library</Button>}
		  		</Col>
		  	<Col md={2}>
		  		<div className="article-buttons">
						{this.props.article && this.voiceMenu()}
						{this.props.article && this.exportMenu()}
						{this.props.article && <Button bsStyle="success" onClick={this.export.bind(this)} block>Read To Me!<br /><i>Est. Time: {this.props.article.est_time}</i></Button>}
					</div>
					</Col>
		  	</Col>
		  </Row>
		);
	}
};

export default ArticleEntry;


// function ArticleEntry({article, deleteIt, convertIt}) {
// 	const articleText = article.text;

// 	// ShowInfo component shows body of parsed article text when 'More Info' button is clicked (only console.logs for now)
// 	function ShowInfo() {
// 		console.log('article: ', article);
// 		// console.log(articleText);
// 	}

// 	function Export(voiceSelectValue,conversionSelectValue) {
// 		//make object with arguments and article attributes and invoke convertIt;
// 		let articleObj = {
// 			method: conversionSelect.value,
// 			voice: voiceSelect.value,
// 			article: article
// 		};
// 		convertIt(articleObj);
// 	}

//   // removed time -- to add it back, just append this =>  + ' @ ' + entry.slice(11,16)
// 	function cleanTime(entry) {
// 		return !entry ? 'N/A' : (entry.slice(5,7) + '/' + entry.slice(8,10) + '/' + entry.slice(0,4));
//   }

// 	return (
// 	  <Col md={8} mdOffset={2} className="list-group-item article-entry">
// 	  	{article.title && <div className="article-title"><span>Title: </span><span><a href={article.url}>{article.title}</a></span></div>}
// 	  	{article.author && <div className="article-author"><span>Author: </span><span>{article.author}</span></div>}
// 	  	{article.publication_date && <div className="article-publishDate"><span>Date: </span><span>{cleanTime(article.publication_date)}</span></div>}
// 	  	{article.source_name && <div className="article-source"><span>Source: </span><span>{article.source_name}</span></div>}
// 	  	{article.image && <img className="article-sampleImage" src={article.image} height="42" />}
// 	  	{article.excerpt && <div className="article-excerpt"><span>Excerpt: </span><span>{article.excerpt}</span></div>}
// 			{article.title && voiceMenu}
// 			{article.title && exportMenu}
// 			{article.title && <Button bsStyle="primary" onClick={ShowInfo}>Read to Me</Button>}
// 			{article.title && <Button bsStyle="danger" onClick={() => deleteIt(article.url)}>Remove From Library</Button>}
// 	  	{/*article.title &&<hr/>*/}
// 	  </Col>
// 	);

// // {article.title && <Button bsStyle="primary" onClick={Export}>Read to Me</Button>}

// 	// return (
// 	//   <div className="article-entry">
// 	//   	<div className="article-title"><span>Title: </span><span><a href={article.url}>{article.title}</a></span></div>
// 	//   	<div className="article-author"><span>Author: </span><span>{article.author || 'N/A'}</span></div>
// 	//   	<div className="article-publishDate"><span>Date: </span><span>{cleanTime(article.publication_date)}</span></div>
// 	//   	<div className="article-source"><span>Source: </span><span>{article.source_name || 'Confidential'}</span></div>
// 	//   	<img className="article-sampleImage" src={article.image} height="42" />
// 	//   	<div className="article-excerpt"><span>Excerpt: </span><span>{article.excerpt}</span></div>
// 	// 		<button onClick={ShowInfo}>More Infooooo</button>
// 	// 		<button onClick={() => deleteIt(article.url)}>Delete</button>
// 	//   	<hr/>
// 	//   </div>
// 	// );
// }
