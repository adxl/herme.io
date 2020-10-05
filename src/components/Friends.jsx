import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBBtn } from 'mdbreact';

class Friends extends Component {
    state = {
    	friends: [],
    }

    componentDidMount() {
    	this.fetchFriends();
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
			.catch((error) => console.log(`caught:${error}`));
	}

	async fetchFriends() {
    	await fetch('https://herme-io.herokuapp.com/friends', {
    		headers: {
    			Authorization: localStorage.getItem('token'),
    		},
    	})
    		.then((response) => response.json())
    		.then((data) => {
    			console.log(data);
    			this.setState({ friends: data });
    		})
    		.catch((error) => console.warn(`Oops: \n${error}`));
	}

	render() {
    	const { friends } = this.state;
    	return (
    		<Fragment>
    			<h2>Your friends :</h2>
    			<ul>
    				{friends.length > 0 && friends.map((f) => (
    					<li key={f.username}>
    						<div>
    							<span>{f.first_name} {f.last_name}</span>
    							<span>
    								<MDBBtn color="danger" value={f.username} rounded size="sm" className="mr-auto" onClick={this.removeFriend}> X </MDBBtn>
    							</span>
    						</div>
    					</li>
    				))}

    				{!friends.length && <p>No Friends</p>}
    			</ul>
    		</Fragment>
    	);
	}
}

export default Friends;
