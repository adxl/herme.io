import React, { Component, Fragment } from 'react';
import { MDBBtn } from 'mdbreact';

class Requests extends Component {
	state = {
		requests: [],
		searchUsername: '',
		searchedUserData: null,
		userNotFound: false,
		userSelf: false,
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
			.catch((error) => console.log(`caught:${error}`));
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
			.catch((error) => console.log(`caught:${error}`));
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
			.catch((error) => console.log(`caught:${error}`));
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
			.catch((error) => console.log(`caught:${error}`));
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
				switch (response.status) {
				case 404:
					this.setState({ userNotFound: true });
					return null;
				case 400:
					this.setState({ userSelf: true });
					return null;
				default: break;
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
			.catch((error) => console.error(`Oops: \n${error}`));
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
			.catch((error) => console.warn(`Oops: \n${error}`));
	}

	render() {
		const { requests } = this.state;
		const { searchUsername } = this.state;
		const { searchedUserData } = this.state;
		const { userNotFound } = this.state;
		const { userSelf } = this.state;

		console.log(userNotFound);

		return (
			<Fragment>
				<h2>Your friend requests :</h2>
				<ul>
					{requests.length > 0 && requests.map((r) => (
						<li key={r.usr}>
							<div className="r-div">
								<img className="r-pic" src={`https://robohash.org/${r.usr}?set=set5`} alt="" />
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
					{!requests.length && <p>No requests</p>}
				</ul>
				<hr />
				<br />
				<h2> Add friend :</h2>
				<div>
					<div className="f-search-div">
						<input className="form-control mr-sm-2 f-search-input" type="text" placeholder="Enter a username" value={searchUsername} onChange={this.searchFriend} />
						{/* <input className="form-control mr-sm-2 f-search-input" type="text" placeholder="Enter a username" value={searchUsername} onChange={this.handleInputChange} /> */}
						{/* <MDBBtn color="default" rounded size="sm" className="mr-auto f-search-btn" onClick={this.searchFriend}> Search </MDBBtn> */}
					</div>
					{searchedUserData
						&& (
							<div>
								{!searchedUserData.me
								&& (
									<span>
										{searchedUserData.userData.first_name} {searchedUserData.userData.last_name}
									</span>
								)}
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
						)}
					{ (userNotFound && searchUsername) && <p>Not found</p> }
					{ searchedUserData && searchedUserData.me && <p>It seems that it&apos;s you :)</p> }
				</div>
			</Fragment>
		);
	}
}

export default Requests;
