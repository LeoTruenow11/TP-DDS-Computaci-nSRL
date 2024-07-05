import { Router } from 'express';
import notebookService from '../src/services/notebooks.service.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const notebooks = await notebookService.getNotebooks(req.query);
        res.json(notebooks);
    } catch (error) {
        console.error("Error fetching notebooks:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const notebook = await notebookService.getNotebookById(id);
        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }

        res.json(notebook);
    } catch (error) {
        console.error("Error fetching notebook by ID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('', async (req, res) => {
    try {
        const newNotebook = req.body;
        const insertedNotebook = await notebookService.insertarNotebook(newNotebook);
        res.status(201).json(insertedNotebook);
    } catch (error) {
        console.error("Error inserting notebook:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('', async (req, res) => {
    try {
        const notebook = await notebookService.editarNotebook(req.body);
        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }

        return res.json(notebook);
    } catch (error) {
        console.error("Error editing notebook:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/*router.get('/nombre/:nombre', async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const notebook = await notebookService.getNotebookByName(nombre);
        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }

        res.json(notebook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});*/

router.get('/', async (req, res) => {
    try {
        const nombre = req.query.nombre; // Obtener el nombre del filtro desde query
        const notebooks = await notebookService.getNotebooks(nombre);
        res.json(notebooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const idNotebook = parseInt(req.params.id, 10);

        const notebookData = { IdNotebook: idNotebook };
        const deletedNotebook = await notebookService.eliminarNotebook(notebookData);

        if (!deletedNotebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }

        res.json({ message: "Notebook deleted successfully", deletedNotebook });
    } catch (error) {
        console.error("Error deleting notebook:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
