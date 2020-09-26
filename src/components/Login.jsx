import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class Login extends Component {
	state = {
		username: '',
		password: '',
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
			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(this.state),
			};

			// https://herme-io.herokuapp.com/login/

			e.preventDefault();
			fetch('https://herme-io.herokuapp.com/login/', options)
				.then((response) => response.json())
				.then((data) => {
					const { token } = data;
					if (token) {
						// localStorage.setItem('token', token);
						window.location.replace('http://localhost:3000/');
					}
				})
				.catch((error) => console.log(`caught:${error}`));
		};

		render() {
    	return (
    		<Fragment>
    			<MDBContainer>
    				<MDBRow>
    					<MDBCol md="6" className="form-main">
    						<form onSubmit={this.handleSubmit}>
    							<p className="h3 text-center mb-3">Herme.io</p>
    							<p className="h4 text-center mb-4">Sign in</p>
    							<input name="username" type="text" placeholder="Username" id="defaultFormLoginEmailEx" className="form-control" onChange={this.handleInputChange} />
    							<br />
    							<input name="password" type="password" placeholder="Password" id="defaultFormLoginPasswordEx" className="form-control" onChange={this.handleInputChange} />
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
