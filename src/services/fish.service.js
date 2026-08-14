const { fish } = require('../models/database');

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function listFish() {
  return fish;
}

function findFish(id) {
  return fish.find((item) => item.id === Number(id));
}

function identifyByScientificName(scientificName) {
  const target = normalize(scientificName);
  return fish.find((item) => normalize(item.scientificName) === target);
}

function createFish({ commonName, scientificName, regions, description }) {
  const fishAlreadyExists = identifyByScientificName(scientificName);
  if (fishAlreadyExists) return { conflict: true };

  const newFish = {
    id: fish.length + 1,
    commonName: commonName.trim(),
    scientificName: scientificName.trim(),
    regions: regions.map((region) => region.trim()),
    description: description?.trim() || 'Informação básica não cadastrada.'
  };
  fish.push(newFish);
  return { fish: newFish };
}

module.exports = { listFish, findFish, identifyByScientificName, createFish };
