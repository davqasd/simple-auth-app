import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './centered_form.css'

export default function TokenVerification () {
  const [token, setToken] = useState('')

  function redirectToLogin () {
    location.href = '/login'
  }

  function validateForm () {
    if (token) { return true }

    redirectToLogin()
  }

  function handleSubmit (event) {
    event.preventDefault()
  }

  return (
    <div className="centered-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="token-verification">
          <Form.Label>JWT Token</Form.Label>
          <Form.Control
            disabled
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!validateForm()}>
          Verify!
        </Button>
      </Form>
    </div>
  )
}
