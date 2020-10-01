import React, { Component, Fragment } from 'react';

class Posts extends Component {
    state = {
    	posts: [],
    }

    componentDidMount() {
    	this.fetchPosts();
    }

    async fetchPosts() {
    	await fetch('https://herme-io.herokuapp.com/posts', {
    		headers: {
    			Authorization: localStorage.getItem('token'),
    		},
    	})
    		.then((response) => response.json())
    		.then((data) => {
    			this.setState({ posts: data });
    		})
    		.catch((error) => console.err(`Oops: \n${error}`));
    }

    render() {
    	const { posts } = this.state;

    	return (
    		<Fragment>
    			{posts.length
    				? posts
    				: <p> NO POSTS</p>}
    		</Fragment>
    	);
    }
}

export default Posts;
