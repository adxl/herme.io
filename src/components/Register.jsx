import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class Register extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password: '',
		errorMessage: '',
	}

	handleInputChange = (e) => {
		// console.log(e.target.id + ': ' + e.target.value);
		const { name } = e.target;
		const { value } = e.target;

		// disable default case since it never happens
		// eslint-disable-next-line default-case
		switch (name) {
		case 'firstName':
			this.setState({ firstName: value });
			break;
		case 'lastName':
			this.setState({ lastName: value });
			break;
		case 'email':
			this.setState({ email: value });
			break;
		case 'username':
			this.setState({ username: value });
			break;
		case 'password':
			this.setState({ password: value });
			break;
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state),
		};

		await fetch('https://herme-io.herokuapp.com/register/', options)
			.then((response) => {
				if (response.ok) {
					return 'signed';
				}
				return response.text();
			})
			.then((data) => {
				if (data === 'signed') {
					window.location.replace(`${process.env.PUBLIC_URL}/login`);
				} else {
					this.setState({ errorMessage: data });
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
								<p className="h4 text-center mb-5">Welcome to Herme.io</p>
								{errorMessage && <p className="mb-3 bad-login-register-msg">{errorMessage}</p> }
								<div>
									<div className="field">
										<input name="firstName" required minLength="2" type="text" placeholder="First Name" id="defaultFormRegisterFNameEx" className="form-control" onChange={this.handleInputChange} />
									</div>
									<div className="field">
										<input name="lastName" required minLength="2" type="text" placeholder="Last Name" id="defaultFormRegisterLNameEx" className="form-control" onChange={this.handleInputChange} />
										<br />
									</div>
								</div>

								<input name="email" type="email" required placeholder="Email" id="defaultFormRegisterEmailEx" className="form-control" onChange={this.handleInputChange} />
								<br />
								<input name="username" required minLength="4" type="text" placeholder="Username" id="defaultFormRegisterUsernameEx" className="form-control" onChange={this.handleInputChange} />
								<br />
								<input name="password" required minLength="10" type="password" placeholder="Password" id="defaultFormRegisterPasswordEx" className="form-control" onChange={this.handleInputChange} />
    						<br />

								<div className="text-center mt-4">
									<MDBBtn color="unique" type="submit">Register</MDBBtn>
									<p className="mt-3">
											Have an account?
										<Link to="/login"> Login</Link>
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

export default Register;
