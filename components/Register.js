import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm: ''
  })

  const onChange = ({ target: { name, value } }) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    console.log(`Register:`, formData)
  }, [formData])


  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.password === formData.confirm) {
      console.log('Registered!')
      //TODO: Call authenticate function
    } else {
      console.log('Mismatch passwords!')
    }

  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" onChange={onChange} placeholder="Email" />
        <input type="password" name="password" onChange={onChange} placeholder="Password" />
        <input type="password" name="confirm" onChange={onChange} placeholder="Confirm Password" />
        <button>Submit</button>
      </form>
    </>
  );
}

export default Register;