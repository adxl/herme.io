import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBBtn } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

class Post extends Component {
	state = {
		userData: null,
	}

	componentDidMount() {
		this.fetchAuthorData();
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
						<img className="author-pic" src={`https://robohash.org/${data.author}`} alt="" />
						<div className="author-name">
							<p>{userData && userData.userData.first_name} {userData && userData.userData.last_name}</p>
							<p>@{data.author}</p>
						</div>
					</div>
					<br />
					<div className="content-div">
						<p>{data.content}</p>
					</div>
					<hr />
					<div className="react-div">
						<div className="like-div">
							<MDBBtn color="primary">
								<FontAwesomeIcon icon={faThumbsUp} /> ({data.likes_count})
							</MDBBtn>
						</div>
						<div className="comment-div">
							<MDBBtn color="grey">
								<FontAwesomeIcon icon={faThumbsDown} /> (0)
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
