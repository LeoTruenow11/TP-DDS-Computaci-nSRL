import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Card } from 'react-bootstrap';
import pantallasService from '../services/pantallas.service.js';
import marcasService from '../services/marcas.service.js';

export default function RegistroP({ onPantallas, onActualizarPant, item }) {
    const { register, handleSubmit, reset, setValue } = useForm({values: item});
    const [pantallas, setPantallas] = useState([]);
    const [marca, setMarca] = useState([])

    useEffect(() => {
        const fetchPantallas = async () => {
            const data = await pantallasService.getAllPantallas()
            setPantallas(data);
        };

        fetchPantallas();
    }, []);

    const onSubmit = async(data) => {
        const result = await pantallasService.savePantalla(data)
        if(result)
            onPantallas();
    };

    useEffect (() => {
        const fetchMarcas = async () => {
            const data = await marcasService.getByFilters() 
            setMarca(data);
        };

        fetchMarcas();
    }, []);

    useEffect(() => {
        if (item) {
            reset(item);
        }
    }, [item, reset]);

    

    return (
        <Card className="mx-auto my-4 w-50">
            <Card.Header>{item.IdPantalla !== undefined? 'Actualizar pantalla':'Registrar Nueva Pantalla'}</Card.Header>
            {console.log(item.IdPantalla)}
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="Descripcion">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese descripcion de la Pantalla"
                            {...register('Descripcion', { required: true })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Precio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese precio de la Pantalla"
                            {...register('Precio', { required: true })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese cantidad de Stock"
                            {...register('Stock', { required: true })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="FechaFabricacion">
                        <Form.Label>Fecha de Fabricacion</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Ingrese fecha de Fabricacion"
                            {...register('FechaFabricacion', { required: true })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="IdMarca">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control as="select" {...register('IdMarca', { required: true })}>
                            <option value="">Seleccione una marca</option>
                            {marca.map(marca => (
                                <option key={marca.IdMarca} value={marca.IdMarca}>
                                    {marca.Nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="EnVenta">
                        <Form.Check
                            type="checkbox"
                            label="EnVenta"
                            {...register('EnVenta')}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {item.IdPantalla !== undefined ? 'Actualizar' : 'Registrar'}
                    </Button>
                    <Button variant="secondary" onClick={() => reset()} className="ms-2">
                        Limpiar
                    </Button>
                    <Button variant="secondary" onClick={onPantallas} className="ms-2">
                        Volver
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}