import React, { Component, Fragment } from 'react';
import { MDBBtn } from 'mdbreact';

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
			.catch((error) => console.warn(`Oops: \n${error}`));
	}

	render() {
		const { data } = this.props;
		const { userData } = this.state;
		console.log(data);
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
							<MDBBtn color="white">Like ({data.likes_count}) </MDBBtn>
						</div>
						<div className="comment-div">
							<MDBBtn color="white">Comment</MDBBtn>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Post;
