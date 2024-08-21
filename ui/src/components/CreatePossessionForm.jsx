import { DatePicker } from "rsuite";
import { AnimatePresence, motion } from "framer-motion";

function CreatePossessionForm({
  onSubmit,
  type,
  onTypeClick,
  libelle,
  onLibelleChange,
  valeur,
  onValeurChange,
  taux,
  onTauxChange,
  dateDebut,
  onDateChange,
  jour,
  onJourChange,
  children,
}) {
  return (
    <div className="create-possession col-6">
      {children}
      <h4 className="mb-3">Ajouter une nouvelle possession</h4>
      <div className="type mb-3">
        <h6>Selectionner le type :</h6>
        <div>
          <button
            className={type ? "btn btn-secondary" : "btn btn-light"}
            onClick={() => onTypeClick(true)}
          >
            Possession
          </button>
          <button
            className={!type ? "btn btn-secondary" : "btn btn-light"}
            onClick={() => onTypeClick(false)}
          >
            Flux
          </button>
        </div>
      </div>
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
          required
        />
        <div className="d-flex gap-3">
          <input
            type="number"
            className="form-control"
            placeholder="valeur"
            value={valeur}
            onChange={(e) => onValeurChange(e.target.value)}
            required
          />
          <input
            type="number"
            className="form-control"
            placeholder="taux d'amortissement"
            taux={taux}
            onChange={(e) => onTauxChange(e.target.value)}
            required
          />
        </div>
        <DatePicker
          size="lg"
          placeholder="Date debut"
          style={{ width: "100%", color: "#E5E7EB" }}
          format="yyyy-MM-dd"
          value={dateDebut}
          onChange={onDateChange}
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
              onChange={(e) => onJourChange(e.target.value)}
            />
          )}
        </AnimatePresence>
        <button className="btn btn-primary mt-3">Ajouter la possession</button>
      </form>
    </div>
  );
}
export default CreatePossessionForm;
