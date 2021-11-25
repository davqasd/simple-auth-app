import React, { useState } from 'react'
import { Form, InputGroup, Button, Card } from 'react-bootstrap'

import FaIcon from 'components/fa-icon'
import { API } from '../utils/api'
import { signIn } from 'helpers/auth'

import './centered_form.css'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  function validateForm () {
    return email.length > 0 && password.length > 0
  }

  function handleSubmit (event) {
    event.preventDefault()

    const payload = { email: email, password: password, password_confirmation: passwordConfirmation }

    API.sessions.signup(payload).then(response => {
      if (response.status === 200) {
        signIn(response.data.token)
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

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <Card>
          <Card.Header>
            <h3>Sign Up</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <InputGroup>
                  <InputGroup.Text id="inputPrependEmail"><FaIcon icon="user"/></InputGroup.Text>
                  <Form.Control
                    autoFocus
                    type="email"
                    placeholder="email"
                    aria-describedby="inputPrependEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <InputGroup>
                  <InputGroup.Text id="inputPrependPassword"><FaIcon icon="key"/></InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    aria-describedby="inputPrependPassword"
                    value={password}
                    autoComplete='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password-confirmation">
                <InputGroup>
                  <InputGroup.Text id="inputPrependPasswordConfirmation"><FaIcon icon="key"/></InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="password confirmation"
                    aria-describedby="inputPrependPasswordConfirmation"
                    value={passwordConfirmation}
                    autoComplete='password confirmation'
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button className="login_btn" variant="primary" type="submit" disabled={!validateForm()}>
                  Sign up
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-center links">
              Already have account?<a href="/login">Sign In</a>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  )
}
