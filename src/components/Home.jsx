import React, { Component, Fragment } from 'react';

class Home extends Component {
	state = {
		user: null,
	}

	componentDidMount() {
		this.fetchUser();
	}

	logout = () => {
		localStorage.removeItem('token');
		window.location.replace('http://localhost:3000/login');
	}

	async fetchUser() {
		await fetch('https://herme-io.herokuapp.com/dash/', {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				this.setState({ user: data });
			})
			.catch((error) => console.log(`Oops: \n${error}`));
	}

	render() {
		const { user } = this.state;
		console.log(user);

		return (
			<Fragment>
				<div>
					{ user 	&&	(
						<div>
							<h1>Hello {user.first_name} {user.last_name}</h1>
						</div>
					)}
				</div>

			</Fragment>
		);
	}
}

export default Home;
