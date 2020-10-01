import React, { Component, Fragment } from 'react';
import Post from './Post';

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
    				? posts.map((p) => <Post key={p.id_post} id={p.id_post} title={p.title} content={p.content} />)
    				: <p> NO POSTS</p>}
    		</Fragment>
    	);
    }
}

export default Posts;
