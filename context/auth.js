import React, { createContext, useReducer } from 'react';
const AuthContext = createContext();

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'IS_OPEN':
      return {
        ...state,
        isOpen: payload
      }

    case 'IS_REGISTER':
      return {
        ...state,
        isRegister: payload
      }

    case 'IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: payload
      }

    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: payload
      }

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: payload
      }

    default:
      return state
  }
}

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    isOpen: false,
    isRegister: false
  })

  const login = token => {
    localStorage.setItem('authToken', token)
    dispatch({
      type: 'LOGIN',
      payload: localStorage.getItem('authToken') !== null
    })
  }

  const newUser = bool => {
    if (bool) {
      console.log('NEW_USER:', bool)

      // localStorage.setItem('authToken', token)
      // dispatch({
      //   type: 'LOGIN',
      //   payload: localStorage.getItem('authToken') !== null
      // })
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    dispatch({
      type: 'LOGOUT',
      payload: localStorage.getItem('authToken') !== null
    })
  }

  const isLoggedIn = () => {
    if (localStorage.getItem('authToken') !== null) {
      dispatch({
        type: 'IS_LOGGED_IN',
        payload: localStorage.getItem('authToken') !== null
      })
    }
  }

  const isOpen = () => {
    dispatch({
      type: 'IS_OPEN',
      payload: !state.isOpen
    })
  }

  const isRegister = () => {
    dispatch({
      type: 'IS_REGISTER',
      payload: !state.isRegister
    })
  }

  return <AuthContext.Provider value={{
    auth: state.isLoggedIn,
    open: state.isOpen,
    register: state.isRegister,
    newUser,
    login,
    logout,
    isLoggedIn,
    isOpen,
    isRegister
  }} {...props} />
}

export { AuthContext, AuthProvider }
