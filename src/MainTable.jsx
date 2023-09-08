import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./MainTable.css";

Modal.setAppElement("#root");

function MainTable({ records, setRecords, filterOption }) {
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isFormIncomplete, setIsFormIncomplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingRecord, setEditingRecord] = useState({
    name: "",
    type: "entrada",
    value: "",
    date: getCurrentDate(),
  });

  const filteredRecords =
    filterOption === "entrada"
      ? records.filter((record) => record.type === "entrada")
      : filterOption === "saída"
      ? records.filter((record) => record.type === "saída")
      : records;

  const isFormValid = () => {
    return (
      editingRecord.name.trim() !== "" &&
      editingRecord.type.trim() !== "" &&
      editingRecord.value.trim() !== "" &&
      editingRecord.date.trim() !== ""
    );
  };

  useEffect(() => {
    if (isButtonClicked) {
      setIsFormIncomplete(!isFormValid());
    }
  }, [editingRecord, isButtonClicked]);

  const handleAddRecord = () => {
    setIsButtonClicked(true);
    if (isFormValid() && !isModalOpen) {
      if (editingIndex === -1) {
        const newRecord = { ...editingRecord };
        const updatedRecords = [...records, newRecord];
        setRecords(updatedRecords);
        localStorage.setItem("records", JSON.stringify(updatedRecords));
      } else {
        const updatedRecords = [...records];
        updatedRecords[editingIndex] = { ...editingRecord };
        setRecords(updatedRecords);
        localStorage.setItem("records", JSON.stringify(updatedRecords));
      }

      clearFields();
      setEditingIndex(-1);
    } else {
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsButtonClicked(false);
        setIsFormIncomplete(false);
      }, 5000);
    }
  };

  const clearFields = () => {
    setEditingRecord({
      name: "",
      type: "entrada",
      value: "",
      date: getCurrentDate(),
    });
    setEditingIndex(-1);
  };

  const handleEditRecord = (index) => {
    const recordToEdit = records[index];
    setEditingRecord({ ...recordToEdit });
    setEditingIndex(index);
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("records") || "[]");
    setRecords(storedRecords);
  }, []);

  return (
    <div className="main-table">
      <div className="record-form">
        <input
          type="text"
          placeholder="Digite o  registro"
          value={editingRecord.name}
          maxLength={20}
          onChange={(e) =>
            setEditingRecord({ ...editingRecord, name: e.target.value })
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddRecord();
            }
          }}
        />

        <select
          value={editingRecord.type}
          onChange={(e) =>
            setEditingRecord({ ...editingRecord, type: e.target.value })
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddRecord();
            }
          }}
        >
          <option value="entrada">Entrada</option>
          <option value="saída">Saída</option>
        </select>
        <input
          type="number"
          placeholder="Digite o valor"
          value={editingRecord.value}
          onChange={(e) =>
            setEditingRecord({ ...editingRecord, value: e.target.value })
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddRecord();
            }
          }}
        />
        <input
          type="date"
          value={editingRecord.date}
          onChange={(e) =>
            setEditingRecord({ ...editingRecord, date: e.target.value })
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddRecord();
            }
          }}
        />
        <button onClick={handleAddRecord} disabled={isFormIncomplete}>
          Adicionar
        </button>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={true}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Erro"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <div className="modal-content">
            <p>Por favor, preencha todos os campos!</p>
          </div>
        </Modal>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr className="empty-row">
                <td colSpan="5">Inclua seus registros no formulário acima!</td>
              </tr>
            ) : (
              filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.name}</td>
                  <td>{record.type}</td>
                  <td>R$ {parseFloat(record.value).toFixed(2)}</td>
                  <td className="dateInput">{formatDate(record.date)}</td>
                  <td>
                    <button onClick={() => handleEditRecord(index)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button onClick={() => handleDeleteRecord(index)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainTable;
