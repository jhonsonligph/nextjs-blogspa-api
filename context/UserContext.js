import { createContext, useReducer } from 'react';


const UserContext = createContext(null)

const userReducer = (state, { type, payload }) => {
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

const UserProvider = props => {
  const [state, dispatch] = useReducer(userReducer, initialState)
}


export { UserContext, UserProvider }