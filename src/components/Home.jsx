import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBNav, MDBNavLink } from 'mdbreact';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons';

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
				<div className="main">
					<div className="profile-col">
						<div className="profile-info">
							<div className="profile-pic">
								{user && <img src={`https://robohash.org/${user.username}`} alt="profile_pic" />}
							</div>
							<div className="profile-name">
								{user && `${user.first_name} ${user.last_name}`}
							</div>
						</div>
						<div className="profile-menu">
							<MDBNav className="flex-column profile-nav">
								<MDBNavLink name="home" to="/home">
									<FontAwesomeIcon icon={faHome} />
									<span> Home</span>
								</MDBNavLink>
								<MDBNavLink name="posts" to="/posts">
									<FontAwesomeIcon icon={faUser} />
									<span> Posts</span>
								</MDBNavLink>
								<MDBNavLink name="friends" to="/friends">
									<FontAwesomeIcon icon={faUserFriends} />
									<span> Friends</span>
								</MDBNavLink>
							</MDBNav>
						</div>
					</div>
					<div className="feed-col">
						{page === 'home'
								&& (
									<div>
										<Feed />
									</div>
								)}
						{page === 'posts'
								&& (
									<div>
										<Posts />
									</div>
								)}
						{page === 'friends'
								&& (
									<div>
										<div><Requests /></div>
										<div><Friends /></div>
									</div>
								)}
					</div>
				</div>

			</Fragment>
		);
	}
}

Home.propTypes = {
	location: PropTypes.any,
};

export default Home;
