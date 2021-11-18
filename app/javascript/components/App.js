import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Flash } from './flash'
import Login from '../containers/login'
import Signup from '../containers/signup'
import TokenVerification from '../containers/token_verification'

class App extends React.Component {
  render () {
    return (
      <>
        <Helmet>
          <title>Simple Auth App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        </Helmet>
        <Flash />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<TokenVerification />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

export default App
