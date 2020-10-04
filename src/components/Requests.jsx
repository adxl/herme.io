import React, { Component, Fragment } from 'react';
import { MDBBtn } from 'mdbreact';

class Requests extends Component {
	state = {
		requests: [],
		searchUsername: '',
		searchedUserData: null,
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

		alert(`remove ${data.friend}`);
		// fetch('https://herme-io.herokuapp.com/requests/accept', options)
		// 	.then((response) => {
		// 		if (response.ok) {
		// 			this.setState({ searchedUserData: null });
		// 		}
		// 	})
		// 	.catch((error) => console.log(`caught:${error}`));
	}

	searchFriend = () => {
		const { searchUsername } = this.state;
		this.setState({ searchedUserData: null });

		fetch(`https://herme-io.herokuapp.com/users/${searchUsername}`, {
			headers: {
    			Authorization: localStorage.getItem('token'),
    		},
		})
			.then((response) => {
				if (!response.ok) { throw new Error(response.status); }
				return response.json();
			})
			.then((searchedUserData) => {
				console.log(searchedUserData);
				this.setState({ searchedUserData });
				this.setState({ searchUsername: '' });
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
    			console.log(data);
    			this.setState({ requests: data });
    		})
    		.catch((error) => console.warn(`Oops: \n${error}`));
	}

	render() {
		const { requests } = this.state;
		const { searchUsername } = this.state;
		const { searchedUserData } = this.state;
    	return (
    		<Fragment>
    			<h2>Your friend requests :</h2>
    			<ul>
					{requests.length > 0 && requests.map((r) => (
						<li key={r.usr}>
							<div>{r.usr}</div>
							<div>
								<span>
									<MDBBtn color="success" value={r.usr} rounded size="sm" className="mr-auto" onClick={this.acceptInvite}> Accept </MDBBtn>
								</span>
								<span>
									<MDBBtn color="danger" value={r.usr} rounded size="sm" className="mr-auto" onClick={this.denyInvite}> Deny </MDBBtn>
								</span>
							</div>
						</li>
					))}
    				{!requests.length && <p>No requests</p>}
    			</ul>
    			<hr />
    			<div>
    				<input className="form-control mr-sm-2" type="text" placeholder="Enter a username" value={searchUsername} onChange={this.handleInputChange} />
					<MDBBtn color="default" rounded size="sm" className="mr-auto" onClick={this.searchFriend}> Search </MDBBtn>
					{searchedUserData
						&& (
							<div>
								<span>
									{searchedUserData.userData.first_name} {searchedUserData.userData.last_name}
								</span>
								{ !searchedUserData.isFriend && !searchedUserData.isRequested && !searchedUserData.isInvited
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
										<MDBBtn color="grey" disabled rounded size="sm" className="mr-auto"> ✓ Requested </MDBBtn>
									</span>
								)}
								{ searchedUserData.isInvited
								&& (
									<span>
										<MDBBtn color="grey" disabled rounded size="sm" className="mr-auto"> Invited you </MDBBtn>
									</span>
								)}
							</div>
						)}
    			</div>
    		</Fragment>
    	);
	}
}

export default Requests;
