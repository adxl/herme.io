import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBNav, MDBNavLink } from 'mdbreact';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons';

import Feed from './Feed';
import Posts from './Posts';
import Friends from './Friends';

class Home extends Component {
	state = {
		user: null,
	}

	componentDidMount() {
		this.fetchUser();
	}

	logout = () => {
		localStorage.removeItem('token');
		window.location.replace(`${process.env.PUBLIC_URL}/login`);
	}

	hashColor = (str) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
		  hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
		return '00000'.substring(0, 6 - c.length) + c;
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
		const { pathname } = window.location;
		const page = pathname.substr(10) || 'home';
		const { user } = this.state;

		console.log(page);

		const firstNameInitial = user && (user.first_name.charAt(0) || 'X');
		const lastNameInitial = user && (user.last_name.charAt(0) || 'Y');
		// const lastNameInitial = user.last_name.charAt(0) || 'Y';

		return (
			<Fragment>
				<MDBNav className="justify-content-end top-nav">
					<MDBNavLink to="#" className="nav-link" onClick={this.logout}>Logout</MDBNavLink>
				</MDBNav>
				<div className="main">
					<div className="profile-col">
						<div className="profile-info">
							<div className="profile-pic">
								{user && <img src={`https://eu.ui-avatars.com/api/?size=500&color=fff&background=${this.hashColor(user.username)}&name=${firstNameInitial}+${lastNameInitial}`} alt="profile_pic" />}
							</div>
							<div className="profile-name">
								{user && `${user.first_name} ${user.last_name}`}
							</div>
						</div>
						<div className="profile-menu">
							<MDBNav className="flex-column profile-nav">
								<Link name="home" to="/home">
									<FontAwesomeIcon icon={faHome} />
									<span> Home</span>
								</Link>
								<Link name="posts" to="/posts">
									<FontAwesomeIcon icon={faUser} />
									<span> Posts</span>
								</Link>
								<Link name="friends" to="/friends">
									<FontAwesomeIcon icon={faUserFriends} />
									<span> Friends</span>
								</Link>
							</MDBNav>
						</div>
					</div>
					<div className="feed-col">
						{page === 'home' && <Feed /> }
						{page === 'posts' && <Posts /> }
						{page === 'friends' && <Friends />}
					</div>
				</div>

			</Fragment>
		);
	}
}

Home.propTypes = {
	location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
};

Home.defaultProps = {
	location: '/',
};

export default Home;
