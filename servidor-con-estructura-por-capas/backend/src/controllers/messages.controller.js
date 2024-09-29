

export const messageErrorController = async (req, res) => {
    const { status, message, error, redirect } = req.body;

    res.render('404', { status: status, message: message, error: error, redirect: redirect  })
} 
