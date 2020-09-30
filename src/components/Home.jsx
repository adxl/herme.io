import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MDBNav, MDBNavItem, MDBNavLink, MDBContainer, MDBRow, MDBCol } from 'mdbreact';

class Home extends Component {
	state = {
		user: null,
	}

	componentDidMount() {
		this.fetchUser();
	}

	logout = () => {
		localStorage.removeItem('token');
		window.location.replace('/login');
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
			.catch((error) => console.warn(`Oops: \n${error}`));
	}

	render() {
		const { user } = this.state;

		return (
			<Fragment>
				<MDBNav className="justify-content-end top-nav">
					<MDBNavLink to="#" className="nav-link" onClick={this.logout}>Logout</MDBNavLink>
				</MDBNav>
				<MDBContainer fluid>
					<MDBRow>
						<MDBCol size="2" className="profile-col">
							<MDBContainer className="profile-info">
								<MDBContainer className="profile-pic">
									<img src="https://picsum.photos/1000" alt="profile_pic" />
								</MDBContainer>
								<MDBContainer className="profile-name">
									{user && `${user.first_name} ${user.last_name}`}
								</MDBContainer>
							</MDBContainer>
							<MDBContainer className="profile-menu">
								<MDBNav className="flex-column profile-nav">
									<MDBNavLink to="/home">Home</MDBNavLink>
									<MDBNavLink to="/posts">Posts</MDBNavLink>
									<MDBNavLink to="/friends">Friends</MDBNavLink>
								</MDBNav>
							</MDBContainer>
						</MDBCol>
						<MDBCol className="feed-col ">.col-md-4</MDBCol>
					</MDBRow>
				</MDBContainer>
			</Fragment>
		);
	}
}

export default Home;
