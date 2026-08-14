const fishService = require('../services/fish.service');
const { validateCreateFish } = require('../validation/fish.schema');

function success(res, status, data) {
  return res.status(status).json({ success: true, data });
}

function error(res, status, code, message) {
  return res.status(status).json({ success: false, error: { code, message } });
}

function getAll(req, res) {
  return success(res, 200, fishService.listFish());
}

function getById(req, res) {
  if (!/^\d+$/.test(req.params.id) || Number(req.params.id) < 1) {
    return error(res, 400, 'INVALID_ID', 'O identificador deve ser um número inteiro positivo.');
  }
  const fish = fishService.findFish(req.params.id);
  if (!fish) return error(res, 404, 'SPECIES_NOT_FOUND', 'Espécie não encontrada.');
  return success(res, 200, fish);
}

function identify(req, res) {
  const { scientificName } = req.query;
  if (typeof scientificName !== 'string' || !scientificName.trim()) {
    return error(res, 400, 'SCIENTIFIC_NAME_REQUIRED', 'Informe o parâmetro scientificName.');
  }
  if (!/^[A-Z][a-z]+\s[a-z]+(?:\s[a-z]+)?$/.test(scientificName.trim())) {
    return error(res, 400, 'INVALID_SCIENTIFIC_NAME', 'Informe um nome científico no formato Gênero espécie.');
  }
  const fish = fishService.identifyByScientificName(scientificName);
  if (!fish) {
    return error(res, 404, 'FISH_NOT_IDENTIFIED', 'Não foi possível identificar um peixe com o nome científico informado.');
  }
  return success(res, 200, {
    commonName: fish.commonName,
    scientificName: fish.scientificName,
    regions: fish.regions
  });
}

function create(req, res) {
  const validation = validateCreateFish(req.body);
  if (!validation.valid) {
    return error(res, 400, 'INVALID_SPECIES_DATA', 'Informe commonName, scientificName e ao menos uma região válida em regions.');
  }
  const { commonName, scientificName, regions, description } = req.body;

  const result = fishService.createFish({ commonName, scientificName, regions, description });
  if (result.conflict) {
    return error(res, 409, 'SCIENTIFIC_NAME_ALREADY_REGISTERED', 'Já existe uma espécie cadastrada com este nome científico.');
  }
  return success(res, 201, result.fish);
}

module.exports = { getAll, getById, identify, create };
