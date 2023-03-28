describe('Database testing', function() {
    it('Should be a simple SELECT', function() {
        cy.task('queryDb', "SELECT * FROM tablaprueba").then(results => {
            cy.log(results)
        })
    });
})