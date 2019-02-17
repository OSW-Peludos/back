const mongoose = require('mongoose');
const { errorGenerator } = require('../utils')
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
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

const ContactSchema = new Schema({
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

const AnimalRegistrySchema = new Schema({
  coordinates: {
    type: [Number]
  },
  date: Date,
  animal: {
    type: AnimalSchema,
    required: false,
  },
  contact: {
    type: ContactSchema,
    required: true
  },
  status: {
    type: String,
    enum: ["found", "lost", "unknown"],
    default: "unknown"
  }
},
  { collection: 'pet-registry' });

AnimalRegistrySchema.index({ '$**': 'text' });

const Animal = mongoose.model('AnimalRegistry', AnimalRegistrySchema);

function listAllAnimals({status = 'lost', skip, limit, order = -1}){
  return Animal.find({status})
    .sort({date: order})
    .limit(limit)
    .skip(skip)
    .lean()
}

module.exports = {
  findAll: listAllAnimals,
}

