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
				// const arr = data;
				// for (let i = 0; i < 12; i++) {
				// 	const u = {
				// 		username: i,
				// 		first_name: 'Bot',
				// 		last_name: 'Kabot',
				// 	};
				// 	arr.push(u);
				// }
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
									<img className="c-friend-pic" src={`https://eu.ui-avatars.com/api/?size=500&background=random&name=${f.first_name}+${f.last_name}`} alt="" />
									<p className="c-friend-name">{f.first_name} {f.last_name}</p>
								</div>
							</li>
						))}
						{!friends.length && (
							<div>
								<p className="no-f-r-msg">No friends yet, click <a href="/friends"> here </a> to add some.</p>
							</div>
						)}
					</ul>
				</div>
			</Fragment>
		);
	}
}

export default ChatBar;
