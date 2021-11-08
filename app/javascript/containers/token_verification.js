import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import cookie from 'react-cookies'
import { API } from '../utils/api'

import './centered_form.css'

export default function TokenVerification () {
  const token = cookie.load('Authorization')

  function redirectToLogin () {
    location.href = '/login'
  }

  function validateForm () {
    if (token) { return true }

    redirectToLogin()
  }

  function handleSubmit (event) {
    event.preventDefault()

    API.users.my().then(response => {
      if (response.status === 200) {
        console.log(response.data)
        window.flash(JSON.stringify(response.data), 'success')
      } else { window.flash('Something went wrong', 'error') }
    }).catch(error => {
      if (error.response.status === 401) { window.flash('Invalid token!', 'error') }
    })
  }

  return (
    <div className="centered-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="token-verification">
          <Form.Label>JWT Token</Form.Label>
          <Form.Control
            disabled
            value={token}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!validateForm()}>
          Show my profile!
        </Button>
      </Form>
    </div>
  )
}
