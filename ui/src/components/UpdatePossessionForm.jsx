import { useEffect, useRef } from "react";
import { DatePicker } from "rsuite";

function UpdatePossessionForm({
  onSubmit,
  libelle,
  onLibelleChange,
  dateFin,
  onDateFinChange,
  children,
}) {
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
          onSubmit();
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="libellé"
          value={libelle}
          onChange={(e) => onLibelleChange(e.target.value)}
          ref={libelleRef}
        />

        <DatePicker
          size="lg"
          placeholder="Date fin"
          style={{ width: "100%", color: "#E5E7EB" }}
          format="yyyy-MM-dd"
          value={dateFin}
          onChange={(value) => onDateFinChange(value)}
        />

        <button className="btn btn-primary mt-3">Mettre à jour</button>
      </form>
    </div>
  );
}

export default UpdatePossessionForm;
