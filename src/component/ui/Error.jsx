import React from 'react'

const Error = ({message}) => {
  return (
    <div className="alert alert-danger my-4" role="alert">{message}</div>
  )
}

export default Error