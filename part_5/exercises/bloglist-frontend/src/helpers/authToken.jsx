const getAuthToken = () => {
    // Consultar la informacion del usuario registrada en el localStorage
    const user = localStorage.getItem('user_auth_blogs')
    const token = user ? JSON.parse(user)?.token : null // Se aisla el token de autorizacion asociado al usuario

    return {
        headers: {
            Authorization: `Bearer ${token}` || null,
        },
    }
}

export default { getAuthToken }
