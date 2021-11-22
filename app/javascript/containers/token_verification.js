import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router-dom'
import { API } from '../utils/api'

import './centered_form.css'

function useQuery () {
  return new URLSearchParams(useLocation().search)
}

export default function TokenVerification () {
  function setToken (token) {
    Cookies.set('Authorization', token)
    if (Cookies.get('Authorization')) { window.location = window.location.href.split('?')[0] }
  }

  function getToken () {
    const token = useQuery().get('token')

    if (token) {
      setToken(token)

      return token
    }

    return Cookies.get('Authorization')
  }

  checkToken()

  function redirectToLogin () {
    location.href = '/login'
  }

  function checkToken () {
    if (getToken()) { return true }

    redirectToLogin()
  }

  function removeToken () {
    Cookies.remove('Authorization')
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
            value={getToken()}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Show my profile!
        </Button>
        <Button variant="primary" onClick={removeToken}>
          Sign out!
        </Button>
      </Form>
    </div>
  )
}
