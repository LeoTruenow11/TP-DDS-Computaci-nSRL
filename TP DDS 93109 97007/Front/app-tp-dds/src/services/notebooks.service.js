const URL = "http://localhost:4000/api/notebooks";

async function getAllNotebooks(filter) {
    let apiUrl = filter ? `${URL}/?nombre=${filter}` : URL;
    const res = await fetch(apiUrl, { method: 'GET' });

    return await res.json();
}

async function saveNotebook(notebook) {
    try {
        const method = notebook.IdNotebook === undefined ? 'POST' : 'PUT';
        const res = await fetch(URL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notebook)
        });
        if (!res.ok) {
            throw new Error(`Error saving notebook: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error in saveNotebook:", error.message);
        throw error;
    }
}

async function deleteNotebook(idNotebook) {
    const res = await fetch(`${URL}/${idNotebook}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error(`Error deleting notebook: ${res.statusText}`);
    }
    return await res.json();
}

export default { getAllNotebooks, saveNotebook, deleteNotebook };