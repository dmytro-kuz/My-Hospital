const Appointment = require('../models/appointment')

const getAll = () => {
    return Appointment.find()
}

const getById = (id) => {
    return Appointment.findById(id)
}

const getByIds = (ids) => {
    return Appointment.find({id: { $in: ids }})
}

const create = (appointment) => {
    return new Appointment(appointment).save();
}

const deleteById = id => {
    return Appointment.findByIdAndDelete({_id: id})
}

const updateById = (id, appointment) => {
    return Appointment.findByIdAndUpdate({_id: id}, appointment)
}

module.exports = {
    getAll,
    getById,
    getByIds,
    create,
    deleteById,
    updateById
};