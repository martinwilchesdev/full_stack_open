import Part from './Part'

const Content = (props) => {
    return(
        <div>
            <Part
                part={props.course.parts[0].name}
                exercises={props.course.parts[0].exercises}
                />
            <Part
                part={props.course.parts[1].name}
                exercises={props.course.parts[0].exercises}
                />
            <Part
                part={props.course.parts[2].name}
                exercises={props.course.parts[0].exercises}
            />
        </div>
    )
}

export default Content