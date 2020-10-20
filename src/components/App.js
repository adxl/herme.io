import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { HashRouter } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
// import Error404 from './Error404';

function App() {
	console.log(`${process.env.PUBLIC_URL}`);
	console.log(window.location);
	return (
		<Fragment>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				{/* token: true */}
				<Switch>
					{localStorage.getItem('token') && <Route path="/*" component={Home} />}
				</Switch>

				{/* token: false */}
				<Switch>
					{ !localStorage.getItem('token') && <Route exact path="/login" component={Login} />}
					{ !localStorage.getItem('token') && <Route exact path="/register" component={Register} />}
					{ !localStorage.getItem('token') && <Route path="/*" component={Login} /> }
					{/* { !localStorage.getItem('token') && <p>heu</p> } */}
					{/* { !localStorage.getItem('token') && <Route path="/*" component={Error404} /> } */}

				</Switch>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
