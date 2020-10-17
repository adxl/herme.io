import React, { Component, Fragment } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Post from './Post';
import ChatBar from './ChatBar';

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

	createPost = () => {
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
			.catch((error) => { throw error; });
	}

	deletePost = (e) => {
		const id = e.target.id || e.target.parentElement.id;

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
			.catch((error) => { throw error; });
	}

	async fetchPosts() {
    	await fetch('https://herme-io.herokuapp.com/posts', {
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
		const { newPostContent } = this.state;
		const test = 'test here';

    	return (
    		<Fragment>
				<div className="posts-p-col">
					<div className="create-post-div">
						<MDBInput className="create-post-input" label="Create a post" outline value={newPostContent} onChange={this.handleInputChange} />
	    				<MDBBtn color="primary" className="create-post-btn" onClick={this.createPost}>Post</MDBBtn>
					</div>
					<ul>
    				{posts && posts.map((p) => (
							<li key={p.id_post} className="post-li">
								<Post data={p} fetchPosts={this.fetchPosts} />
								<MDBBtn id={p.id_post} color="danger" onClick={this.deletePost} className="del-post-btn">
									<FontAwesomeIcon id={p.id_post} icon={faTimes} />
								</MDBBtn>
							</li>
						))}
					</ul>
					{posts.length <= 0 && <h3 className="no-p-msg"> You currently have no posts.</h3>}
				</div>
				<div className="feed-f-col">
    				<ChatBar />
				</div>
    		</Fragment>
    	);
	}
}

export default Posts;
