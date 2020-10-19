import React, { Fragment } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Error404 from './Error404';

function App() {
	console.log(window.location.href);
	console.log(`/${process.env.PUBLIC_URL}/home`);
	return (
		<Fragment>
			<BrowserRouter>
				{/* token: true */}
				<Switch>
					{localStorage.getItem('token') && <Route exact path={`${process.env.PUBLIC_URL}/home`} component={Home} />}
					{localStorage.getItem('token') && <Route exact path={`${process.env.PUBLIC_URL}/posts`} component={Home} />}
					{localStorage.getItem('token') && <Route exact path={`${process.env.PUBLIC_URL}/friends`} component={Home} />}
					{localStorage.getItem('token') && <Route component={Error404} /> }
				</Switch>

				{/* token: false */}
				<Switch>
					{ !localStorage.getItem('token') && <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />}
					{ !localStorage.getItem('token') && <Route exact path={`${process.env.PUBLIC_URL}/register`} component={Register} />}
					{/* { !localStorage.getItem('token') && <Route path="/*" component={Login} /> } */}
					{/* { !localStorage.getItem('token') && <p>heu</p> } */}
					{ !localStorage.getItem('token') && <Route component={Error404} /> }

				</Switch>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
