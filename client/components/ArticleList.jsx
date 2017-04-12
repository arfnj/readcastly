// ArticleList component (i.e., the container for Articles)
  // - a stateless component

import React from 'react';
import {Grid} from 'react-bootstrap';
import ArticleEntry from './ArticleEntry.jsx';

function ArticleList(props) {
  console.log(props);

  // let exportOptions = {
  //   voices : [
  //     {name: '--American English--'},
  //     {flag: 'us', name: 'Joanna'},
  //     {flag: 'us', name: 'Salli'},
  //     {flag: 'us', name: 'Kendra'},
  //     {flag: 'us', name: 'Kimberly'},
  //     {flag: 'us', name: 'Ivy'},
  //     {flag: 'us', name: 'Joey'},
  //     {flag: 'us', name: 'Justin'},
  //     {name: '--British English--'},
  //     {flag: 'uk', name: 'Amy'},
  //     {flag: 'uk', name: 'Emma'},
  //     {flag: 'uk', name: 'Brian'},
  //     {name: '--Australian English--'},
  //     {flag: 'au', name: 'Nicole'},
  //     {flag: 'uk', name: 'Russell'},
  //     {name: '--Indian English--'},
  //     {flag: 'in', name: 'Raveena'},
  //     {name: '--Welsh English--'},
  //     {flag: 'wa', name: 'Geraint'}
  //   ],
  //   methods : [
  //     {id: "stream", method: 'Stream It'},
  //     {id: "link", method: 'Link It'}
  //   ]
  // }

  // if (props.user.email) {
  //   exportOptions.methods.push({id: "email", method: 'Email It'});
  // }

  // if (props.user.phone) {
  //   exportOptions.methods.push({id: "phone", method: 'Text It'});
  // }

	return (
		<Grid className='article-list'>
			{props.articles.map((article) => (
				<ArticleEntry key={article.id} article={article} user={props.user} exportOptions={props.exportOptions} deleteIt={props.deleteIt} convertIt={props.convertIt} topStoryMode={props.topStoryMode} />
			))}
		</Grid>
	);
}

export default ArticleList;