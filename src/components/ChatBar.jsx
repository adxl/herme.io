import React, { Component, Fragment } from 'react';
import { MDBBtn } from 'mdbreact';

class ChatBar extends Component {
	state = {
		friends: [],
	}

	componentDidMount() {
		this.fetchFriends();
	}

	async fetchFriends() {
		await fetch('https://herme-io.herokuapp.com/friends', {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				this.setState({ friends: data });
			})
			.catch((error) => { throw error; });
	}

	render() {
		const { friends } = this.state;
		return (
			<Fragment>
				<div className="c-col">
					<h5>Friends :</h5>
					<ul>
						{friends.length > 0 && friends.map((f) => (
							<li key={f.username}>
								<div className="c-friend-div">
									<img className="c-friend-pic" src={`https://robohash.org/${f.username}`} alt="" />
									<p className="c-friend-name">{f.first_name} {f.last_name}</p>
								</div>
							</li>
						))}
						{!friends.length && <h5 className="no-f-r-msg">No friends yet</h5>}
					</ul>
				</div>
			</Fragment>
		);
	}
}

export default ChatBar;
