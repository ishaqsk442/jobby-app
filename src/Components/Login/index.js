import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

import Cookies from 'js-cookie'
// import {async} from 'fast-glob'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const options = {
      method: 'POST',

      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg">
        <form className="login-bg" onSubmit={this.onSubmitForm}>
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="login-inputs-cont">
            <label className="username" htmlFor="username">
              USERNAME
            </label>
            <input
              id="username"
              placeholder="USERNAME"
              type="text"
              value={username}
              className="username-input"
              onChange={this.onChangeUsername}
              onBlur={this.onBlurUsername}
            />
            <label className="password" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="PASSWORD"
              className="password-input"
              onChange={this.onChangePassword}
              onBlur={this.onBlurPassword}
            />
            <button className="login-btn" type="submit">
              Login
            </button>
          </div>
          {showErrorMsg && <p className="error_msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
