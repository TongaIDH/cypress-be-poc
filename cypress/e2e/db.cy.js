describe('Database testing', function() {
    
    before(() => {
        cy.task('queryDb', 'CREATE TABLE `baseprueba`.`tablaprueba` (`id` INT(10) NOT NULL AUTO_INCREMENT , `nombre` TEXT NOT NULL , `apellido` TEXT NOT NULL , `edad` INT(4) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;')
    })

    after(() => {
        cy.task('queryDb', "DROP TABLE tablaprueba")
    })

    it('Should do a simple INSERT', function() {
        cy.task('queryDb', "INSERT INTO tablaprueba (nombre, apellido, edad) VALUES ('Pedro', 'Picapiedra', 47)").then(results => {
            //expect(results.affectedRows).to.eq(1)
            cy.log(results)
            expect(results.affectedRows).to.eq(1)
            cy.wrap(results.insertId).as('id')
        })
    })

    it('Should do a simple SELECT', function() {
        cy.task('queryDb', `SELECT * FROM tablaprueba WHERE id = ${this.id}`).then(results => {
            cy.log(results)
            expect(results[0].nombre).to.eq("Pedro")
            expect(results[0].apellido).to.eq("Picapiedra")
            expect(results[0].edad).to.eq(47)
        })
    })

    it('Should do a simple DELETE', function() {
        cy.task('queryDb', `DELETE FROM tablaprueba WHERE id = ${this.id}`).then(results => {
            cy.log(results)
            expect(results.affectedRows).to.eq(1)
            expect(results.serverStatus).to.eq(2)
        })
    })
})