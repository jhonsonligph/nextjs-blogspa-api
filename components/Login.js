import { useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useForm } from '../util/hooks'
import { AUTHENTICATE_USER } from '../util/graphql'
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'
import { UserContext } from '../context/UserContext'

const Login = () => {
  const msg = useContext(UserContext)

  const { push } = useRouter()
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const loginUserCallback = () => loginUser()


  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  })

  const [loginUser, { loading }] = useMutation(AUTHENTICATE_USER, {
    variables: values,
    update: (_, { data: { login } }) => {
      context.login(login)
      push('/news/create/')
    }
  })

  // TODO: Continue YT useContext


  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Logged In!')
  // }

  // console.log(values)

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" onChange={onChange} placeholder="Email" />
        <input type="password" name="password" onChange={onChange} placeholder="password" />
        <button>Submit</button>
      </form>
      {msg}
    </>
  );
}

export default Login;