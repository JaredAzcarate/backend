
export const initSessionController = async (req, res) => {
    const cookie = req.cookies.sessionId
    try {
        res.status(200).send({ status: 'success', message: 'Estas en home', sessionId: cookie });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}