import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdbreact';
import Post from './Post';

class Posts extends Component {
    state = {
    	posts: [],
    	newPostContent: '',
    }

    componentDidMount() {
    	this.fetchPosts();
    }

	handleInputChange = (e) => {
		const { value } = e.target;
		this.setState({ newPostContent: value });
	}

	createPost = (e) => {
		const { newPostContent } = this.state;
		const data = {
			content: newPostContent,
		};
		const options = {
			method: 'POST',
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		fetch('https://herme-io.herokuapp.com/posts/', options)
			.then((response) => {
				if (response.ok) {
					this.setState({ newPostContent: '' });
					this.fetchPosts();
				}
			})
			.catch((error) => console.log(`caught:${error}`));
	}

	deletePost = (e) => {
		const { id } = e.target;
		const data = {
			id,
		};
		const options = {
			method: 'DELETE',
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		fetch('https://herme-io.herokuapp.com/posts/', options)
			.then((response) => {
				if (response.ok) {
					this.fetchPosts();
				}
			})
			.catch((error) => console.log(`caught:${error}`));
	}

	async fetchPosts() {
    	await fetch('https://herme-io.herokuapp.com/posts', {
    		headers: {
    			Authorization: localStorage.getItem('token'),
    		},
    	})
    		.then((response) => response.json())
			.then((data) => {
				console.log(data);
    			this.setState({ posts: data });
    		})
    		.catch((error) => console.err(`Oops: \n${error}`));
	}

	render() {
		const { posts } = this.state;
		const { newPostContent } = this.state;

    	return (
    		<Fragment>
    			<MDBContainer fluid>
    				<MDBInput label="Create a post" value={newPostContent} onChange={this.handleInputChange} />
    				<MDBBtn color="primary" onClick={this.createPost}>Post</MDBBtn>
    			</MDBContainer>
    			<br />
    			<MDBContainer fluid>
    				<h2>My posts : </h2>
					<br />
					<ul>
    				{posts && posts.map((p) => (
							<li key={p.id_post}>
								<Post data={p} />
								<MDBBtn id={p.id_post} color="danger" onClick={this.deletePost}>X</MDBBtn>
							</li>
						))}
					</ul>
    			</MDBContainer>
    		</Fragment>
    	);
	}
}

export default Posts;
