import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import "./StyleCategoryList.css"; // Importa el archivo CSS

const CategoryList = ({ category, selectedStudents, setSelectedStudents }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/alumnos?categoria=${category}`);
        setStudents(response.data || []);
      } catch (error) {
        console.error('Error fetching students:', error);
        setStudents([]);
      }
    };
    fetchStudents();
  }, [category]);

  const handleSelect = (student) => {
    if (selectedStudents.includes(student._id)) {
      setSelectedStudents(selectedStudents.filter(id => id !== student._id));
    } else {
      setSelectedStudents([...selectedStudents, student._id]);
    }
  };

  const handleSelectAll = () => {
    if (students.length > 0) {
      const allStudentIds = students.map(student => student._id);
      setSelectedStudents(allStudentIds);
    }
  };

  return (
    <div className="category-list-container">
      <h2 className="category-list-title">Categoría {category}</h2>
      <Button variant="outline-primary"  className="select-all-button" onClick={handleSelectAll}>
        Seleccionar Todos
      </Button>
      <ul className="category-list">
        {Array.isArray(students) && students.length > 0 ? (
          students.map(student => (
            <li key={student._id} className="category-list-item">
              <label className="category-list-label">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student._id)}
                  onChange={() => handleSelect(student)}
                />
                {student.nombre} {student.apellido}
              </label>
            </li>
          ))
        ) : (
          <p className="category-list-empty">No hay alumnos en esta categoría</p>
        )}
      </ul>
    </div>
  );
};

CategoryList.propTypes = {
  category: PropTypes.number.isRequired,
  selectedStudents: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedStudents: PropTypes.func.isRequired,
};

export default CategoryList;
