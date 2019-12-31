import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Label, Input } from '@rebass/forms'
import { Button } from 'rebass/styled-components'
import { useSignUpMutation, SignUpMutationVariables } from './Graphql'

const SignupForm = () => {
  const [signup] = useSignUpMutation()
  const [msg, setMsg] = useState('')

  const formik = useFormik<SignUpMutationVariables>({
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
    <form onSubmit={formik.handleSubmit}>
      <p>{msg}</p>
      <Label htmlFor="email">
        Email
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Label>

      <Label htmlFor="password">
        Password
        <Input
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Label>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default SignupForm
