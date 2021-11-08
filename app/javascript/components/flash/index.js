import React, { useEffect, useState } from 'react'
import Bus from '../../utils/bus'

window.flash = (message, type = 'success') => Bus.emit('flash', ({ message, type }))

export const Flash = () => {
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    Bus.addListener('flash', ({ message, type }) => {
      setVisibility(true)
      setMessage(message)
      setType(type)
      setTimeout(() => {
        setVisibility(false)
      }, 4000)
    })
  }, [])

  useEffect(() => {
    if (document.querySelector('.close') !== null) {
      document
        .querySelector('.close')
        .addEventListener('click', () => setVisibility(false))
    }
  })

  if (!visibility) { return (<div></div>) }

  return (
      <div className={`custom-alert custom-alert-${type}`}>
        <span className="close"><strong>X</strong></span>
        <p>{message}</p>
      </div>
  )
}
