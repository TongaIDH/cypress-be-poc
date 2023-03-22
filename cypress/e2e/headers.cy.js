describe("Testing headers", () => {
  it("Should validate the header and content type", () => {
    cy.request("employees")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
  });
});
