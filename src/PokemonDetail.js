import React from 'react';
import Link from 'react-router-dom';
import { Container, Row, Col, Image, Spinner, Table, Card, ListGroup } from 'react-bootstrap'
import './App.css';
import Main from "./Main"
import MainRoutes from "./MainRoutes";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

function PkmnDetail() {

    useEffect(() => {
        getPkmnName()
    }, []);

    const location = useLocation();
    const pkmnName = location.state.from;
    const [isLoading, setIsLoading] = useState(false)
    const [pkmnPage, setPkmnPage] = useState()
    const [pkDex, setPkDex] = useState()

    function getPkmnName() {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`)
            .then((response) => {
                let pkmnInfo = response.data

                console.log(pkmnInfo)

                setPkmnPage(pkmnInfo)

                setIsLoading(true)
            })
    }

    function getPkDex() {
        axios.get(`https://pokeapi.glitch.me/v1/pokemon/:${pkmnName}`)
            .then((response) => {
                let dexInfo = response
                console.log(dexInfo)

                setPkDex(dexInfo)
                console.log(getPkDex)
                console.log(pkDex)
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
                : <div>
                    <Container>
                        <Row>
                            <Col md={4}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnPage.id}.png`} />
                                    <Card.Body>
                                        <Card.Title style={{ textTransform: 'capitalize' }}>{pkmnPage.name}</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <ListGroup>
                                    <ListGroup.Item>National Dex Nº {pkmnPage.id} </ListGroup.Item>
                                    <ListGroup.Item>
                                        {pkmnPage.types.map((item, index) => {
                                            return (
                                                <div style={{ textTransform: 'capitalize' }}>Type {index + 1}: {item.type.name}</div>
                                            )
                                        })
                                        }
                                    </ListGroup.Item>
                                    <ListGroup.Item>Weight: {pkmnPage.weight}lbs</ListGroup.Item>
                                    <ListGroup.Item>Height: {pkmnPage.height}ft</ListGroup.Item>
                                    <ListGroup.Item>
                                        Abilities:
                                        {pkmnPage.abilities.map((item, index) => {
                                            return (
                                                <div>
                                                    {item.is_hidden === false
                                                        ? <div style={{ textTransform: 'capitalize' }}>{item.ability.name}</div>
                                                        : <div style={{ textTransform: 'capitalize' }}>{item.ability.name} (hidden)</div>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table>
                                    <thead><tr>
                                        <th>Level</th>
                                        <th>Move</th>
                                        <th>Type</th>
                                        <th>Category</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td colSpan={2}>Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </div>
            }
        </div>

    );
}
export default PkmnDetail;