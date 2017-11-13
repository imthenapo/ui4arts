import { actionTypes as types } from '../constants'

const initialState = {
  loginInProgress: false,
  loginError: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case '@@INIT':
      return initialState
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, { loginInProgress: false }, action.data)
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, { loginInProgress: true })
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, { loginInProgress: false, loginError: action.err })
    default:
      return state
  }
}

export default user
