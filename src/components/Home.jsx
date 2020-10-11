import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBNav, MDBNavLink, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Feed from './Feed';
import Posts from './Posts';
import Friends from './Friends';
import Requests from './Requests';

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
			.catch((error) => { throw error; });
	}

	render() {
		const { location } = this.props;
		const page = location.pathname.substr(1);
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
									{user && <img src={`https://robohash.org/${user.username}`} alt="profile_pic" />}
								</MDBContainer>
								<MDBContainer className="profile-name">
									{user && `${user.first_name} ${user.last_name}`}
								</MDBContainer>
							</MDBContainer>
							<MDBContainer className="profile-menu">
								<MDBNav className="flex-column profile-nav">
									<MDBNavLink name="home" to="/home">Home</MDBNavLink>
									<MDBNavLink name="posts" to="/posts">Posts</MDBNavLink>
									<MDBNavLink name="friends" to="/friends">Friends</MDBNavLink>
								</MDBNav>
							</MDBContainer>
						</MDBCol>
						<MDBCol className="feed-col">
							{page === 'home'
								&& (
									<MDBCol>
										<Feed />
									</MDBCol>
								)}
							{page === 'posts'
								&& (
									<MDBCol>
										<Posts />
									</MDBCol>
								)}
							{page === 'friends'
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

Home.propTypes = {
	location: PropTypes.string.isRequired,
};

export default Home;
