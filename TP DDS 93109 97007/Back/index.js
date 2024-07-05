import express from 'express';
import cors from 'cors';
import procesadoresRouter from './routers/procesadores.routes.js';
import notebooksRoutes from './routers/notebooks.routes.js'
import marcasRoutes from './routers/marcas.routes.js'
import pantallasRoutes from './routers/pantallas.routes.js'

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/notebooks', notebooksRoutes);
app.use('/api/procesadores', procesadoresRouter);
app.use('/api/pantallas', pantallasRoutes);
app.use('/api/marcas', marcasRoutes);
/*
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
*/
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
}

export default app;
