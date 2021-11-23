import React from 'react'
import Button from 'react-bootstrap/Button'

import { signOut } from 'helpers/auth'

export default function SignOutBtn () {
  return (
    <Button variant="primary" onClick={signOut}>
      Sign out!
    </Button>
  )
}
