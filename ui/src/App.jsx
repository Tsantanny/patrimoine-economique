import "./App.css";
import { useRef, useState, useEffect } from "react";
import Flux from "../../models/possessions/Flux";
import Personne from "../../models/Personne";
import Possession from "../../models/possessions/Possession";
import Patrimoine from "../../models/Patrimoine";
import Argent from "../../models/possessions/Argent";
import TYPE_ARGENT from "../../constante";
import { readFile } from "../../data/index";
import jsonData from "../../data/data.json";
import { formatDate, formatNumber } from "./utils/format";
function App() {
  const [data, setData] = useState([]);
  const [possesseur, possessions] = data;
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [submittedDate, setSubmittedDate] = useState(new Date());
  useEffect(() => {
    const data = JSON.stringify(jsonData);
    const loadedData = JSON.parse(data);

    const result = loadedData.map((item) => {
      const { model, data } = item;
      if (model == "Personne") {
        return new Personne(data.nom);
      } else {
        const { possesseurs, possessions } = data;
        return possessions.map((p) => {
          if (p.valeur === 0) {
            return new Flux(
              new Personne(p.possesseur.nom),
              p.libelle,
              p.valeurConstante,
              new Date(p.dateDebut),
              p.dateFin ? new Date(p.dateFin) : null,
              p.tauxAmortissement,
              p.jour
            );
          }
          return new Possession(
            p.possesseur,
            p.libelle,
            p.valeur,
            new Date(p.dateDebut),
            p.dateFin ? new Date(p.dateFin) : null,
            p.tauxAmortissement
          );
        });
      }
    });
    setData(result);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Libelle</th>
              <th scope="col">Valeur Initiale</th>
              <th scope="col">Date Debut (mm/dd/yyyy)</th>
              <th scope="col">Date Fin (mm/dd/yyyy)</th>
              <th scope="col">Amortissement</th>
              <th scope="col">Valeur Actuelle</th>
            </tr>
          </thead>

          <tbody>
            {possessions &&
              possessions.map((e, index) => (
                <tr key={index}>
                  <th scope="row">{e.libelle}</th>
                  <td>{formatNumber(e.valeur)}</td>
                  <td>{formatDate(e.dateDebut)}</td>
                  <td>{e.dateFin || "non défini"}</td>
                  <td>{e.tauxAmortissement || 0}%</td>
                  <td>{formatNumber(e.getValeur(new Date()))}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <p className="mt-4">Seléctionnez une Date (mm/dd/yyyy) : </p>
        <form
          className="input-group mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!selectedDate) {
              inputRef.current.focus();
              setIsValid(false);
            } else {
              setSubmittedDate(new Date(selectedDate));
              setIsValid(true);
            }
          }}
        >
          <input
            className={`form-control ${!isValid && "is-invalid"}`}
            type="date"
            ref={inputRef}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button className="btn btn-dark">Valider</button>
        </form>

        <p className="mt-3">
          Valeur du Patrimoine au <b>{formatDate(submittedDate)}</b> {" : "}
        </p>
        <h2>
          {possessions &&
            formatNumber(
              new Patrimoine(possesseur, possessions).getValeur(
                new Date(submittedDate)
              )
            )}
        </h2>
      </div>
    </>
  );
}

export default App;
