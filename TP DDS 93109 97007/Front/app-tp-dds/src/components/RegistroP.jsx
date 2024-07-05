import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Card } from 'react-bootstrap';
import procesadoresService from '../services/procesadores.service';

export default function RegistroN({ onProcesadores, item }) {
    const { register, handleSubmit, reset } = useForm({values: item});

    const onSubmit = async(data) => {
        const result = await procesadoresService.saveProcesador(data)
        if(result)
            onProcesadores();
    };

    return (
        <Card className="mx-auto my-4 w-50">
            <Card.Header>{item.IdProcesador !== undefined? 'Actualizar procesador':'Registrar Nuevo procesador'}</Card.Header>
            {console.log(item.IdProcesador)}
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="Nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese nombre del Procesador"
                            {...register('Nombre', { required: true })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Precio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese precio del Procesador"
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
                    <Form.Group className="mb-3" controlId="FechaRecibido">
                        <Form.Label>Fecha de ingreso</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Ingrese fecha de ingreso"
                            {...register('FechaRecibido', { required: true })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Disponible">
                        <Form.Check
                            type="checkbox"
                            label="Disponible"
                            {...register('Disponible')}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Registrar
                    </Button>
                    <Button variant="secondary" onClick={() => reset()} className="ms-2">
                        Limpiar
                    </Button>
                    <Button variant="secondary" onClick={onProcesadores} className="ms-2">
                        Volver
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
