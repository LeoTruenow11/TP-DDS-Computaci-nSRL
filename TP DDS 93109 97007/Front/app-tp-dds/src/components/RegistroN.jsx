import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Card } from 'react-bootstrap';
import notebooksService from '../services/notebooks.service';
import procesadoresService from '../services/procesadores.service';

export default function RegistroN({ onNotebooks, onVolver, item }) {
    const { register, handleSubmit, reset, setValue } = useForm({values: item});
    const [procesadores, setProcesadores] = useState([]);

    useEffect(() => {
        const fetchProcesadores = async () => {
            const data = await procesadoresService.getByFilters()
            setProcesadores(data);
        };

        fetchProcesadores();
    }, []);

    const onSubmit = async(data) => {
        const result = await notebooksService.saveNotebook(data)
        if(result)
            onNotebooks();
    };

    useEffect(() => {
        if (item) {
            reset(item);
        }
    }, [item, reset]);

    return (
        <Card className="mx-auto my-4 w-50">
            <Card.Header>{item.IdNotebook !== undefined? 'Actualizar notebook':'Registrar Nueva Notebook'}</Card.Header>
            {console.log(item.IdNotebook)}
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="Nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese nombre de la Notebook"
                            {...register('Nombre', { required: true })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Precio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese precio de la Notebook"
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
                    <Form.Group className="mb-3" controlId="FechaAlta">
                        <Form.Label>Fecha de ingreso</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Ingrese fecha de ingreso"
                            {...register('FechaAlta', { required: true })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="IdProcesador">
                        <Form.Label>Procesador</Form.Label>
                        <Form.Control as="select" {...register('IdProcesador', { required: true })}>
                            <option value="">Seleccione un procesador</option>
                            {procesadores.map(procesador => (
                                <option key={procesador.IdProcesador} value={procesador.IdProcesador}>
                                    {procesador.Nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Activo">
                        <Form.Check
                            type="checkbox"
                            label="Activo"
                            {...register('Activo')}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {item.IdNotebook !== undefined ? 'Actualizar' : 'Registrar'}
                    </Button>
                    <Button variant="secondary" onClick={() => reset()} className="ms-2">
                        Limpiar
                    </Button>
                    <Button variant="secondary" onClick={onNotebooks} className="ms-2">
                        Volver
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
