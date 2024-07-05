import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import pantallasService from '../services/pantallas.service.js';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { Trash, PencilSquare, Search, PlusCircle } from 'react-bootstrap-icons';

export default function Pantallas({ onVolver, onActualizarPant, onRegistrarPant }) {

    const [pantallas, setPantallas] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const loadPantallas = async (filter) => {
        try {
            const data = await pantallasService.getAllPantallas(filter); // Método para obtener todos los notebooks desde el servicio
            setPantallas(data);
        } catch (error) {
            console.error("Error loading pantallas:", error);
        }
    };

    const onEliminarPant = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar?'))
            await pantallasService.deletePantalla(id)
        loadPantallas()
    }


    useEffect(() => {
        loadPantallas();
    }, []);

    const onSubmit = (data) => {
        loadPantallas(data.descripcion);
    };

    const pantallaItems = pantallas.map(pantalla => (
        <tr key={pantalla.IdPantalla}>
            <td>{pantalla.Descripcion}</td>
            <td>{pantalla.Precio}</td>
            <td>{pantalla.Stock}</td>
            <td>{pantalla.FechaFabricacion}</td>
            <td>{pantalla.MarcaNombre}</td>
            <td>{pantalla.EnVenta? 'Cuenta con unidades a la venta' : 'No se encuentra a la venta en este momento'}</td>
            <td>
                <Button variant="link" className="text-danger me-2" onClick={()=>{onEliminarPant(pantalla.IdPantalla)}}> 
                    <Trash />
                </Button>
                <Button variant="link" className="text-primary" onClick={()=>{onActualizarPant(pantalla)}}>
                    <PencilSquare />
                </Button>
            </td>
        </tr>
    ));

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <span>Pantallas</span> 
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex align-items-center ms-auto">
                    <InputGroup style={{ maxWidth: '300px' }}>
                        <FormControl
                            type="text"
                            placeholder="Filtrar por descripcion"
                            {...register("descripcion")}
                        />
                        <Button variant="primary" type="submit">
                            <Search />
                        </Button>
                    </InputGroup>
                </form>
                <Button variant="success" className="ms-3" onClick={onRegistrarPant}>
                        <PlusCircle /> Nueva
                </Button>
            </div>

            <div className="card-body">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Fecha de Fabricacion</th>
                            <th>Marca</th>
                            <th>Disponibilidad</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                <tbody>{pantallaItems}</tbody>
                </table>
                <div className="d-flex justify-content-start">
                    <button className="btn btn-secondary" onClick={onVolver}>Volver al inicio</button>
                </div>
            </div>
        </div>
    );
}