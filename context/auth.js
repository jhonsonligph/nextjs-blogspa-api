import React, { createContext, useReducer } from 'react';
import { useQuery } from '@apollo/client'
import { FETCH_ALL_NEWS } from '../util/graphql'


const AuthContext = createContext({});

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'TOTAL_NEWS':
      return {
        ...state,
        totalNews: payload
      }

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
  const { data } = useQuery(FETCH_ALL_NEWS, { variables: { limit: -1 } })
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

  if (data)

    return <AuthContext.Provider value={{
      auth: state.isLoggedIn,
      open: state.isOpen,
      register: state.isRegister,
      total: data.posts.length,
      newUser,
      login,
      logout,
      isLoggedIn,
      isOpen,
      isRegister
    }} {...props} />
}

export { AuthContext, AuthProvider }
