module.exports = {
  settings: {
    number_of_shards: 1,
    number_of_replicas: 0,
  },
  mappings: {
    properties: {
      number: { type: "double" },
    },
  },
};
