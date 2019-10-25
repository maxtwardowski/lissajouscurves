import * as React from 'react'
import {makeStyles, createStyles} from '@material-ui/core'
import TextFieldSlider from './textfield-slider'

const useStyles = makeStyles(theme =>
  createStyles({
    inputs: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputCluster: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
  })  
)

export type LissajousParameters = {
  smallA: number | null
  smallB: number | null
  bigA: number | null
  bigB: number | null
  theta: number | null
}

type Props = {
  value: LissajousParameters
  onChange: (value: LissajousParameters) => void
  onClear: () => void
  onSubmit: () => void
}

export type Parameter = {
  key: keyof LissajousParameters
  label: string
}

const parameters: Parameter[] = [
  {
    key: 'smallA', 
    label: 'a',
  },
  {
    key: 'smallB', 
    label: 'b',
  },
  {
    key: 'bigA', 
    label: 'A',
  },
  {
    key: 'bigB', 
    label: 'B',
  },
  {
    key: 'theta', 
    label: 'Θ',
  },
]

const LissajousInput = (props: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.inputs}>
      {parameters.map(param => (
        <TextFieldSlider 
          value={props.value}
          onChange={props.onChange}
          parameter={param}
          max={param.key === 'theta' ? 200 : 20}
          float={param.key === 'theta'}
        />
      ))}
    </div>
  )
}

export default LissajousInput