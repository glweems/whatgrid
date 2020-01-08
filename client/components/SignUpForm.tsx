import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useSignUpMutation, SignUpMutationVariables } from './Graphql'
import Button from './Button'
import { Form } from './common'
import TextField from './TextField'

const SignupForm = () => {
  const [signup] = useSignUpMutation()
  const [msg, setMsg] = useState('')

  const { handleChange, handleSubmit } = useFormik<SignUpMutationVariables>({
    initialValues: {
      email: '',
      password: ''
    },

    onSubmit: async ({ email, password }) => {
      await signup({
        variables: { email, password }
      }).then(({ data }) => {
        localStorage.setItem('token', data.signup.token)
        setMsg(data.signup.user.email)
      })
    }
  })

  return (
    <Form onSubmit={handleSubmit}>
      <p>{msg}</p>
      <TextField
        label="Email Address"
        name="email"
        type="text"
        onChange={handleChange}
        errors={{}}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
        errors={{}}
      />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  )
}

export default SignupForm
