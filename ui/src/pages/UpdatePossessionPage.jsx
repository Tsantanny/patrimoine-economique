import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import instance from "../config/axiosConfig";
import UpdatePossessionForm from "../components/UpdatePossessionForm";

function UpdatePossessionPage() {
  const { libelle } = useParams();
  const navigate = useNavigate();

  function handleSubmit(updatedLibelle, dateFin) {
    dateFin = new Date(dateFin).toISOString();

    if (!dateFin) {
      toast.error("Veuillez selectionner une date");
    } else {
      const body = {
        newLibelle: updatedLibelle,
        dateFin: dateFin,
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
      <Header />

      <div className="container d-flex justify-content-center mt-5">
        <UpdatePossessionForm onSubmit={handleSubmit} libelle={libelle}>
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
