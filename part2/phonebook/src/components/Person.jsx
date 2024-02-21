const Person = ({ person, onDelete }) => {
  return (
    <p key={person.id}>
      {person.name}: {person.number} 
      <button onClick={() => onDelete(person.id, person.name)}>delete</button>
    </p>
  );
};

export default Person;
