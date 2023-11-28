import React, { useState } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  padding: 3rem;
  border-radius: 2rem;
  width: 30vw;
  align-self: center; 
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
`

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column-reverse;
    text-align: center;
    margin: .4rem;
    color: #A3A3A3;
    font-weight: 300;
    font-size: .9rem;
  }

  input {
    width: 10vw;
    align-self: center;
    outline: none;
    background: none;
    border: none;
    border-bottom: 2px solid #0A66C2;
    text-align: center;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const Button = styled.button`
  width: 6rem;
  padding: .4rem;
  border-radius: 1rem;
  outline: none;
  border: 1px solid white;
  align-self: center;
  margin-top: 1.4rem;
  background-color: #0A66C2;
  color: #FFF;
  font-weight: 700;

  &:hover {
    background-color: #0844A0;
  }
`

const ResultDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  h2 {
    padding: 0;
    margin: 0;
  }
  
  p {
    padding: 0;
    margin: .4rem 0;
  }
`

function App() {
  const [dados, setDados] = useState({
    capital_inicial: 0,
    taxa_juros: 0,
    tempo: 0,
  });
  const [valorFuturo, setValorFuturo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/calcular_valor_futuro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();

      if (response.ok) {
        setValorFuturo(data.valor_futuro);
      } else {
        console.error(data.erro);
      }
    } catch (error) {
      console.error('Erro na requisição:', error.message);
    }
  };

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Title>Calculadora de Juro Simples</Title>
      <Form onSubmit={handleSubmit}>
        <label>
          Capital Inicial:
          <input
            type="number"
            name="capital_inicial"
            value={dados.capital_inicial}
            onChange={handleChange}
          />
        </label>
        <label>
          Taxa de Juros (%):
          <input
            type="number"
            name="taxa_juros"
            value={dados.taxa_juros}
            onChange={handleChange}
          />
        </label>
        <label>
          Tempo (anos):
          <input 
            type="number"
            name="tempo"
            value={dados.tempo}
            onChange={handleChange}
          />
        </label>
        <Button type="submit">Calcular</Button>
      </Form>
      {valorFuturo !== null && (
        <ResultDiv>
          <h2>Valor Futuro:</h2>
          <p>{valorFuturo}</p>
        </ResultDiv>
      )}
    </Container>
  );
}

export default App;
