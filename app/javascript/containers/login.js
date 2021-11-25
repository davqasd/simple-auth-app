import React, { useState } from 'react'
import { Form, InputGroup, Button, Card } from 'react-bootstrap'

import FaIcon from 'components/fa-icon'
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
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <Card>
          <Card.Header>
            <h3>Sign In</h3>
            <div className="d-flex justify-content-end social_icon">
              <span><a href="/auth/github/redirect"><FaIcon icon={['fab', 'github']}/></a></span>
            </div>
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
              <Form.Group className="d-flex justify-content-end">
                <Button className="login_btn" variant="primary" type="submit" disabled={!validateForm()}>
                  Login
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-center links">
              Don&rsquo;t have an account?<a href="/signup">Sign Up</a>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  )
}
