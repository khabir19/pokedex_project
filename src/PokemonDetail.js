import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Spinner, Table, Card, ListGroup, Button } from 'react-bootstrap'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { AiFillCaretLeft } from "react-icons/ai";

function PkmnDetail() {
    useEffect(() => {
        getPkmnName()
    }, []);

    const location = useLocation();
    const pkmnName = location.state.from;
    const [isLoading, setIsLoading] = useState(false)
    const [pkmnPage, setPkmnPage] = useState()

    function getPkmnName() {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`)
            .then((response) => {
                let pkmnInfo = response.data

                setPkmnPage(pkmnInfo)
                setIsLoading(true)
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
                            <Col xs={12} md={12}>
                                <h1 style={{ textTransform: 'capitalize', marginTop: '1rem', textAlign: 'center' }}>
                                    {pkmnPage.name === "Ho-Oh" || "Porygon-Z"
                                        ? <div>
                                            {pkmnPage.name} #{pkmnPage.id}
                                        </div>
                                        : <div>
                                            {pkmnPage.name.split("-")[0]} #{pkmnPage.id}
                                        </div>
                                    }
                                </h1>
                            </Col>
                            <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Col xs={12} md={4}>
                                    <Card>
                                        <Card.Img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnPage.id}.png`}
                                            style={{ width: '100%' }}
                                        />
                                    </Card>
                                    <Link
                                        to={`/`}
                                    >
                                        <div className="btn" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                            <AiFillCaretLeft style={{ marginTop: '0.4rem' }}>
                                            </AiFillCaretLeft>
                                            <h6 style={{ marginTop: '0.4rem' }}>
                                                Back
                                            </h6>
                                        </div>
                                    </Link>
                                </Col>
                                <Col xs={12} md={4}>
                                    <ListGroup >
                                        <ListGroup.Item>
                                            National Dex Nº {pkmnPage.id}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {pkmnPage.types.map((item, index) => {
                                                return (
                                                    <div style={{ textTransform: 'capitalize' }}>
                                                        Type {index + 1}: {item.type.name}
                                                    </div>
                                                )
                                            })
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Weight: {pkmnPage.weight}lbs
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Height: {pkmnPage.height}ft
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Abilities:
                                            {pkmnPage.abilities.map((item, index) => {
                                                return (
                                                    <div>
                                                        {item.is_hidden === false
                                                            ? <div style={{ textTransform: 'capitalize' }}>
                                                                {item.ability.name}
                                                            </div>
                                                            : <div style={{ textTransform: 'capitalize' }}>
                                                                {item.ability.name} (hidden)
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <Table striped size="sm">
                                        <thead>
                                            <tr>
                                                <th>Stats</th>
                                                <th>Base Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {pkmnPage.stats.map((item, index) => {
                                                        return (
                                                            <div style={{ textTransform: 'capitalize' }}>
                                                                {item.stat.name}:
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                </td>
                                                <td>
                                                    {pkmnPage.stats.map((item, index) => {
                                                        return (
                                                            <div style={{ textTransform: 'capitalize' }}>
                                                                {item.base_stat}
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col xs={12} md={4}>
                                </Col>
                            </Row>
                        </Row>
                        <Col xs={12} md={2}>

                        </Col>
                    </Container>
                </div>
            }
        </div >
    );
}
export default PkmnDetail;