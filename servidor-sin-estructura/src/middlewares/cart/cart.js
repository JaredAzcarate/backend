import cartsModel from "../../dao/models/carts.model.js";

export async function cartMiddleware(req, res, next) {
    // 1. Evaluar si existe carrito.
    // 2. Si existe, entonces traer el id del carrito de las cookies.
    // 3. Si no existe, entonces crear un nuevo carrito.
    if (!req.cookies.cartId) {
        try {
            const newCart = await cartsModel.create({});
            res.cookie("cartId", newCart._id, { httpOnly: true });
            req.cartId = newCart._id;
        } catch (error) {
            return next(error);
        }
    } else {
        req.cartId = req.cookies.cartId;
    }

    next();
}
