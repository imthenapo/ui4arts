import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import Async from 'react-code-splitting'

import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Header from './Header'
import { Body } from './Styled'

const Home = () => <Async load={import('./Home')} />

const bodyStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}
const App = ({ user }) => (
  <Body style={bodyStyle}>
    {/* <Header /> */}
    <div>
      <Switch>
        {user.token && <Route path="/" component={Home} />}
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </div>
  </Body>
)

App.propTypes = {
  user: PropTypes.shape({}).isRequired,
}

export default withRouter(connect(state => ({ user: state.user }))(App))
