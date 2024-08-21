import { useState } from "react";
import instance from "../config/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

import Header from "../components/Header";
import CreatePossessionForm from "../components/CreatePossessionForm";

function CreatePossessionPage() {
  const [type, setType] = useState(true);
  const [libelle, setLibelle] = useState("");
  const [valeur, setValeur] = useState("");
  const [taux, setTaux] = useState("");
  const [dateDebut, setDateDebut] = useState(null);
  const [jour, setJour] = useState("");

  function handleSubmit() {
    const newPossessionData = jour
      ? {
          libelle: libelle,
          valeur: valeur,
          dateDebut: dateDebut !== null ? dateDebut.toISOString() : null,
          tauxAmortissement: taux == 0 ? null : parseFloat(taux),
          jour: parseInt(jour),
        }
      : {
          libelle: libelle,
          valeur: valeur,
          dateDebut: dateDebut !== null ? dateDebut.toISOString() : null,
          tauxAmortissement: taux == 0 ? null : parseFloat(taux),
        };
    if (dateDebut == null) {
      toast.error("Veuillez selectionner une date");
    } else {
      instance.post("/possession", newPossessionData).then((res) => {
        res.data.status == "ok"
          ? toast.success(res.data.message)
          : toast.error(res.data.message);
        setTaux(0);
        setLibelle("");
        setValeur("");
        setJour("");
        setTaux("");
        setDateDebut(null);
      });
    }
  }

  return (
    <>
      <Header></Header>
      <div className="container d-flex justify-content-center mt-4">
        <CreatePossessionForm
          onSubmit={handleSubmit}
          type={type}
          onTypeClick={(type) => setType(type)}
          libelle={libelle}
          onLibelleChange={(value) => setLibelle(value)}
          valeur={valeur}
          onValeurChange={(value) => setValeur(value)}
          taux={taux}
          onTauxChange={(value) => setTaux(value)}
          dateDebut={dateDebut}
          onDateChange={(value) => setDateDebut(value)}
          jour={jour}
          onJourChange={(value) => setJour(value)}
        >
          <Toaster
            position="top-center"
            reverseOrder={false}
            containerStyle={{
              position: "absolute",
              top: 10,
              width: 350,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </CreatePossessionForm>
      </div>
    </>
  );
}

export default CreatePossessionPage;
