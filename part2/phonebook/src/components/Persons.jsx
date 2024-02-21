import Person from './Person';

const Persons = ({ filteredPersons, onDelete }) => {
  return (
    <div>
      {filteredPersons.map(person => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Persons;
