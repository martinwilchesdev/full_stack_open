const Total = ({course}) => {
    const total = course.reduce((a, b) => a + b.exercises, 0)

    return(
        <p><strong>total of {total} exercises</strong></p>
    )
}

export default Total