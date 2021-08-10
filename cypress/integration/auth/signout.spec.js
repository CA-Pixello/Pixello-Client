describe("sign-in", () => {
    it("it will access the sign-in route", () => {
        cy.visit("https://www.pixellophotos.com/auth/sign_out")
        cy.url().should('match', "https://www.pixellophotos.com/")
    })
})