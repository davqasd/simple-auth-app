import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Login from '../containers/login'
import TokenVerification from '../containers/token_verification'

class App extends React.Component {
  render () {
    return (
      <>
        <Helmet>
          <title>Simple Auth App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        </Helmet>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<TokenVerification />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

export default App
