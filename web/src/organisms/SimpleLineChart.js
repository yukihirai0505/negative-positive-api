import React from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import LineChart from 'recharts/lib/chart/LineChart'
import Line from 'recharts/lib/cartesian/Line'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'
import PropTypes from 'prop-types'
import moment from 'moment'

function SimpleLineChart(props) {
  const { data } = props
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart
        data={data.sort((a, b) => moment.utc(a.date).diff(moment.utc(b.date))).slice(0, 20).map(n => {
          const positive = n.labels.positive
          const negative = n.labels.negative
          const date = moment(n.date).format('MMM Do')
          return {
            date,
            positive,
            negative
          }
        })}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="positive" stroke="#82ca9d" />
        <Line
          type="monotone"
          dataKey="negative"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

SimpleLineChart.propTypes = {
  data: PropTypes.array
}

export default SimpleLineChart
