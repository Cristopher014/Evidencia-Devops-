import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [peliculas, setPeliculas] = useState([]);

   <div>
      <h1>Hola Mundo CineApp</h1>
    </div>
  useEffect(() => {
    // Cambia TU_API_KEY por tu clave de OMDb
    fetch("https://www.omdbapi.com/?s=batman&apikey=99b2be8")
      .then(res => res.json())
      .then(data => {
        if (data.Search) {
          setPeliculas(data.Search);
        }
      });
  }, []);

  return (
    <div>
      <h1>Lista de Películas</h1>
      <ul>
        {peliculas.map(p => (
          <li key={p.imdbID}>{p.Title} ({p.Year})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

