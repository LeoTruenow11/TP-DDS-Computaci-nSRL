import React, { useState, useEffect } from 'react';
import marcasService from '../services/marcas.service';
import { useForm } from 'react-hook-form';
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { Trash, PencilSquare, Search, PlusCircle } from 'react-bootstrap-icons'

export default function Marcas({ onVolver, onRegistrarM, onActualizarM }) {

    const [marcas, setMarcas] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const loadMarcas = async (filter) => {
        try {
            const data = await marcasService.getByFilters(filter);
            setMarcas(data);
        } catch (error) {
            console.error("Error loading marcas:", error);
        }
    };

    const onEliminarM = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar?')){
            try {
                await marcasService.deleteMarca(id)                
            } catch (error) {
                if (error.message.includes('marca')) {
                    window.alert('No es posible eliminar la marca, está vinculada a una notebook')
                } else {
                    console.error('Error eliminando la marca:', error)
                }
            }
        }
        loadMarcas()
    }

    useEffect(() => {
        loadMarcas();
    }, []);

    const onSubmit = (data) => {
        loadMarcas(data.nombre)
    }

    const tbody = marcas.map(e => 
        <tr key={e.IdMarca}>
            <td>{e.Nombre}</td>
            <td>{e.Proveedor}</td>
            <td>
                <Button variant="link" className="text-danger me-2" onClick={()=>{onEliminarM(e.IdMarca)}}> 
                    <Trash />
                </Button>
                <Button variant="link" className="text-primary" onClick={()=>{onActualizarM(e)}}>
                    <PencilSquare />
                </Button>
            </td>
        </tr>
    );

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <span>Marcas</span> 
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
                <Button variant="success" className="ms-3" onClick={onRegistrarM}>
                        <PlusCircle /> Nueva
                </Button>
            </div>

            <div className="card-body">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Proveedor</th>
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