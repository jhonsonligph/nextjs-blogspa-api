import React, { createContext, useReducer } from 'react';
// import jwtDecode from 'jwt-decode';

const initialState = { user: null }
// const token = localStorage.getItem('authToken')

// if (token) {
//   const decodedToken = jwtDecode(token)

//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem('authToken')
//   } else {
//     initialState.user = decodedToken
//   }
// }

const AuthContext = createContext({
  user: null,
  login: data => { },
  logout: () => { }
});

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null
      }

    default:
      return state
  }
}

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = userData => {
    localStorage.setItem('authToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData
    })
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    dispatch({ type: 'LOGOUT' })
  }

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
}

export { AuthContext, AuthProvider }
