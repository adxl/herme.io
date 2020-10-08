import React, { Component, Fragment } from 'react';

class Post extends Component {
	state = { }

	render() {
		const { data } = this.props;
		console.log(data);
		return (
			<Fragment>
				<div className="post-header">
					<img className="author-pic" src={`https://robohash.org/${data.author}`} alt="" />
					<div className="author-name">
						<p>{data.author}</p>
						<p>@{data.author}</p>
					</div>
				</div>
				<br />
				<p>{data.content}</p>
			</Fragment>
		);
	}
}

export default Post;
