import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardGroup, Button, Image } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import MainRoutes from "./MainRoutes";
import PokemonDetail from "./PokemonDetail";


function Main() {

  useEffect(() => {
    consumeAPI()
  }, []);

  const [pokemonArray, setPokemonArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  function consumeAPI() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=898&offset=0")
      .then((response) => {
        let data = response.data.results

        setPokemonArray(data)
        setIsLoading(true)
      })
  }

  function searchPokemon(value) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
      .then((response) => {
      })
  }

  return (
    <div>
      {isLoading === false
        ? <div>
          <div className="wrapper">
            <div className="pokeball">
            </div>
          </div>
        </div>
        :
        <Container fluid>
          <Row md={12}>
            {pokemonArray.map((item, index) => {
              return (
                <Col key={index} md={3} className="menuCardStyle" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <div key={index + 1}>
                    <div key={index + 2}>
                      <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
                    </div>
                    <h2 key={index + 3}>
                      {item.name}
                    </h2>
                    <Link
                      key={index + 4}
                      to={`/pokemon-detail`}
                      state={{ from: `${item.name}` }}
                    >
                      <button key={index + 5} style={{ padding: '1rem' }} onClick={() => searchPokemon(item.name)}>
                        More info
                      </button>
                    </Link>
                  </div>
                </Col>
              )
            })
            }
          </Row>
        </Container>
      }
    </div>
  );
}

export default Main;