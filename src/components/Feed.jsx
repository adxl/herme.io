import React, { Component, Fragment } from 'react';
import Post from './Post';
import ChatBar from './ChatBar';

class Feed extends Component {
	// state = {
	// 	posts: [],
	// }

	constructor() {
		super();

		this.state = {
    		posts: [],
		};

		this.fetchPosts = this.fetchPosts.bind(this);
	}

	componentDidMount() {
    	this.fetchPosts();
	}

	async fetchPosts() {
    	await fetch('https://herme-io.herokuapp.com/posts/friends', {
    		headers: {
    			Authorization: localStorage.getItem('token'),
    		},
    	})
    		.then((response) => response.json())
			.then((data) => {
    			this.setState({ posts: data });
    		})
    		.catch((error) => { throw error; });
	}

	render() {
    	const { posts } = this.state;

    	return (
    		<Fragment>
    			<div className="feed-p-col">
    				<ul>
    				{posts && posts.map((p) => (
    						<li key={p.id_post}>
    							<Post data={p} fetchPosts={this.fetchPosts} />
    						</li>
    					))}
    				</ul>
    			{posts.length <= 0 && (
    				<div>
    					<h2 className="no-p-msg"> Your home page seems to be empty </h2>
    					<p className="no-p-msg"> Try to add some <a href={`${process.env.PUBLIC_URL}/friends`}>friends</a> to see their posts</p>
    				</div>
    			)}
    			</div>
    			<div className="feed-f-col">
    				<ChatBar />
    			</div>
    		</Fragment>
    	);
	}
}

export default Feed;
