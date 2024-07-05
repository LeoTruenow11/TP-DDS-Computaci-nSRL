import request from 'supertest';
import app from '../index.js'; // Asegúrate de que esta ruta sea correcta

const procesadorAlta = {
  Nombre: "Procesador " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
};
const procesadorModificacion = {
  Nombre: "Procesador Modificado " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
};

// test route/procesadores GET
describe("GET /api/procesadores", () => {
    it("Debería devolver todos los procesadores", async () => {
        const res = await request(app).get("/api/procesadores");
        expect(res.statusCode).toEqual(200);

        expect(res.body).toEqual(
        expect.objectContaining({
            Items: expect.arrayContaining([
            expect.objectContaining({
                IdProcesador: expect.any(Number),
                Nombre: expect.any(String),
            }),
            ]),
            RegistrosTotal: expect.any(Number),
        })
        );
    });
    });

    // test route/procesadores/:id GET
    describe("GET /api/procesadores/:id", () => {
    it("Debería devolver el procesador con el id 1", async () => {
        const res = await request(app).get("/api/procesadores/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
        expect.objectContaining({
            IdProcesador: expect.any(Number),
            Nombre: expect.any(String),
        })
        );
    });
    });

    // test route/procesadores POST
    describe("POST /api/procesadores", () => {
    it("Debería devolver el procesador que acabo de crear", async () => {
        const res = await request(app).post("/api/procesadores").send(procesadorAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
        expect.objectContaining({
            IdProcesador: expect.any(Number),
            Nombre: expect.any(String),
        })
        );
    });
    });

    // test route/procesadores/:id PUT
    describe("PUT /api/procesadores/:id", () => {
    it("Debería devolver el procesador con el id 1 modificado", async () => {
        const res = await request(app)
        .put("/api/procesadores/1")
        .send(procesadorModificacion);
        expect(res.statusCode).toEqual(204);
    });
    });

    // test route/procesadores/:id DELETE
    describe("DELETE /api/procesadores/:id", () => {
    it("Debería devolver un mensaje de error si el procesador está vinculado a una notebook", async () => {
        // Asegúrate de que el procesador con id 1 esté vinculado a una notebook antes de ejecutar esta prueba
        const res = await request(app).delete("/api/procesadores/1");
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(
        expect.objectContaining({
            error: "No es posible eliminar el procesador, está vinculado a una notebook",
        })
        );
    });

    it("Debería eliminar el procesador si no está vinculado a ninguna notebook", async () => {
        // Asegúrate de que el procesador con id 2 no esté vinculado a ninguna notebook antes de ejecutar esta prueba
        const res = await request(app).delete("/api/procesadores/2");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
        expect.objectContaining({
            message: "Procesador eliminado correctamente",
        })
        );
    });
    });
