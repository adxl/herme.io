import React, { Component, Fragment } from 'react';
import { MDBContainer } from 'mdbreact';
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
    			<MDBContainer fluid>
    				<ul>
    				{posts && posts.map((p) => (
    						<li key={p.id_post}>
    							<Post data={p} />
    						</li>
    					))}
    				</ul>
    				{posts.length <= 0 && <p>No posts</p>}
    			</MDBContainer>
    		</Fragment>
    	);
    }
}

export default Feed;
