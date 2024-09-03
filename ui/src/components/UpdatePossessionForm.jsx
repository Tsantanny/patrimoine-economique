import { useState, useEffect, useRef } from "react";
import { DatePicker } from "rsuite";

function UpdatePossessionForm({ onSubmit, libelle, children }) {
  const [updatedLibelle, setUpdatedLibelle] = useState(libelle);
  const [dateFin, setDateFin] = useState("");
  const libelleRef = useRef(null);
  useEffect(() => {
    libelleRef.current.focus();
    libelleRef.current.select();
  }, []);
  return (
    <div className="create-possession col-6">
      {children}
      <h4 className="mb-4">Mettre à jour la possession</h4>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(updatedLibelle, dateFin);
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="libellé"
          value={updatedLibelle}
          onChange={(e) => setUpdatedLibelle(e.target.value)}
          ref={libelleRef}
        />

        <DatePicker
          size="lg"
          placeholder="Date fin"
          style={{ width: "100%", color: "#E5E7EB" }}
          format="yyyy-MM-dd"
          value={dateFin}
          onChange={(value) => setDateFin(value)}
        />

        <button className="btn btn-primary mt-3">Mettre à jour</button>
      </form>
    </div>
  );
}

export default UpdatePossessionForm;
