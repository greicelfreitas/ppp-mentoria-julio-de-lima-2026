const {
  GraphQLError,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql');
const fishService = require('../services/fish.service');
const { validateCreateFish } = require('../validation/fish.schema');

const FishType = new GraphQLObjectType({
  name: 'Fish',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    commonName: { type: new GraphQLNonNull(GraphQLString) },
    scientificName: { type: new GraphQLNonNull(GraphQLString) },
    regions: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    description: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const FishInputType = new GraphQLInputObjectType({
  name: 'FishInput',
  fields: {
    commonName: { type: new GraphQLNonNull(GraphQLString) },
    scientificName: { type: new GraphQLNonNull(GraphQLString) },
    regions: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    description: { type: GraphQLString }
  }
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    fishes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FishType))),
      resolve: () => fishService.listFish()
    },
    fish: {
      type: FishType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => fishService.findFish(id) || null
    },
    identifyFish: {
      type: FishType,
      args: { scientificName: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: (_, { scientificName }) => fishService.identifyByScientificName(scientificName) || null
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createFish: {
      type: new GraphQLNonNull(FishType),
      args: { input: { type: new GraphQLNonNull(FishInputType) } },
      resolve: (_, { input }) => {
        if (!validateCreateFish(input).valid) {
          throw new GraphQLError('Dados da espécie inválidos.', {
            extensions: { code: 'INVALID_SPECIES_DATA' }
          });
        }

        const result = fishService.createFish(input);
        if (result.conflict) {
          throw new GraphQLError('Já existe uma espécie cadastrada com este nome científico.', {
            extensions: { code: 'SCIENTIFIC_NAME_ALREADY_REGISTERED' }
          });
        }
        return result.fish;
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: QueryType, mutation: MutationType });
