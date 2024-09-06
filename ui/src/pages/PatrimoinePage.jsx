import { useEffect, useState } from "react";
import instance from "../config/axiosConfig";
import { addMonths } from "date-fns";
import { formatDate, formatNumber } from "../utils/format.js";

import toast, { Toaster } from "react-hot-toast";
import { Calendar } from "react-date-range";
import SelectDateRange from "../components/SelectDateRange.jsx";
import CreatableSelect from "react-select/creatable";
import HeaderPatrimoine from "../components/HeaderPatrimoine.jsx";
import PatrimoineChart from "../components/PatrimoineChart.jsx";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "rsuite/dist/rsuite.min.css";
import "rsuite/dist/rsuite.min.css";

const dayOptions = Array.from({ length: 31 }, (_, index) => ({
  value: index + 1,
  label: `${index + 1}`,
}));

function PatrimoinePage() {
  const [dateRange, setDateRange] = useState(null);
  const [jour, setJour] = useState({});
  const [chartData, setChartData] = useState([
    {
      date: formatDate(new Date()),
      value: 14257899.543378994,
    },
    {
      date: formatDate(addMonths(new Date(), 1)),
      value: 14257899.543378994,
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patrimoineValue, setPatrimoineValue] = useState(0);

  function handleDateRangeSubmit() {
    if (jour.value && dateRange !== null) {
      const params = {
        type: "month",
        dateDebut: dateRange[0].toISOString(),
        dateFin: dateRange[1].toISOString(),
        jour: jour.value,
      };
      instance.get("/patrimoine/range", { params }).then((res) => {
        setChartData(res.data);
        setDateRange(null);
        setJour({});
      });
    } else {
      toast.error("Veuillez remplir tous les champs");
    }
  }

  function handleSelectDate() {
    instance.get(`/patrimoine/${selectedDate.toISOString()}`).then((e) => {
      setPatrimoineValue(e.data.value);
    });
  }

  useEffect(() => {
    const params = {
      type: "month",
      dateDebut: new Date().toISOString(),
      dateFin: addMonths(new Date(), 6).toISOString(),
      jour: new Date().getDate(),
    };
    instance.get("/patrimoine/range", { params }).then((res) => {
      setChartData(res.data);
    });
  }, []);

  useEffect(() => {
    handleSelectDate();
  }, [selectedDate]);

  return (
    <>
      <HeaderPatrimoine />
      {!patrimoineValue && (
        <div className="spin-container">
          <div className="d-flex justify-content-center spin">
            <i class="fas fa-spinner fa-pulse"></i>
          </div>
        </div>
      )}
      <div className="side-bar py-3">
        <div className="d-flex flex-column mt-4 evolution-title">
          <h6 className="mb-2">Suivi de l'évolution de votre patrimoine</h6>
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
          <SelectDateRange
            value={dateRange}
            onSubmit={handleDateRangeSubmit}
            onDateRangeChange={(dates) => setDateRange(dates)}
          >
            <CreatableSelect
              isClearable
              options={dayOptions}
              value={jour}
              onChange={(option) => setJour(option)}
              placeholder="Sélectionner un jour"
            />
          </SelectDateRange>
        </div>
        <div className="mt-4">
          <h6>Valeur du patrimoine</h6>
          <h6>
            {formatDate(selectedDate) === formatDate(new Date())
              ? "aujourd'hui : "
              : " au " + formatDate(selectedDate) + " : "}
            <span className="value">{formatNumber(patrimoineValue)}</span>
          </h6>
          <Calendar
            date={selectedDate}
            onChange={(item) => setSelectedDate(item)}
          />
        </div>
      </div>
      <div className="chart-container">
        <PatrimoineChart chartData={chartData}></PatrimoineChart>
      </div>
    </>
  );
}
export default PatrimoinePage;
