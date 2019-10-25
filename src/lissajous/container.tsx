import * as React from 'react'
import LissajousInput, { LissajousParameters } from '../common/lissajou-input'
import { Paper, makeStyles, createStyles, Slide } from '@material-ui/core'
import {LineChart, Line, XAxis} from 'recharts'

const useStyles = makeStyles(theme =>
  createStyles({
    chart: {
      alignSelf: 'center',
      margin: theme.spacing(0, 5),
    },
    paper: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(2),
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
    },
  })  
)

const defaultParameters: LissajousParameters = {
  smallA: null,
  smallB: null,
  bigA: null,
  bigB: null,
  theta: null,
}

type Point = {
  x: number
  y: number
}

const calculateX = (A: number, a: number, t: number, theta: number) => A * Math.sin(a * t + theta) 
const calcualteY = (B: number, b: number, t: number) => B * Math.sin(b * t) 

const LissajousShowcase = () => {
  const classes = useStyles()
  const [parameters, setParameters] = React.useState<LissajousParameters>(defaultParameters)
  const [series, setSeries] = React.useState<Point[] | null>(null)

  const handleSubmit = React.useCallback(() => {
    if (!parameters.smallA || !parameters.smallB || !parameters.bigA || !parameters.bigB || !parameters.theta) {
      return
    }
    const series = []
    for (let i = 0, t = 0; i <= 4 * Math.PI; i += 0.01) {
      t += 0.01
      const x = calculateX(parameters.bigA, parameters.smallA, t, parameters.theta / 100)
      const y = calcualteY(parameters.bigB, parameters.smallB, t)
      series.push({x, y})
    }
    setSeries(series)
  }, [parameters])
  
  const data = series && series.map(s => ({
    name: s.x,
    value: s.y,
  }))

  React.useEffect(() => {
    if (parameters.bigA && parameters.bigB && parameters.smallA && parameters.smallB && parameters.theta) {
      handleSubmit()
    }
  }, [parameters, handleSubmit])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Slide direction="up" in={!!data} mountOnEnter={true} unmountOnExit={true}>
          <LineChart width={500} height={500} data={data || undefined} className={classes.chart}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
            <XAxis dataKey="name" type="number" hide={true} />
          </LineChart>
        </Slide>
        <LissajousInput
          value={parameters}
          onChange={value => setParameters(value)}
          onClear={() => {
            setParameters(defaultParameters)
            setSeries(null)
          }}
          onSubmit={handleSubmit}
        />
      </Paper>
    </div>
  )
}

export default LissajousShowcase