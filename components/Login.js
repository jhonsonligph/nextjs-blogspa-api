import { useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useForm } from '../util/hooks'
import { AUTHENTICATE_USER } from '../util/graphql'
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

const Login = () => {
  const { push } = useRouter()
  const { login, register, isOpen, isRegister } = useContext(AuthContext)
  const loginUserCallback = () => loginUser()
  const registerUser = () => isRegister()
  // const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  })

  const [loginUser, { loading }] = useMutation(AUTHENTICATE_USER, {
    variables: values,
    update: (_, { data: { authenticate } }) => {
      login(authenticate)
      isOpen()
    }
  })

  // TODO: Continue YT useContext

  if (loading) return <h1>Loading...</h1>


  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Logged In!')
  // }

  // console.log(values)

  return (
    <>
      {/* <form onSubmit={onSubmit}>
        <input type="text" name="email" onChange={onChange} placeholder="Email" />
        <input type="password" name="password" onChange={onChange} placeholder="password" />
        <button>Submit</button>
      </form> */}
      <form onSubmit={onSubmit} className="form-login">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={onChange} />
        </div>
        {/* <span className="form-error" v-if="formError">{{formError}}</span> */}
        <div className="form-submit">
          <button className="button" type="submit">Login</button>
        </div>
      </form>
      <div className="form-footnote">
        <span>No account yet?</span> <button onClick={registerUser}>Register Here</button>
      </div>
    </>
  );
}

export default Login;