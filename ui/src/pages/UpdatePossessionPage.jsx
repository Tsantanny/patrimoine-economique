import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import instance from "../config/axiosConfig";

import toast, { Toaster } from "react-hot-toast";
import UpdatePossessionForm from "../components/UpdatePossessionForm";
import Header from "../components/Header";

function UpdatePossessionPage() {
  const { libelle } = useParams();
  const navigate = useNavigate();
  const [updatedLibelle, setUpdatedLibelle] = useState(libelle);
  const [dateFin, setDateFin] = useState("");
  function handleSubmit() {
    if (!dateFin) {
      toast.error("Veuillez selectionner une date");
    } else {
      const body = {
        newLibelle: updatedLibelle,
        dateFin: typeof dateFin !== "string" ? dateFin.toISOString() : "",
      };
      instance
        .put(`/possession/${libelle}`, body)
        .then(() => {
          toast.success("La possession a été mis à jour avec succes");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch(() => toast.error("La requete a échoué"));
    }
  }

  return (
    <>
      <Header></Header>

      <div className="container d-flex justify-content-center mt-5">
        <UpdatePossessionForm
          onSubmit={handleSubmit}
          libelle={updatedLibelle}
          onLibelleChange={(value) => setUpdatedLibelle(value)}
          dateFin={dateFin}
          onDateFinChange={(value) => setDateFin(value)}
        >
          <Toaster
            position="top-center"
            reverseOrder={false}
            containerStyle={{
              position: "absolute",
              top: 10,
              width: 2000,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </UpdatePossessionForm>
      </div>
    </>
  );
}

export default UpdatePossessionPage;
