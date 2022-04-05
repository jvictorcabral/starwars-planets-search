const PLANETS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const PlanetsAPI = async () => {
  const { results } = await (await fetch(PLANETS_API)).json();
  const resultsApi = results;
  return resultsApi;
};

export default PlanetsAPI;
