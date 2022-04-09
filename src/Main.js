import React from 'react';
import './App.css';
import {
  useEffect,
  useState
} from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  Button,
  Image
} from 'react-bootstrap';
import {
  BrowserRouter as
    Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';

function Main() {

  useEffect(() => {
    consumeAPI()
  }, []);

  const [pokemonArray, setPokemonArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  function consumeAPI() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=21")
      .then((response) => {
        let data = response.data.results

        setPokemonArray(data)

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
        <Container>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <p className="textHead">
              Pokédex
            </p>
            {pokemonArray.map((item, index) => {
              return (
                <Col
                  key={index}
                  xs={12}
                  md={3}
                  className="menuCardStyle"
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <Col key={index++}>
                    <Col
                      key={index++}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundImage: 'linear-gradient(180deg, rgb(240,0,0) 50%, rgb(240,240,240) 50%)',
                        borderRadius: '50rem'
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.url.split("/")[6]}.png`}
                        style={{ width: '100%' }}
                      />
                    </Col>
                    <h2
                      key={index++}
                      style={{ display: 'flex', justifyContent: 'center', textTransform: 'capitalize' }}
                    >
                      {item.name}
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Link
                        key={index++}
                        to={`/pokemon-detail`}
                        state={{ from: `${item.name}` }}
                      >
                        <button
                          key={index++}
                          className="btn"
                          onClick={() => goToPokePage(item.name)}
                        >
                          More info
                        </button>
                      </Link>
                    </div>
                  </Col>
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