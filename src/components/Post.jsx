import React, { Component, Fragment } from 'react';

class Post extends Component {
	state = { }

	render() {
		const { data } = this.props;
		return (
			<Fragment>
				<p>{data.content}</p>
			</Fragment>
		);
	}
}

export default Post;
