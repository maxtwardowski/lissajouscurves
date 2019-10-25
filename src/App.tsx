import * as React from 'react'
import LissajousShowcase from './lissajous/container'
import { Toolbar, AppBar, Typography } from '@material-ui/core'

const App = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Lissajous Showcase
          </Typography>
        </Toolbar>
      </AppBar>
      <LissajousShowcase />
    </>
  )
}

export default App
