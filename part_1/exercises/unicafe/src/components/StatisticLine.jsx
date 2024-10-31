const StatisticLine = (props) => {
    return(
        <tr>
            <td>{ props.name }</td>
            <td>{props.exercises}</td>
        </tr>
    )
}

export default StatisticLine