describe("Testing error blocks", () => {
  it("should be fail response and simple message", function () {
    cy.request({
      url: "https://pokeapi.co/api/v2/4545",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.eq("Not Found");
    });
  });
  it("should be fail response and complex message", function () {
    cy.request({
      url: "https://rickandmortyapi.com/api/location/3434343",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("error", "Location not found");
    });
  });
});
