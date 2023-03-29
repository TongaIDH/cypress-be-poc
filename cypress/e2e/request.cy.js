describe("Testing requests", () => {
  it("Should create an employee", () => {
    cy.request({
      url: "employees",
      method: "POST",
      body: {
        first_name: "Peter",
        last_name: "Griffin",
        email: "pgriffin@platzi.com",
      },
    }).then(response => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property("id")

      const id = response.body.id
      cy.wrap(id).as("id")
    })
  })

  it("Should validate that the user was created on the database", () => {
    cy.request('GET', 'employees').then(response => {
        expect(response.body[response.body.length - 1].first_name).to.eq("Peter")
        expect(response.body[response.body.length - 1].last_name).to.eq("Griffin")
        expect(response.body[response.body.length - 1].email).to.eq("pgriffin@platzi.com")
    })
  })

  it("Should edit the employee with a new email", function(){
    cy.request({
        url: `employees/${this.id}`,
        method: 'PUT',
        body: {
            first_name: "Pablo",
            last_name: "Grifo",
            email: "pgrifo@platzi.com"
        },
    }).then(response => {
        cy.log(response)
        expect(response.status).to.eq(200)
    })
  })

  it("Should delete the added employee", function(){
    cy.request({
        url: `employees/${this.id}`,
        method: 'DELETE',
    }).then(response => {
        expect(response.status).to.eq(200)
    })
  })
})

// EN ESTE CASO SE PODRIAN IMPLEMENTAR HOOKS PARA EMPEZAR CREANDO Y TERMINAR LIMPIANDO LA INFORMACIÓN, SERIA MAS ORDENADO