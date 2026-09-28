import { Seq } from 'immutable';

function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export default function printBestStudents(grades) {
  const bestStudents = Seq(grades)
    .filter(student => student.score >= 70)
    .map(student => ({
      ...student,
      firstName: capitalize(student.firstName),
      lastName: capitalize(student.lastName),
    }));

  console.log(bestStudents.toJS());
}
