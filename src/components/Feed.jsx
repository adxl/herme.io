import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdbreact';
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
    			this.setState({ posts: data });
    		})
    		.catch((error) => console.err(`Oops: \n${error}`));
    }

    render() {
    	const { posts } = this.state;

    	return (
    		<Fragment>
    			<MDBContainer fluid>
    				<h2>Home : </h2>
    				<br />
    				<ul>
    				{posts && posts.map((p) => (
    						<li key={p.id_post}>
    							<Post data={p} />
    						</li>
    					))}
    				</ul>
    			</MDBContainer>
    		</Fragment>
    	);
    }
}

export default Feed;