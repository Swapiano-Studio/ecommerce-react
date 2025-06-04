import React, { useEffect, useState } from 'react'
import GridLoader from 'react-spinners/GridLoader'

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'purple',
}

const Spinner = ({ loading }) => {
  return (
    loading && (
      <div style={spinnerContainerStyle}>
        <GridLoader
          loading={loading}
          cssOverride={override}
          size={15}
          color="purple"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  )
}

const spinnerContainerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: semi-transparent background
  zIndex: 9999,
}

export default Spinner
