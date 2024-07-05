import React, { useState, useEffect } from 'react';
import procesadoresService from '../services/procesadores.service';
import { useForm } from 'react-hook-form';
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { Trash, PencilSquare, Search, PlusCircle } from 'react-bootstrap-icons'

export default function Procesadores({ onVolver, onRegistrarP, onActualizarP }) {

    const [procesadores, setProcesadores] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const loadProcesadores = async (filter) => {
        try {
            const data = await procesadoresService.getByFilters(filter);
            setProcesadores(data);
        } catch (error) {
            console.error("Error loading procesadores:", error);
        }
    };

    const onEliminarP = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar?')) {
            try {
                await procesadoresService.deleteProcesador(id);
            } catch (error) {
                if (error.message.includes('Bad Request')) {
                    window.alert('No es posible eliminar el procesador, está vinculado a una notebook');
                } else {
                    console.error('Error eliminando notebook:', error);
                }
            }
        }
        loadProcesadores();
    };
    

    useEffect(() => {
        loadProcesadores();
    }, []);

    const onSubmit = (data) => {
        loadProcesadores(data.nombre)
    }

    const tbody = procesadores.map(e => 
        <tr key={e.IdProcesador}>
            <td>{e.Nombre}</td>
            <td>{e.Precio}</td>
            <td>{e.Stock}</td>
            <td>{e.FechaRecibido}</td>
            <td>{e.Disponible ? 'Se encuentra disponible' : 'No se encuentra disponible'}</td>
            <td>
                <Button variant="link" className="text-danger me-2" onClick={()=>{onEliminarP(e.IdProcesador)}}> 
                    <Trash />
                </Button>
                <Button variant="link" className="text-primary" onClick={()=>{onActualizarP(e)}}>
                    <PencilSquare />
                </Button>
            </td>
        </tr>
    );

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <span>Procesadores</span> 
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex align-items-center ms-auto">
                    <InputGroup style={{ maxWidth: '300px' }}>
                        <FormControl
                            type="text"
                            placeholder="Filtrar por nombre"
                            {...register("nombre")}
                        />
                        <Button variant="primary" type="submit">
                            <Search />
                        </Button>
                    </InputGroup>
                </form>
                <Button variant="success" className="ms-3" onClick={onRegistrarP}>
                        <PlusCircle /> Nueva
                </Button>
            </div>

            <div className="card-body">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Fecha recibido</th>
                            <th>Disponible</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                <tbody>{tbody}</tbody>
                </table>
                <div className="d-flex justify-content-start">
                    <button className="btn btn-secondary" onClick={onVolver}>Volver al inicio</button>
                </div>
            </div>
        </div>
    );
}
