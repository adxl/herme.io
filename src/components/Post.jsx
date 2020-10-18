import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBBtn } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComments } from '@fortawesome/free-regular-svg-icons';

class Post extends Component {
	state = {
		userData: null,
	}

	componentDidMount() {
		this.fetchAuthorData();
	}

	likePost = (e) => {
		let value = e.target.value || e.target.parentElement.value;
		value = value || e.target.parentElement.parentElement.value;
		const { fetchPosts } = this.props;

		const data = {
			postId: value,
		};

		const options = {
			method: 'POST',
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		fetch('https://herme-io.herokuapp.com/posts/like', options)
			.then((response) => {
				if (response.ok) {
					fetchPosts();
				}
			})
			.catch((error) => { throw error; });
	}

	hashColor = (str) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
		  hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
		return '00000'.substring(0, 6 - c.length) + c;
	}

	async fetchAuthorData() {
		const { data } = this.props;
		await fetch(`https://herme-io.herokuapp.com/users/${data.author}`, {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({ userData: responseData });
			})
			.catch((error) => { throw error; });
	}

	render() {
		const { data } = this.props;
		const { userData } = this.state;
		return (
			<Fragment>
				<div className="post-div">
					<div className="post-header">
						{ userData && <img className="author-pic" src={`https://eu.ui-avatars.com/api/?size=500&color=fff&background=${this.hashColor(data.author)}&name=${userData.userData.first_name}+${userData.userData.last_name}`} alt="" />}
						<div className="author-name">
							<p>{userData && userData.userData.first_name} {userData && userData.userData.last_name}</p>
							<p>@{data.author} - {data.date}</p>

						</div>
					</div>
					<br />
					<div className="content-div">
						<p>{data.content}</p>
					</div>
					<hr />
					<div className="react-div">
						<div className="like-div">
							<MDBBtn color="primary" value={data.id_post} onClick={this.likePost}>
								<FontAwesomeIcon value={data.id_post} icon={faThumbsUp} /> ({data.likes_count})
							</MDBBtn>
						</div>
						<div className="comment-div">
							<MDBBtn color="grey" disabled>
								<FontAwesomeIcon icon={faComments} /> (0)
							</MDBBtn>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

Post.propTypes = {
	data: PropTypes.shape({
		author: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		likes_count: PropTypes.number.isRequired,
	}),
};

Post.defaultProps = {
	data: '',
};

export default Post;
