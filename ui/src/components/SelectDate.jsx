function SelectDate({
  onSubmit,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  jour,
  onJourChange,
}) {
  return (
    <form
      className="col-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h4>Select Date Range</h4>
      <div className="d-flex gap-2 ">
        <div style={{ width: "100%" }}>
          <label htmlFor="">Date debut : </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div style={{ width: "100%" }}>
          <label htmlFor="">Date fin : </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div style={{ width: "100%" }}>
          <label htmlFor="">Jour : </label>
          <input
            type="select"
            value={jour}
            onChange={onJourChange}
            className="form-control"
            required
          />
        </div>
      </div>
      <button className="btn btn-dark">Submit</button>
    </form>
  );
}
export default SelectDate;
