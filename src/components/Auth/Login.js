import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as classNames from 'classnames'
import { validateEmail, validatePassword } from '../../helpers'
//
// import normalizeStyle from 'normalize.css/normalize.css'
// import blueprintStyle from '@blueprintjs/core/dist/blueprint.css'
//
// console.info({
//   normalizeStyle: JSON.stringify(normalizeStyle),
//   blueprintStyle,
// })
import {
  Classes,
  Overlay,
  Callout,
  Spinner,
  InputGroup,
  Tooltip,
  Button,
  Intent,
} from '@blueprintjs/core'

import { login } from '../../actions'

// extract specific components

// use factories for React.createElement shorthand if you're not using JSX.
// every component provides a corresponding <Name>Factory.
// const myDatePicker = DatePickerFactory()

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      overlayIsOpen: false,
      email: '',
      password: '',
      showPassword: false,
      invalidEmail: false,
      invalidPassword: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLoginInput = this.handleLoginInput.bind(this)
    this.togglePasswordShow = this.togglePasswordShow.bind(this)
    this.validate = this.validate.bind(this)
  }

  handleSubmit(e) {
    const { login } = this.props
    const { email, password } = this.state
    const isValid = this.validate()
    if (!isValid) return
    e.preventDefault()
    login({ email, password })
  }

  validate() {
    const { email, password } = this.state
    let { invalidEmail, invalidPassword } = this.state
    let isValid = true

    if (!email || !validateEmail(email)) {
      invalidEmail = true
      isValid = false
    } else {
      invalidEmail = false
    }

    if (!password || !validatePassword(password)) {
      invalidPassword = true
      isValid = false
    } else {
      invalidPassword = false
    }

    if (
      invalidEmail !== this.state.invalidEmail ||
      invalidPassword !== this.state.invalidPassword
    ) {
      this.setState({
        invalidEmail,
        invalidPassword,
      })
    }

    return isValid
  }
  handleLoginInput({ target }) {
    const { value, id } = target
    this.setState({ [id]: value })
  }
  togglePasswordShow() {
    this.setState({ showPassword: !this.state.showPassword })
  }
  render() {
    const {
      email,
      password,
      showPassword,
      overlayIsOpen,
      invalidEmail,
      invalidPassword,
    } = this.state
    const { user, loginInProgress, loginError } = this.props
    // const maybeSpinner = filterValue ? <Spinner className={Classes.SMALL} /> : undefined
    const lockButton = (
      <Tooltip
        content={`${showPassword ? 'Hide' : 'Show'} Password`}
        // isDisabled={disabled}
      >
        <Button
          className={Classes.MINIMAL}
          intent={Intent.WARNING}
          // disabled={disabled}
          iconName={showPassword ? 'unlock' : 'lock'}
          onClick={this.togglePasswordShow}
        />
      </Tooltip>
    )

    const loginFieldStyles = {
      padding: '0 6px',
    }

    return (
      <div>
        <h1 style={{ margin: '20px' }}>
          Arts <span style={{ color: 'cyan' }}>4</span> Arts
        </h1>

        <div className={classNames('pt-card', 'pt-elevation-2', 'basic-margin')}>
          <h3>Login</h3>
          <InputGroup
            className={classNames(Classes.LARGE, 'basic-margin')}
            // disabled={disabled}
            id="email"
            iconName="user"
            onChange={this.handleLoginInput}
            placeholder="Email"
            intent={invalidEmail && Intent.DANGER}
            // rightElement={maybeSpinner}
            type="email"
            value={email}
          />
          <InputGroup
            className={classNames(Classes.LARGE, 'basic-margin')}
            // disabled={disabled}
            id="password"
            placeholder="Password"
            onChange={this.handleLoginInput}
            rightElement={lockButton}
            intent={invalidPassword && Intent.DANGER}
            type={showPassword ? 'text' : 'password'}
            value={password}
          />

          <Button
            iconName="log-in"
            className={classNames(Classes.LARGE, 'basic-margin')}
            text="Sign In"
            loading={loginInProgress}
            intent={Intent.SUCCESS}
            onClick={this.handleSubmit}
          />

          <Overlay
            isOpen={overlayIsOpen}
            onClose={() =>
              this.setState({
                overlayIsOpen: !overlayIsOpen,
              })}
          >
            <div>Overlaid contents...</div>
          </Overlay>
          {/* <FooterLink to="/signup">{"You don't have an account ?"}</FooterLink> */}
          {loginError && (
            <Callout title="Error" intent={Intent.DANGER}>
              {loginError.message}
            </Callout>
          )}
          {user.token && <Redirect to="/" />}
        </div>

        <Button
          className={classNames(Classes.MINIMAL)}
          text="Forgot your password ?"
          intent={Intent.PRIMARY}
          onClick={() => console.info('NAV TO FORGOT OVERLAY')}
        />
      </div>
    )
  }
}

Login.propTypes = {
  user: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  loginInProgress: state.user.loginInProgress,
  loginError: state.user.loginError,
})
export default connect(mapStateToProps, { login })(Login)
