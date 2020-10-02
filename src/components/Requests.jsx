import React, { Component, Fragment } from 'react';

class Requests extends Component {
    state = {
    	requests: [],
    }

    componentDidMount() {
    	this.fetchRequests();
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
    	return (
    		<Fragment>
    			<h2>Your friend requests :</h2>
    			<ul>
    				{requests && requests.map((r) => (
    					<li key={r.usr} />
    				))}
    			</ul>
    		</Fragment>
    	);
    }
}

export default Requests;
