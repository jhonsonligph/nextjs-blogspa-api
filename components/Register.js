import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { REGISTER_USER, AUTHENTICATE_USER } from '../util/graphql'
import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'

const Register = () => {
  const { push } = useRouter()
  const context = useContext(AuthContext)
  const { login, register, isOpen, isRegister, newUser } = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const logUserIn = () => isRegister()
  const loginUserCallback = () => loginUser()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const registerUser = () => {
    const { email, password, confirmPassword } = values
    if (validateEmail(email)) {
      if (password === confirmPassword) {
        // console.log('MATCHED PASSWORDS')
        // console.log('YOU ARE NOW REGISTERED')
        addUser()
        loginUser()

      } else {
        setErrors(prevState => ({
          ...prevState,
          password: 'MISMATCHED PASSWORDS'
        }))
        console.log('ERROR:', errors.password)
      }
    } else {
      setErrors(prevState => ({
        ...prevState,
        email: 'INVALID EMAIL'
      }))
      console.log('ERROR', errors.email)
    }
  }

  const { onChange, onSubmit, values } = useForm(registerUser, {
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [addUser] = useMutation(REGISTER_USER, {
    variables: values,
    update(_, { data: { register } }) {
      newUser(register)
      setCredentials({
        email: values.email,
        password: values.password
      })
    },
  })

  const [loginUser, { loading }] = useMutation(AUTHENTICATE_USER, {
    variables: credentials,
    update: (_, { data: { authenticate } }) => {
      login(authenticate)
      isRegister()
      isOpen()
      push('/')
    }
  })

  useEffect(() => {
    console.log(values)
  })

  function validateEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  if (loading) return <h1>Registering new account...</h1>

  return (
    <React.Fragment>
      <form className="form-register" onSubmit={onSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" onChange={onChange} required />
        </div>
        {/* <span className="form-error" v-if="formError">{{formError}}</span> */}
        <div className="form-submit">
          <button className="button" type="submit">Register</button>
        </div>
      </form>
      <div className="form-footnote">
        <span>Already have an account?</span> <button onClick={logUserIn}>Login Here</button>
      </div>
      {errors && (<>{errors.email || errors.password}</>)}
    </React.Fragment>
  );
}

export default Register;