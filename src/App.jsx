import { useState, useEffect } from "react";
import Header from "./Header";
import CounterBox from "./CounterBox";
import MainTable from "./MainTable";
import "./App.css";

function App() {
  const [records, setRecords] = useState([]);
  const [filterOption, setFilterOption] = useState("total");

  // Atualização dos registros
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("records") || "[]");
    setRecords(storedRecords);
  }, []);

  return (
    <div className="App">
      <Header />
      <CounterBox
        records={records}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />
      <MainTable
        records={records}
        setRecords={setRecords}
        filterOption={filterOption}
      />
    </div>
  );
}

export default App;