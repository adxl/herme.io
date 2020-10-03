import React, { Component, Fragment } from 'react';
import { MDBContainer } from 'mdbreact';

class Friends extends Component {
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
    				{friends && friends.map((f) => (
    					<li key={f.username}>{f.first_name} {f.last_name}</li>))}
    				{!friends.length && <p>No Friends</p>}
    			</ul>
    		</Fragment>
    	);
    }
}

export default Friends;
