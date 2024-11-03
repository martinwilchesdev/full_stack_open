import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content course={course.parts} />
            <Total course={course.parts} />
        </div>
    )
}

export default Course