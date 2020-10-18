import React, { Component, Fragment } from 'react';
import { MDBBtn } from 'mdbreact';

class Requests extends Component {
	state = {
		requests: [],
		searchUsername: '',
		searchedUserData: null,
		userNotFound: false,
	}

	componentDidMount() {
		this.fetchRequests();
	}

	handleInputChange = (e) => {
		const { value } = e.target;
		this.setState({ searchUsername: value });
	}

	sendRequest = () => {
		const { searchedUserData } = this.state;
		const data = {
			friend: searchedUserData.userData.username,
		};
		const options = {
			method: 'POST',
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		fetch('https://herme-io.herokuapp.com/requests/invite', options)
			.then((response) => {
				if (response.ok) {
					this.setState({ searchedUserData: null });
				}
			})
			.catch((error) => {
				throw error;
			});
	}

	cancelRequest = () => {
		const { searchedUserData } = this.state;
		const data = {
			friend: searchedUserData.userData.username,
		};
		const options = {
			method: 'POST',
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		fetch('https://herme-io.herokuapp.com/requests/cancel', options)
			.then((response) => {
				if (response.ok) {
					this.setState({ searchedUserData: null });
				}
			})
			.catch((error) => { throw error; });
	}

	acceptInvite = (e) => {
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

		fetch('https://herme-io.herokuapp.com/requests/accept', options)
			.then((response) => {
				if (response.ok) {
					this.fetchRequests();
					this.setState({ searchedUserData: null });
				}
			})
			.catch((error) => { throw error; });
	}

	denyInvite = (e) => {
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

		fetch('https://herme-io.herokuapp.com/requests/deny', options)
			.then((response) => {
				if (response.ok) {
					this.fetchRequests();
					this.setState({ searchedUserData: null });
				}
			})
			.catch((error) => { throw error; });
	}

	searchFriend = (e) => {
		const { value } = e.target;
		this.setState({ searchedUserData: null });
		this.setState({ searchUsername: value });

		fetch(`https://herme-io.herokuapp.com/users/${value}`, {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
			.then((response) => {
				if (response.status === 404) {
					this.setState({ userNotFound: true });
					return null;
				}
				if (!response.ok) { throw new Error(response.status); }
				return response.json();
			})
			.then((searchedUserData) => {
				if (searchedUserData) {
					this.setState({ searchedUserData });
					this.setState({ userNotFound: false });
				}
			})
			.catch((error) => {
				throw error;
			});
	}

	hashColor = (str) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
		  hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
		return '00000'.substring(0, 6 - c.length) + c;
	}

	async fetchRequests() {
		await fetch('https://herme-io.herokuapp.com/requests', {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				this.setState({ requests: data });
			})
			.catch((error) => { throw error; });
	}

	render() {
		const { requests } = this.state;
		const { searchUsername } = this.state;
		const { searchedUserData } = this.state;
		const { userNotFound } = this.state;

		return (
			<Fragment>
				<div className="r-col">
					<h2>Your friend requests :</h2>
					<ul>
						{requests.length > 0 && requests.map((r) => (
							<li key={r.usr}>
								<div className="r-div">
									<img className="r-pic" src={`https://eu.ui-avatars.com/api/?size=500&color=fff&background=${this.hashColor(r.usr)}&name=${r.usr}`} alt="" />
									<div className="r-info">
										{/* <p className="r-fullname">{r.first_name} {r.last_name}</p> */}
										<p className="r-username">@{r.usr}</p>
									</div>
									<div className="r-actions-div">
										<MDBBtn color="success" value={r.usr} rounded size="sm" className="mr-auto" onClick={this.acceptInvite}> Accept </MDBBtn>
										<MDBBtn color="danger" value={r.usr} rounded size="sm" className="mr-auto" onClick={this.denyInvite}> Deny </MDBBtn>
									</div>
								</div>
							</li>
						))}
						{!requests.length && <h5 className="no-f-r-msg">No requests for now</h5>}
					</ul>
					<hr />
					<br />
					<h4> Add friend :</h4>
					<div>
						<div className="f-search-div">
							<input className="form-control mr-sm-2 f-search-input" type="text" placeholder="Enter a username" value={searchUsername} onChange={this.searchFriend} />
							{/* <input className="form-control mr-sm-2 f-search-input" type="text" placeholder="Enter a username" value={searchUsername} onChange={this.handleInputChange} /> */}
							{/* <MDBBtn color="default" rounded size="sm" className="mr-auto f-search-btn" onClick={this.searchFriend}> Search </MDBBtn> */}
						</div>
						{searchedUserData
						&& (
							<div className="f-search-result">
								{!searchedUserData.me
								&& (
									<div className="friend-div">
										<img className="friend-pic" src={`https://eu.ui-avatars.com/api/?size=500&color=fff&background=${this.hashColor(searchedUserData.userData.username)}&name=${searchedUserData.userData.first_name}+${searchedUserData.userData.last_name}`} alt="" />
										<div className="friend-info">
											<p className="friend-fullname">{searchedUserData.userData.first_name} {searchedUserData.userData.last_name}</p>
											<p className="friend-username">@{searchedUserData.userData.username}</p>
										</div>
										<div className="friend-del-btn-div">
											{ !searchedUserData.isFriend && !searchedUserData.isRequested && !searchedUserData.isInvited && !searchedUserData.me
								&& (
									<span>
										<MDBBtn color="success" rounded size="sm" className="mr-auto" onClick={this.sendRequest}> Add Friend </MDBBtn>
									</span>
								)}
											{ searchedUserData.isFriend
								&& (
									<span>
										<MDBBtn color="success" disabled rounded size="sm" className="mr-auto"> ✓ Friend </MDBBtn>
									</span>
								)}
											{ searchedUserData.isRequested
								&& (
									<span>
										<MDBBtn color="grey" rounded size="sm" className="mr-auto" onClick={this.cancelRequest}> ✓ Requested </MDBBtn>
									</span>
								)}
											{ searchedUserData.isInvited
								&& (
									<span>
										<MDBBtn color="success" value={searchedUserData.userData.username} rounded size="sm" className="mr-auto" onClick={this.acceptInvite}> Accept </MDBBtn>
									</span>
								)}
										</div>
									</div>
								)}

							</div>
						)}
						{ (userNotFound && searchUsername) && (
							<div className="f-search-result">
								<h5 className="no-f-r-msg">User not found</h5>
							</div>
						) }
						{ searchedUserData && searchedUserData.me && (
							<div className="f-search-result">
								<h5 className="no-f-r-msg">It seems that it&apos;s you :)</h5>
							</div>
						) }
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Requests;
