import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Main() {

  useEffect(() => {
    consumeAPI()
  }, []);

  const [pokemonArray, setPokemonArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [previousPage, setPreviousPage] = useState()
  const [nextPage, setNextPage] = useState()

  function consumeAPI() {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        let data = response.data.results
        let previous = response.data.previous
        let next = response.data.next

        setPokemonArray(data)

        setPreviousPage(previous)
        setNextPage(next)

        setIsLoading(true)
      })
  }

  function getNextPage() {
    axios.get(nextPage)
      .then((response) => {
        let data = response.data.results
        setPokemonArray(data)

        setPreviousPage(response.data.previous)
        setNextPage(response.data.next)

        setIsLoading(true)
      })
  }

  function getPreviousPage() {
    axios.get(previousPage)
      .then((response) => {
        let data = response.data.results

        setPokemonArray(data)

        setPreviousPage(response.data.previous)
        setNextPage(response.data.next)
        
        setIsLoading(true)
      })
  }

  function goToPokePage(value) {
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
        <Container style={{}}>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <p className="textHead">
              Pokédex
            </p>
            {pokemonArray.map((item, index) => {
              return (
                <Col key={index} xs={12} md={4} xl={3} className="menuCardStyle" style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(240,240,240)' }}>
                  <Col key={index++}>
                    <Col key={index++} style={{ display: 'flex', justifyContent: 'center', backgroundImage: 'linear-gradient(-15deg, rgb(240,0,0) 10%, rgb(240,240,240) 70%)', borderRadius: '5rem' }}>
                      <h2 key={index++} style={{ marginTop: '-1rem' }}>
                        #{item.url.split("/")[6]}
                      </h2>
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.url.split("/")[6]}.png`}
                        style={{ width: '80%' }}
                      />
                    </Col>
                    <h2 key={index++} style={{ display: 'flex', justifyContent: 'center', textTransform: 'capitalize' }}>
                      {item.name === "Ho-Oh" || "Porygon-Z"
                        ? <div>
                          {item.name}
                        </div>
                        : <div>
                          {item.name.split("-")[0]}
                        </div>
                      }
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Link key={index++} to={`/pokemon-detail`} state={{ from: `${item.name}` }}>

                        <button key={index++} className="btn" onClick={() => goToPokePage(item.url.split("/")[6])}>
                          More info
                        </button>
                      </Link>
                    </div>
                  </Col>
                </Col>
              )
            })
            }
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn" style={{ width: '10%', margin: '1rem' }} onClick={() => getPreviousPage()}>
                previous
              </button>
              <button className="btn" style={{ width: '10%', margin: '1rem' }} onClick={() => getNextPage()}>
                next
              </button>
            </Col>
          </Row>
        </Container>
      }
    </div>
  );
}

export default Main;