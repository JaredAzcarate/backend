import mongoose from 'mongoose';

const menssagesCollection = 'messages';

const messagesSchema = new mongoose.Schema({
    user: {type: String, require: true},
    message: {type: String, require: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware para ajustar la hora y los minutos antes de guardar
messagesSchema.pre('save', function (next) {
    const now = new Date();
    now.setSeconds(0, 0); // Establece los segundos y milisegundos en 0
    this.createdAt = now;
    next();
});

const messagesModel = mongoose.model(menssagesCollection, messagesSchema);

export default messagesModel;