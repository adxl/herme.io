import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';

function App() {
	console.log(`${process.env.PUBLIC_URL}/*`);
	return (
		<Fragment>
			<BrowserRouter>
				{/* token: true */}
				<Switch>
					{localStorage.getItem('token') && <Route path={`${process.env.PUBLIC_URL}/*`} component={Home} />}
				</Switch>

				{/* token: false */}
				<Switch>
					{ !localStorage.getItem('token') && <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />}
					{!localStorage.getItem('token') && <Route exact path={`${process.env.PUBLIC_URL}/register`} component={Register} />}
					{ !localStorage.getItem('token') && <Route path={`${process.env.PUBLIC_URL}/*`} component={Login} /> }
				</Switch>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
