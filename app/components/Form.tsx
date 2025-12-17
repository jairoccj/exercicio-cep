"use client"
import { useState } from "react";
import { useEffect } from "react";

export default function Form() {
  const [ cep, setCep ] = useState("");
  const [ logradouro, setLogradouro ] = useState("");
  const [ numero, setNumero ] = useState("");
  const [ bairro, setBairro ] = useState("");
  const [ uf, setUf ] = useState("");
  const [ cidade, setCidade ] = useState("");
  const [ erro, setErro ] = useState(false);

  async function fetchInfo(){
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const content = await response.json();
    return content;
  }

  async function updateInfo(){
    const content = await fetchInfo();
    if(!content.erro){
      setLogradouro(content.logradouro);
      setBairro(content.bairro);
      setUf(content.uf);
      setCidade(content.localidade);
      setErro(false);
    }
    else{
      setErro(true);
      setLogradouro("");
      setBairro("");
      setUf("");
      setCidade("");
      setNumero("");
    }
  }

  function cepInput(){
    if(erro == false){
      return(
        <input 
          type="text"
          required
          value={cep}
          placeholder="CEP"
          className="border-2 border-gray-200 mb-2"
          onChange={(e) => setCep(e.target.value)}/>        
      )
    }else{
      return(
        <>
        <input 
          type="text"
          required
          value={cep}
          placeholder="CEP"
          className="border-2 border-red-400 mb-2 bg-red-100"
          onChange={(e) => setCep(e.target.value)}/>        
          <p className="text-red-400 mb-2">O CEP informado é inválido.</p>
        </>
      )
    }
  }

  useEffect(() => {
    if(cep.length == 8){
      updateInfo();
      cepInput();
    }
  }, [cep])
  
  return (
    <div className="text-black">
      <form className="flex flex-col bg-white size-200 items-center justify-center">
          <h1 className="text-black text-7xl mb-5">Adress</h1>
          
          {cepInput()}

          <input 
          type="text"
          required
          value={logradouro}
          placeholder="Rua"
          className="border-2 border-gray-200 mb-2"
          onChange={(e) => setLogradouro(e.target.value)}/>
          <input 
          type="text"
          required
          value={numero}
          placeholder="Número"
          className="border-2 border-gray-200 mb-2"
          onChange={(e) => setNumero(e.target.value)}/>
          <input 
          type="text"
          required
          value={bairro}
          placeholder="Bairro"
          className="border-2 border-gray-200 mb-2"
          onChange={(e) => setBairro(e.target.value)}/>
          <input 
          type="text"
          required
          value={uf}
          placeholder="Estado"
          className="border-2 border-gray-200 mb-2"
          onChange={(e) => setUf(e.target.value)}/>
          <input 
          type="text"
          required
          value={cidade}
          placeholder="Cidade"
          className="border-2 border-gray-200 mb-2"
          onChange={(e) => setCidade(e.target.value)}/>
      </form>
    </div>
  );
}
