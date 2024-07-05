import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Card } from 'react-bootstrap';
import marcasService from '../services/marcas.service.js';

export default function RegistroM({ onMarcas, item }) {
    const { register, handleSubmit, reset } = useForm({values: item});

    const onSubmit = async(data) => {
        const result = await marcasService.saveMarca(data)
        if(result)
            onMarcas();
    };

    return (
        <Card className="mx-auto my-4 w-50">
            <Card.Header>{item.IdMarca !== undefined? 'Actualizar Marca':'Registrar Nueva marca'}</Card.Header>
            {console.log(item.IdMarca)}
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="Nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese nombre de la Marca"
                            {...register('Nombre', { required: true })}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="Proveedor">
                        <Form.Label>Proveedor</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder="Ingrese proveedor"
                            {...register('Proveedor', { required: true })}
                        />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Registrar
                    </Button>
                    <Button variant="secondary" onClick={() => reset()} className="ms-2">
                        Limpiar
                    </Button>
                    <Button variant="secondary" onClick={onMarcas} className="ms-2">
                        Volver
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}