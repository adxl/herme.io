import React, { Component, Fragment } from 'react';
import Post from './Post';

class Feed extends Component {
    state = {
    	posts: [],
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
    			this.setState({ posts: data.reverse() });
    		})
    		.catch((error) => { throw error; });
    }

    render() {
    	const { posts } = this.state;

    	return (
    		<Fragment>
    				<ul>
    				{posts && posts.map((p) => (
    						<li key={p.id_post}>
    							<Post data={p} />
    						</li>
    					))}
    				</ul>
    			{posts.length <= 0 && (
    				<div>
    					<h2 className="no-p-msg"> Your home page seems to be empty </h2>
    					<p className="no-p-msg"> Try to add some <a href="/friends">friends</a> to see their posts</p>
    				</div>
    			)}
    		</Fragment>
    	);
    }
}

export default Feed;
