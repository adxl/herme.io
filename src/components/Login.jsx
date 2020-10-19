import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class Login extends Component {
	state = {
		username: '',
		password: '',
		errorMessage: '',
	}

	handleInputChange = (e) => {
		const { value } = e.target;
		if (e.target.name === 'username') {
			this.setState({ username: value });
		} else {
			this.setState({ password: value });
		}
	}

	 handleSubmit = async (e) => {
	 	e.preventDefault();

	 	const options = {
	 		method: 'POST',
	 		headers: { 'Content-Type': 'application/json' },
	 		body: JSON.stringify(this.state),
	 	};

	 	await fetch('https://herme-io.herokuapp.com/login/', options)
			  .then((response) => {
	 			if (response.ok) {
	 				return response.json();
	 			}
	 			return null;
			 })
	 		.then((data) => {
	 			if (data) {
	 				const { token } = data;
	 				if (token) {
	 					localStorage.setItem('token', token);
	 					window.location.replace('/home');
	 				}
	 			} else {
	 				this.setState({ errorMessage: 'Wrong username and/or password' });
				 }
	 		})
	 		.catch((error) => { throw error; });
	 }

	 render() {
	 	const { errorMessage } = this.state;
    	return (
    		<Fragment>
    			<MDBContainer>
    				<MDBRow>
    					<MDBCol md="6" className="form-main">
    						<form onSubmit={this.handleSubmit}>
    							<p className="h3 text-center mb-3">Herme.io</p>
	 							<p className="h4 text-center mb-4">Sign in</p>
	 							{errorMessage && <p className="mb-3 bad-login-msg">{errorMessage}</p> }
    							<input name="username" type="text" placeholder="Username" required id="defaultFormLoginEmailEx" className="form-control" onChange={this.handleInputChange} />
    							<br />
    							<input name="password" type="password" placeholder="Password" required id="defaultFormLoginPasswordEx" className="form-control" onChange={this.handleInputChange} />
    							<div className="text-center mt-4">
    								<MDBBtn color="indigo" type="submit">Login</MDBBtn>
    								<p className="mt-3">
                      Not a member?
    									<Link to="/register"> Register</Link>
    								</p>
    							</div>
    						</form>
    					</MDBCol>
    				</MDBRow>
    			</MDBContainer>
    		</Fragment>
    	);
	 }
}

export default Login;
