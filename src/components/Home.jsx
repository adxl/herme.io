import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MDBNav, MDBNavItem, MDBNavLink, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Feed from './Feed';
import Posts from './Posts';
import Friends from './Friends';
import Requests from './Requests';

class Home extends Component {
	state = {
		user: null,
		currentPage: 'home',
	}

	componentDidMount() {
		this.fetchUser();
	}

	logout = () => {
		localStorage.removeItem('token');
		window.location.replace('/login');
	}

	changePage = (e) => {
		const { name } = e.target;
		this.setState({ currentPage: name });
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
		const { currentPage } = this.state;
		// console.log(user);

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
									{user && <img src={`https://robohash.org/${user.username}?set=set5`} alt="profile_pic" />}
								</MDBContainer>
								<MDBContainer className="profile-name">
									{user && `${user.first_name} ${user.last_name}`}
								</MDBContainer>
							</MDBContainer>
							<MDBContainer className="profile-menu">
								<MDBNav className="flex-column profile-nav">
									<MDBNavLink name="home" to="#" onClick={this.changePage}>Home</MDBNavLink>
									<MDBNavLink name="posts" to="#" onClick={this.changePage}>Posts</MDBNavLink>
									<MDBNavLink name="friends" to="#" onClick={this.changePage}>Friends</MDBNavLink>
								</MDBNav>
							</MDBContainer>
						</MDBCol>
						<MDBCol className="feed-col">
							{currentPage === 'home'
								&& (
									<MDBCol>
										<Feed />
									</MDBCol>
								)}
							{currentPage === 'posts'
								&& (
									<MDBCol>
										<Posts />
									</MDBCol>
								)}
							{currentPage === 'friends'
								&& (
									<MDBCol>
										<MDBRow>
											<MDBCol><Requests /></MDBCol>
											<MDBCol><Friends /></MDBCol>
										</MDBRow>
									</MDBCol>
								)}
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</Fragment>
		);
	}
}

export default Home;
