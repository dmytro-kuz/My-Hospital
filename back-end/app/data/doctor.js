const Doctor = require('../models/doctor');

const getAll = () => {
    return Doctor.find()
}

const getById = (id) => {
    return Doctor.findById(id)
}

const getByIds = (ids) => {
    return Doctor.find({id: { $in: ids }})
}

const create = (doctor) => {
    return new Doctor(doctor).save();
}

const deleteById = id => {
    return Doctor.findByIdAndDelete({_id: id})
}

const updateById = (id, doctor) => {
    return Doctor.findByIdAndUpdate({_id: id}, doctor)
}

module.exports = {
    getAll,
    getById,
    getByIds,
    create,
    deleteById, 
    updateById
};