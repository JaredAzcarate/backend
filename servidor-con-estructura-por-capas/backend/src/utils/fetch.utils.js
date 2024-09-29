
export const customFetch = async (endpoint, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${process.env.BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        // Intenta convertir la respuesta a JSON si es posible
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
