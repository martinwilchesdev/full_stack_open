import StatisticLine from './StatisticLine'

const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad

    if (total > 0) {
        return(
            <div>
                <h2>statistics</h2>
                <table>
                    <StatisticLine
                        name="good"
                        exercises={props.good}
                    />
                    <StatisticLine
                        name="neutral"
                        exercises={props.neutral}
                    />
                    <StatisticLine
                        name="bad"
                        exercises={props.bad}
                    />
                    <StatisticLine
                        name="all"
                        exercises={total}
                    />
                    <StatisticLine
                        name="average"
                        exercises={`${total / 3}%`}
                    />
                    <StatisticLine
                        name="positive"
                        exercises={`${(props.good / total) * 100}%`}
                    />
                </table>
            </div>
        )
    } else {
        return(
            <h3>No feedback given</h3>
        )
    }
}

export default Statistics