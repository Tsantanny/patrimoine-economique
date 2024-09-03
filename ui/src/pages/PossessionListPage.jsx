import instance from "../config/axiosConfig";
import { useState, useEffect, useRef } from "react";
import PossessionList from "../components/PossessionList";
import Header from "../components/Header";

function PossessionListPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [possessions, setPossessions] = useState();

  async function getData() {
    instance
      .get("/possession")
      .then((response) => {
        if (response.data.success) {
          setPossessions(response.data.data);
          setErrorMessage("");
        } else {
          setErrorMessage(response.data.message || "Erreur inconnue.");
        }
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message ||
            "Une erreur s'est produite lors de la requête."
        );
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <PossessionList
          possessions={possessions}
          getData={getData}
          errorMessage={errorMessage}
        ></PossessionList>
      </div>
    </>
  );
}

export default PossessionListPage;
