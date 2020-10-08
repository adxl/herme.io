import React, { Component, Fragment } from 'react';

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
				<div className="post-header">
					<img className="author-pic" src={`https://robohash.org/${data.author}`} alt="" />
					<div className="author-name">
						<p>{userData && userData.userData.first_name} {userData && userData.userData.last_name}</p>
						<p>@{data.author}</p>
					</div>
				</div>
				<br />
				<p>{data.content}</p>
			</Fragment>
		);
	}
}

export default Post;
