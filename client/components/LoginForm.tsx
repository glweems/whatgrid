import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button } from 'rebass/styled-components'
import { useLoginMutation, LoginMutationVariables } from './Graphql'
import { Form } from './common/Form'
import TextField from './TextField'

const LoginForm: React.FC = () => {
  const [login] = useLoginMutation()

  const [msg, setMsg] = useState('')

  const { handleChange, handleSubmit } = useFormik<LoginMutationVariables>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ email, password }) => {
      await login({
        variables: { email, password }
      }).then(({ data }) => {
        localStorage.setItem('token', data.login.token)
        setMsg(data.login.user.email)
      })
    }
  })

  return (
    <Form columns={2} gap="1em" onSubmit={handleSubmit}>
      <p>{msg}</p>
      <TextField
        label="Email Address"
        name="email"
        type="text"
        onChange={handleChange}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
      />

      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default LoginForm
