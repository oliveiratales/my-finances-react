import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Importe o PropTypes
import "./CounterBox.css";

function CounterBox({ records, filterOption, setFilterOption }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const incomeTotal = records
      .filter((record) => record.type === "entrada")
      .reduce((total, record) => total + parseFloat(record.value), 0);

    const expensesTotal = records
      .filter((record) => record.type === "saída")
      .reduce((total, record) => total + parseFloat(record.value), 0);

    const totalAmount = incomeTotal - expensesTotal;

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setTotal(totalAmount);
  }, [records]);

  return (
    <div className="counter-box">
      <div
        className={`counter-card ${filterOption === "entrada" ? "active" : ""}`}
        onClick={() => setFilterOption("entrada")}
      >
        <h2>Entradas</h2>
        <p>R$ {income.toFixed(2)}</p>
      </div>
      <div
        className={`counter-card ${filterOption === "saída" ? "active" : ""}`}
        onClick={() => setFilterOption("saída")}
      >
        <h2>Saídas</h2>
        <p>R$ {expenses.toFixed(2)}</p>
      </div>
      <div
        className={`counter-card ${filterOption === "total" ? "active" : ""}`}
        onClick={() => setFilterOption("total")}
      >
        <h2>Total</h2>
        <p>R$ {total.toFixed(2)}</p>
      </div>
    </div>
  );
}

CounterBox.propTypes = {
  records: PropTypes.array.isRequired,
  filterOption: PropTypes.string.isRequired,
  setFilterOption: PropTypes.func.isRequired,
};

export default CounterBox;
