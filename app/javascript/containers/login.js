import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { API } from '../utils/api'
import { signIn } from 'helpers/auth'

import './centered_form.css'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function validateForm () {
    return email.length > 0 && password.length > 0
  }

  function handleSubmit (event) {
    event.preventDefault()

    const payload = { email, password }

    API.sessions.create(payload).then(response => {
      if (response.status === 200) { signIn(response.data.token) } else { window.flash('Something went wrong', 'error') }
    }).catch(error => {
      if (error.response.status === 401) { window.flash('Invalid email/password', 'error') }
    })
  }

  return (
    <div className="centered-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            autoComplete='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <div>
          <a href="/signup">
            Sign up
          </a>
        </div>
        <div>
          <a href="/auth/github/redirect">
            Github
          </a>
        </div>
      </Form>
    </div>
  )
}
