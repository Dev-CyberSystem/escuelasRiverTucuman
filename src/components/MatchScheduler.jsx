import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./StyleMatchScheduler.css"; 
import Swal from "sweetalert2";
const MatchScheduler = ({ category, selectedStudents }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [opponent, setOpponent] = useState("");
  const [field, setField] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("Local"); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const match = {
      category,
      date,
      time,
      opponent,
      convocatedPlayers: selectedStudents,
      field,
      address,
      location,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/matches", match, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Partido Programado",
        text: "El partido ha sido programado exitosamente",
        timer: 2000,
      });

      setDate("");
      setTime("");
      setOpponent("");
      setField("");
      setAddress("");
      setLocation("Local");
    } catch (error) {
      console.error("Error scheduling match:", error);
    }
  };

  return (
    <div className="match-scheduler-container">
      <h2 className="match-scheduler-title">
        Programar Partido para Categoría {category}
      </h2>
      <form className="match-scheduler-form" onSubmit={handleSubmit}>
        <div className="match-scheduler-form-group">
          <label className="match-scheduler-label">Fecha:</label>
          <input
            className="match-scheduler-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="match-scheduler-form-group">
          <label className="match-scheduler-label">Hora:</label>
          <input
            className="match-scheduler-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="match-scheduler-form-group">
          <label className="match-scheduler-label">Rival:</label>
          <input
            className="match-scheduler-input"
            type="text"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            required
          />
        </div>
        <div className="match-scheduler-form-group">
          <label className="match-scheduler-label">Cancha:</label>
          <input
            className="match-scheduler-input"
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            required
          />
        </div>
        <div className="match-scheduler-form-group">
          <label className="match-scheduler-label">Dirección:</label>
          <input
            className="match-scheduler-input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="match-scheduler-form-group">
          <label className="match-scheduler-label">Ubicación:</label>
          <select
            className="match-scheduler-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Local">Local</option>
            <option value="Visitante">Visitante</option>
          </select>
        </div>
        <button className="match-scheduler-button" type="submit">
          Programar Partido
        </button>
      </form>
    </div>
  );
};

MatchScheduler.propTypes = {
  category: PropTypes.number.isRequired,
  selectedStudents: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MatchScheduler;
