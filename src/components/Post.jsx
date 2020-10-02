import React, { Fragment } from 'react';

function Post(props) {
	// const { id_post } = props.data;
	const { data } = props;

    	return (
		<Fragment>
			<p>{data.content}</p>
    		<hr />
		</Fragment>
    	);
}

export default Post;
