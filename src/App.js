//Bloco de importação do código
import { useState } from "react"; 
import { FiSearch } from "react-icons/fi";
import './style.css'; 
import api from "./services/api" 

function App() {

  const [input, setInput] = useState(''); 
  const [cnpj, setCNPJ] = useState({}); 

  async function handleSearch(){ 

    if(input === ''){ 
      alert("Preencha com algum CNPJ!")
        return; 
    }
    
    try{ 
      const response = await api.get(`${input}`) 
      setCNPJ(response.data) 
      setInput("")
    }catch{ 
        alert("Erro ao buscar CNPJ!")
        setInput("")
      }
  }


return ( 
  <div className="container">
    <h1 className="title">Consultar CNPJ</h1>

    <div className="containerInput">
      <input
      type="text"
      placeholder="Digite o CNPJ..."  
      value={input} 
      onChange={(e) => setInput(e.target.value)} 
      />

      <button className="buttonSearch" onClick={handleSearch}> 
        <FiSearch size={25} color="#FFF"/>
      </button>
    </div>

    {Object.keys(cnpj).length > 0 && (
    <main className="main">
      <h3>Razão Social: {cnpj.razao_social}</h3>
      <span>Data Registro:{cnpj.data_registro}</span>
      <span>Email: {cnpj.email}</span>
      <span>Status de funcionalidade: {cnpj.status}</span>
      <span>{cnpj.cep} - {cnpj.uf}</span>
    </main>
    )}
  </div>
);
}

export default App;
