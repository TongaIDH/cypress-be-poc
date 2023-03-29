describe("Testing GraphQl", () => {
  it("Should make a request with GraphQl", () => {
    const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
            url
            name
            image
            }
        }
    }`

    const gqlVariables = {
        limit: 20,
        offset: 0
    }

    cy.request({
        method: "POST",
        url: "https://graphql-pokeapi.graphcdn.app/",
        body: {
            query: gqlQuery,
            variables: gqlVariables
        }
    }).then(response => {
        //cy.log(response)
        expect(response.body.data.pokemons.results[0].name).to.equal("bulbasaur")
    })
  });
});
