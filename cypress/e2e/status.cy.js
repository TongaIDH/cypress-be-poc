describe("Testing status codes", () => {
  it("Should have succesful status code", () => {
    cy.request("employees").its("status").should("eq", 200);
  });

  it("Should have failed status code", () => {
    cy.request({url: "employees/5", failOnStatusCode: false}).its("status").should("eq", 404);
  });
});
