// ArticleList component (i.e., the container for Articles)
  // - a stateless component

import React from 'react';
import {Grid} from 'react-bootstrap';
import ArticleEntry from './ArticleEntry.jsx';

function ArticleList(props) {

	return (
		<Grid className='article-list'>
			{props.articles.map((article) => (
				<ArticleEntry key={article.id} article={article} user={props.user} exportOptions={props.exportOptions} deleteIt={props.deleteIt} convertIt={props.convertIt} topStoryMode={props.topStoryMode} />
			))}
		</Grid>
	);
}

export default ArticleList;