import axios from "axios";
import instance from "../config/axiosConfig";
import { useState, useEffect, useRef, Children } from "react";
import { Link } from "react-router-dom";

import Flux from "../../../models/possessions/Flux";
import Personne from "../../../models/Personne";
import Possession from "../../../models/possessions/Possession";
import Patrimoine from "../../../models/Patrimoine";

import { formatDate, formatNumber } from "../utils/format";

function PossessionList({ possessions, getData, errorMessage }) {
  return (
    <div className="possessions-list">
      <div className="possessions-header mb-4">
        <h3>Liste des possessions</h3>
        <Link to="/possession/create" className="btn btn-primary">
          <i className="fas fa-plus"></i>
          <span className="mx-2">Créer une nouvelle possession</span>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Libellé</th>
            <th scope="col">Valeur Initiale</th>
            <th scope="col">Date début</th>
            <th scope="col">Date fin</th>
            <th scope="col">Amortissement</th>
            <th scope="col">Valeur actuelle</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        {!errorMessage ? (
          <tbody>
            {possessions &&
              possessions.map((e, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{e.libelle}</th>
                    <td>
                      {formatNumber(e.jour ? e.valeurConstante : e.valeur)}
                    </td>
                    <td>{formatDate(new Date(e.dateDebut))}</td>
                    <td>
                      {e.dateFin
                        ? formatDate(new Date(e.dateFin))
                        : "non défini"}
                    </td>
                    <td>{e.tauxAmortissement || 0}%</td>
                    <td>{formatNumber(e.valeurActuelle)}</td>
                    <td>
                      <div className="actions-btn">
                        <Link
                          to={`/possession/${e.libelle}/update`}
                          className="btn btn-secondary"
                        >
                          Editer
                        </Link>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            instance
                              .put(`/possession/${e.libelle}/close`)
                              .then(() => getData());
                          }}
                          // disabled={e.dateFin ? true : false}
                        >
                          Cloturer
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        ) : (
          <tbody>
            <tr className="text-white">
              <td colSpan="7" className="py-3 text-center">
                {errorMessage}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default PossessionList;
