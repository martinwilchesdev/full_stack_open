import Part from './Part'

const Content = ({course}) => {
    return course.map((course, index) => {
        return(
            <Part
                part={course.name}
                exercises={course.exercises}
                key={index}
            />
        )
    })
}

export default Content