import { DateRangePicker, DatePicker } from "rsuite";

function SelectDateRange({ onSubmit, onDateRangeChange, value, children }) {
  return (
    <>
      <form
        className="d-flex flex-column gap-4  select-date-range"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <DateRangePicker
          size="lg"
          placeholder="Date debut ~ Date fin"
          appearance="default"
          style={{ width: "100%", color: "#E5E7EB" }}
          value={value}
          onChange={(date) => {
            onDateRangeChange(date);
          }}
        />
        {children}
        <button className="btn btn-dark">Valider</button>
      </form>
    </>
  );
}
export default SelectDateRange;
