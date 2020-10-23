import React, { Component, Fragment } from 'react';
import { MDBBtn } from 'mdbreact';
import Requests from './Requests';

class Friends extends Component {
	state = {
		friends: [],
		newFriends: [],
	}

	componentDidMount() {
		this.fetchFriends();
		this.fetchNewFriends();
	}

	removeFriend = (e) => {
		const { value } = e.target;
		const data = {
			friend: value,
		};

		const options = {
			method: 'POST',
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		fetch('https://herme-io.herokuapp.com/friends/remove', options)
			.then((response) => {
				if (response.ok) {
					this.fetchFriends();
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

	async fetchNewFriends() {
		await fetch('https://herme-io.herokuapp.com/friends/find', {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				this.setState({ newFriends: data });
			})
			.catch((error) => { throw error; });
	}

	render() {
		const { friends } = this.state;
		const { newFriends } = this.state;
		return (
			<Fragment>
				<Requests />
				<div className="f-col">
					<h2>Your friends :</h2>
					<ul>
						{friends.length > 0 && friends.map((f) => (
							<li key={f.username}>
								<div className="friend-div">
									<img className="friend-pic" src={`https://eu.ui-avatars.com/api/?size=500&color=fff&background=${this.hashColor(f.username)}&name=${f.first_name}+${f.last_name}`} alt="" />
									<div className="friend-info">
										<p className="friend-fullname">{f.first_name} {f.last_name}</p>
										<p className="friend-username">@{f.username}</p>
									</div>
									<div className="friend-del-btn-div">
										<MDBBtn color="danger" value={f.username} rounded size="sm" className="mr-auto" onClick={this.removeFriend}> Unfriend </MDBBtn>
									</div>
								</div>
							</li>
						))}
						{!friends.length && <h5 className="no-f-r-msg">No friends yet</h5>}
					</ul>
					<hr />
					<br />
					<h4>People you may know :</h4>
					<ul>
						{newFriends.length > 0 && newFriends.map((f) => (
							<li key={f.username}>
								<div className="friend-div">
									<img className="friend-pic" src={`https://eu.ui-avatars.com/api/?size=500&color=fff&background=${this.hashColor(f.username)}&name=${f.first_name}+${f.last_name}`} alt="" />
									<div className="friend-info">
										<p className="friend-fullname">{f.first_name} {f.last_name}</p>
										<p className="friend-username">@{f.username}</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</Fragment>
		);
	}
}

export default Friends;
