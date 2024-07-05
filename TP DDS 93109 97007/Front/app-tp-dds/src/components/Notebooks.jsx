import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import notebooksService from '../services/notebooks.service';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { Trash, PencilSquare, Search, PlusCircle } from 'react-bootstrap-icons';

export default function Notebooks({ onVolver, onRegistrarN, onActualizarN }) {

    const [notebooks, setNotebooks] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const loadNotebooks = async (filter) => {
        try {
            const data = await notebooksService.getAllNotebooks(filter); // Método para obtener todos los notebooks desde el servicio
            setNotebooks(data);
        } catch (error) {
            console.error("Error loading notebooks:", error);
        }
    };

    const onEliminarN = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar?'))
            await notebooksService.deleteNotebook(id)
        loadNotebooks()
    }


    useEffect(() => {
        loadNotebooks();
    }, []);

    const onSubmit = (data) => {
        loadNotebooks(data.nombre);
    };

    const notebookItems = notebooks.map(notebook => (
        <tr key={notebook.IdNotebook}>
            <td>{notebook.Nombre}</td>
            <td>{notebook.Precio}</td>
            <td>{notebook.Stock}</td>
            <td>{notebook.FechaAlta}</td>
            <td>{notebook.ProcesadorNombre}</td>
            <td>{notebook.Activo ? 'Cuenta con unidades para entrega' : 'No podemos realizar entregas en este momento'}</td>
            <td>
                <Button variant="link" className="text-danger me-2" onClick={()=>{onEliminarN(notebook.IdNotebook)}}> 
                    <Trash />
                </Button>
                <Button variant="link" className="text-primary" onClick={()=>{onActualizarN(notebook)}}>
                    <PencilSquare />
                </Button>
            </td>
        </tr>
    ));

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <span>Notebooks</span> 
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
                <Button variant="success" className="ms-3" onClick={onRegistrarN}>
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
                            <th>Fecha de ingreso</th>
                            <th>Procesador</th>
                            <th>Disponible</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                <tbody>{notebookItems}</tbody>
                </table>
                <div className="d-flex justify-content-start">
                    <button className="btn btn-secondary" onClick={onVolver}>Volver al inicio</button>
                </div>
            </div>
        </div>
    );
}