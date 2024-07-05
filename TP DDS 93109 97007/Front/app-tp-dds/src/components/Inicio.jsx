import React, { act, useState } from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import Procesadores from './Procesadores';
import Notebooks from './Notebooks';
import RegistroN from './RegistroN';
import RegistroP from './RegistroP';
import Marcas from './Marcas';
import RegistrarMarcas from './RegistrarMarcas'
import Pantallas from './Pantalla';
import RegistrarPantallas from './RegistrarPant';

export default function Inicio() {

    const [action, setAction] = useState('I')
    const [item, setItem] = useState({})

    const onProcesadores = () =>{
        setAction('P')
        setItem({})
    }
    
    const onNotebooks = () => {
        setAction('N'); // Puedes manejarlo en el futuro para notebooks
        setItem({})
    };

    const onVolver = () => {
        setAction('I')
    }

    const onRegistrarN = () => {
        setAction('NN')
    }

    const onActualizarN = async(item)=>{
        setItem(item)
        setAction('NN')
    }

    const onRegistrarP = () =>{
        setAction('NP')
    }

    const onActualizarP = async(item)=>{
        setItem(item)
        setAction('NP')
    }

    const onMarcas = () =>{
        setAction('M')
        setItem({})
    }

    const onPantallas = () => {
        setAction('Pant'); // Puedes manejarlo en el futuro para notebooks
        setItem({})
    };

    const onRegistrarPant = () => {
        setAction('NPantalla')
    }

    const onActualizarPant = async(item)=>{
        setItem(item)
        setAction('NPantalla')
    }

    const onRegistrarM = () =>{
        setAction('NM')
    }

    const onActualizarM = async(item)=>{
        setItem(item)
        setAction('NM')
    }

    return (
        <>
            {     
                action === 'I' && (
                    <>
                        <Navbar bg="light" variant="light">
                            <Container>
                                <Nav className="me-auto">
                                <Nav.Link onClick={onMarcas} style={{ cursor: 'pointer' }}>Marcas</Nav.Link>
                                <Nav.Link onClick={onProcesadores} style={{ cursor: 'pointer' }}>Procesadores</Nav.Link>
                                <Nav.Link onClick={onNotebooks} style={{ cursor: 'pointer' }}>Notebooks</Nav.Link>
                                <Nav.Link onClick={onPantallas} style={{ cursor: 'pointer' }}>Pantallas</Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                        <Container className="mt-4">
                            <div className="p-5 rounded" style={{ backgroundColor: "lightgray" }}>
                                <h1>Computación SRL</h1>
                                <p>Este ejemplo está desarrollado con las siguientes tecnologías:</p>
                                <p>
                                    Backend: NodeJs, Express, WebApiRest, Swagger, Sequelize, Sqlite
                                    múltiples capas en Javascript/Typescript.
                                </p>
                                <p>
                                    Frontend: Single Page Application, HTML, CSS, Bootstrap, NodeJs,
                                    Javascript y React.
                                </p>
                            </div>
                        </Container>
                    </>
                )
            }
            {
                action === 'P' && (
                    <Procesadores onVolver={onVolver} onRegistrarP={onRegistrarP} onActualizarP={onActualizarP}></Procesadores>
                )
            }
            {
                action === 'N' && (
                    <Notebooks onVolver={onVolver} onRegistrarN={onRegistrarN} onActualizarN={onActualizarN}></Notebooks>
                )
            }
            {
                action === 'NN' && (
                    <RegistroN onNotebooks={onNotebooks} item={item}></RegistroN>
                )
            }
            {
                action === 'NP' && (
                    <RegistroP onProcesadores={onProcesadores} item={item}></RegistroP>
                )
            }
            {
                action === 'M' && (
                    <Marcas onVolver={onVolver} onRegistrarM={onRegistrarM} onActualizarM={onActualizarM}></Marcas>
                )
            }
            {
                action === 'NM' && (
                    <RegistrarMarcas onMarcas={onMarcas} item={item} onActualizarM={onActualizarM}></RegistrarMarcas>
                )
            }
            {
                action === 'Pant' && (
                    <Pantallas onVolver={onVolver} onRegistrarPant={onRegistrarPant} onActualizarPant={onActualizarPant}></Pantallas>
                )
            }
            {
                action === 'NPantalla' && (
                    <RegistrarPantallas onPantallas={onPantallas} item={item} onActualizarPant={onActualizarPant}></RegistrarPantallas>
                )
            }
        </>
    );
}