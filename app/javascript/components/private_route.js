import React from 'react'
import { Outlet } from 'react-router-dom'

import { checkAuth } from 'helpers/auth'

export default function PrivateRoute () {
  checkAuth()

  return <Outlet />
}
