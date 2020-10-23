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

	 handleSubmit = (e) => {
	 	e.preventDefault();

	 	const options = {
	 		method: 'POST',
	 		headers: { 'Content-Type': 'application/json' },
	 		body: JSON.stringify(this.state),
	 	};

		 // if (!response.ok) {
	 			// 	console.log(response);
	 			// 	throw new Error('FETCH ERROR');
	 			// }
	 	fetch('https://herme-io.herokuapp.com/login/', options)
			  .then((response) => {
				  if (response.ok) {
					  return response.text();
				  }
				  this.setState({ errorMessage: 'Wrong username and/or password' });
				  throw new Error('BAD REQUEST');
			  })
	 		.then((token) => {
	 				if (token) {
	 				console.log(token);
	 					localStorage.setItem('token', token);
	 					window.location.replace(`${process.env.PUBLIC_URL}/home`);
	 				}
	 		})
	 		.catch((error) => { console.log(error); });
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
	 							{errorMessage && <p className="mb-3 bad-login-register-msg">{errorMessage}</p> }
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
