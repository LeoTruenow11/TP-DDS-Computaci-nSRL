const URL = "http://localhost:4000/api/pantallas";

async function getAllPantallas(filter) {
    let apiUrl = filter ? `${URL}/?desc=${filter}` : URL;
    const res = await fetch(apiUrl, { method: 'GET' });

    return await res.json();
}

async function savePantalla(pantalla) {
    try {
        const method = pantalla.IdPantalla === undefined ? 'POST' : 'PUT';
        const res = await fetch(URL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pantalla)
        });
        if (!res.ok) {
            throw new Error(`Error saving pantalla: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error in savePantalla:", error.message);
        throw error;
    }
}

async function deletePantalla(idPantalla) {
    const res = await fetch(`${URL}/${idPantalla}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error(`Error deleting pantalla: ${res.statusText}`);
    }
    return await res.json();
}

export default { getAllPantallas, savePantalla, deletePantalla };