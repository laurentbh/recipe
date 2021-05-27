import React  from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputRecipe from "./InputRecipe";
import Counter from './Counter';

const ContainerRecipe = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <InputRecipe />
                </Col>
                <Col >
                <Counter />
                    <span>Control </span>
                </Col>
            </Row>
        </Container>

    );

}

export default ContainerRecipe