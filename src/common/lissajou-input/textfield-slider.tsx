import * as React from 'react'
import { LissajousParameters, Parameter } from '.'
import { TextField, Slider, InputAdornment, IconButton, makeStyles, createStyles } from '@material-ui/core'
import {KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon} from '@material-ui/icons'

const useStyles = makeStyles(theme => 
  createStyles({
    root: {
      margin: theme.spacing(1, 0),
    },
  })
)

type Props = {
  value: LissajousParameters
  onChange: (value: LissajousParameters) => void
  parameter: Parameter
  max?: number
  float?: boolean
}

const TextFieldSlider = (props: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TextField
        variant="outlined"
        label={props.parameter.label}
        onChange={e => props.onChange({
          ...props.value,
          [props.parameter.key]: +e.target.value,
        })}
        margin="normal"
        value={props.float ? (props.value[props.parameter.key]! / 100 || '') : (props.value[props.parameter.key] || '')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="toggle password visibility"
                onClick={() => {
                  props.onChange({
                    ...props.value,
                    [props.parameter.key]: props.value ? props.value[props.parameter.key]! + 1 : 1,
                  })
                }}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton
                size="small"
                aria-label="toggle password visibility"
                onClick={() => {
                  props.onChange({
                    ...props.value,
                    [props.parameter.key]: props.value[props.parameter.key] ? props.value[props.parameter.key]! - 1 : 0,
                  })
                }}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Slider 
        value={props.value[props.parameter.key] || 0} 
        onChange={(_, value) => {
          props.onChange({
            ...props.value,
            [props.parameter.key]: value as number,
          })
        }}
        max={props.max || undefined}
      />
    </div>
  )
}

export default TextFieldSlider