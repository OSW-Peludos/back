const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;

const Animal = new Schema({
    _id: {
        type: String,
        required: true
    },
    animalType: {
        type: String,
        enum: ["cat", "dog"],
        required: true
    },
    animalRace: String,
    size: {
        type: String,
        enum: ["small", "medium", "big", "no-info"],
        default: "no-info"
    },
    color: String,
    chip: Boolean,
    photoId: String,
    observations: String,
});

const Contact = new Schema({
    _id: String,
    contactName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: Number,
        required: true
    }
});

const AnimalRegistry = new Schema({
        _id:    {type:ObjectIdSchema, default: function () { return new ObjectId()} }
        ,
    coordinates: {
        type: [Number]
    },
    date: Date,
    animal: {
        type: Animal,
        required: false,
    },
    contact: {
        type: Contact,
        required: true
    },
    status: {
        type: String,
        enum: ["found", "lost", "unknown"],
        default: "unknown"
    }
},
    { collection: 'pet-registry' });

AnimalRegistry.index({ '$**': 'text' });

module.exports = mongoose.model('AnimalRegistry', AnimalRegistry);