const URL = "http://localhost:4000/api/procesadores"

async function getByFilters(filter){
    let apiUrl = filter ? `${URL}/?nombre=${filter}` : URL;
    const res = await fetch(apiUrl,{method: 'GET'})

    return await res.json()
}

async function saveProcesador(procesador) {
    try {
        const method = procesador.IdProcesador === undefined ? 'POST' : 'PUT';
        const res = await fetch(URL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(procesador)
        });
        if (!res.ok) {
            throw new Error(`Error saving procesador: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error in saveProcesador:", error.message);
        throw error;
    }
}

async function deleteProcesador(IdProcesador) {
    const res = await fetch(`${URL}/${IdProcesador}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error(`Error deleting procesador: ${res.statusText}`);
    }
    return await res.json();
}

export default { getByFilters, saveProcesador, deleteProcesador }

