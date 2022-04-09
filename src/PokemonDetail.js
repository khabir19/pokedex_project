
import React from 'react';
import './App.css';
import {
    useEffect,
    useState
} from 'react';
import {
    BrowserRouter as
        Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Image,
    Spinner,
    Table,
    Card,
    ListGroup,
    Button
} from 'react-bootstrap'
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
                            <Col xs={2} md={1}>
                                <Link
                                    to={"/"}
                                >
                                    <div
                                        className="btn"
                                        style={{ display: 'flex', justifyContent: 'center' }}
                                    >
                                        <AiFillCaretLeft style={{ marginTop: '0.25rem' }}>
                                        </AiFillCaretLeft>
                                        <spam>
                                            Back
                                        </spam>
                                    </div>
                                </Link>
                            </Col>
                            <Col xs={6} md={4}>
                                <Card style={{ width: '18rem', marginTop: '2rem' }}>
                                    <Card.Img
                                        variant="top"
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnPage.id}.png`}
                                    />
                                    <Card.Body>
                                        <Card.Title style={{ textTransform: 'capitalize' }}>
                                            {pkmnPage.name}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col
                                xs={6}
                                md={6}
                            >
                                <ListGroup style={{ marginTop: '2rem' }}>
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
                            </Col>
                        </Row>
                    </Container>
                </div>
            }
        </div >
    );
}
export default PkmnDetail;