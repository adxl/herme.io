import React, { Fragment } from 'react';

function Post(props) {
	const { id } = props;
	const { title } = props;
	const { content } = props;

    	return (
		<Fragment>
			<p>{id}</p>
    			<h3>{title}</h3>
    			<p>{content}</p>
    			<hr />
		</Fragment>
    	);
}

export default Post;
