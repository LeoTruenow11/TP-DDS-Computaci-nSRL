const URL = "http://localhost:4000/api/marcas"

async function getByFilters(filter){
    let apiUrl = filter ? `${URL}/?nombre=${filter}` : URL;
    const res = await fetch(apiUrl,{method: 'GET'})

    return await res.json()
}

async function saveMarca(marca) {
    try {
        const method = marca.IdMarca === undefined ? 'POST' : 'PUT';
        const res = await fetch(URL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(marca)
        });
        if (!res.ok) {
            throw new Error(`Error saving marca: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error in saveMarca:", error.message);
        throw error;
    }
}

async function deleteMarca(IdMarca) {
    const res = await fetch(`${URL}/${IdMarca}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error(`Error deleting marca: ${res.statusText}`);
    }
    return await res.json();
}

export default { getByFilters, saveMarca, deleteMarca }