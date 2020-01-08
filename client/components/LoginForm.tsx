import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { useLoginMutation, LoginMutationVariables } from './Graphql'
import { Form } from './common/Form'
import TextField from './TextField'
import Button from './Button'
import { useStoreActions } from '../store'

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: Yup.string()
    .min(3, 'Please enter no more than 40 characters')
    .required('Please enter your first name')
})

const LoginForm: React.FC<WithRouterProps> = ({ router }) => {
  const { setUser } = useStoreActions((store) => store.session)
  const [login] = useLoginMutation()

  const [msg, setMsg] = useState('')

  const { handleChange, handleSubmit, isSubmitting, errors } = useFormik<
    LoginMutationVariables
  >({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    onSubmit: async ({ email, password }) => {
      await login({
        variables: { email, password }
      }).then(({ data }) => {
        setMsg(data.login.user.email)
        setUser(data.login.user)
      })
    }
  })

  return (
    <Form gridTemplateColumns={2} onSubmit={handleSubmit}>
      <p>{msg}</p>

      <TextField
        label="Email Address"
        name="email"
        type="text"
        onChange={handleChange}
        errors={errors}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
        errors={errors}
      />

      <Button type="submit" loading={isSubmitting} variant="primary">
        Submit
      </Button>
      <pre>
        <code>{JSON.stringify(errors, null, 2)}</code>
      </pre>
    </Form>
  )
}

export default withRouter(LoginForm)
