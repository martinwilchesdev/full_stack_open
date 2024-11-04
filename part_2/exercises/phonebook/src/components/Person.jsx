const Person = ({persons, onDelete}) => {
    return (
        persons.map((person, index) => (
            <li key={index}>{`${person.name}: ${person.number}`}
            <button onClick={() => onDelete(person)}>delete</button></li>
        ))
    )
}

export default Person