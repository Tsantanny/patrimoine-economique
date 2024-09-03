import { DatePicker } from "rsuite";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function CreatePossessionForm({ onSubmit, children }) {
  const [type, setType] = useState(true);
  const [libelle, setLibelle] = useState("");
  const [valeur, setValeur] = useState("");
  const [taux, setTaux] = useState("");
  const [dateDebut, setDateDebut] = useState(null);
  const [jour, setJour] = useState("");

  return (
    <div className="create-possession col-6">
      {children}
      <h4 className="mb-3">Ajouter une nouvelle possession</h4>
      <div className="type mb-3">
        <h6>Selectionner le type :</h6>
        <div>
          <button
            className={type ? "btn btn-secondary" : "btn btn-light"}
            onClick={() => setType(true)}
          >
            Possession
          </button>
          <button
            className={!type ? "btn btn-secondary" : "btn btn-light"}
            onClick={() => setType(false)}
          >
            Flux
          </button>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(libelle, valeur, taux, dateDebut, jour);
          setTaux(0);
          setLibelle("");
          setValeur("");
          setJour("");
          setTaux("");
          setDateDebut(null);
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="libellé"
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
          required
        />
        <div className="d-flex gap-3">
          <input
            type="number"
            className="form-control"
            placeholder="valeur"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
          />
          <input
            type="number"
            className="form-control"
            placeholder="taux d'amortissement"
            taux={taux}
            onChange={(e) => setTaux(e.target.value)}
            required
          />
        </div>
        <DatePicker
          size="lg"
          placeholder="Date debut"
          style={{ width: "100%", color: "#E5E7EB" }}
          format="yyyy-MM-dd"
          value={dateDebut}
          onChange={(value) => setDateDebut(value)}
        />

        <AnimatePresence>
          {!type && (
            <motion.input
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.2 }}
              type="number"
              className="form-control"
              placeholder="jour"
              min={0}
              value={jour}
              required={!type ? true : false}
              onChange={(e) => setJour(e.target.value)}
            />
          )}
        </AnimatePresence>
        <button className="btn btn-primary mt-3">Ajouter la possession</button>
      </form>
    </div>
  );
}
export default CreatePossessionForm;
