import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { API } from '../utils/api'
import Cookies from 'js-cookie'

import './centered_form.css'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  function getToken () {
    return Cookies.get('Authorization')
  }

  function validateForm () {
    return email.length > 0 && password.length > 0
  }

  function renderRootPage () {
    location.href = '/'
  }

  function signUp (token) {
    Cookies.set('Authorization', token)
    window.flash('Successfully signed in!', 'success')
    renderRootPage()
  }

  function handleSubmit (event) {
    event.preventDefault()

    const payload = { email: email, password: password, password_confirmation: passwordConfirmation }

    API.sessions.signup(payload).then(response => {
      if (response.status === 200) {
        signUp(response.data.token)
      } else {
        window.flash('Something went wrong', 'error')
      }
    }).catch(error => {
      if (error.response.status === 403) {
        error.response.data.forEach(message => {
          window.flash(message, 'error')
        })
      }
    })
  }

  if (getToken()) {
    window.flash('You are already signed in!', 'success')
    renderRootPage()
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
        <Form.Group className="mb-3" controlId="password-confirmation">
          <Form.Label>Password confirmation</Form.Label>
          <Form.Control
            type="password"
            value={passwordConfirmation}
            autoComplete='password confirmation'
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!validateForm()}>
          Sign up
        </Button>
        <a href="/login">
          Sign in!
        </a>
      </Form>
    </div>
  )
}
