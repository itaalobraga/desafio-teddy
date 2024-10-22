describe("CRUD Companies", () => {
  beforeEach(() => {
    cy.intercept("GET", "/v1/external-companies").as("getCompanies");
    cy.intercept("POST", "/v1/external-companies").as("createCompany");
  });

  it("should create a new company", () => {
    cy.visit("/companies/create");

    cy.get('input[name="name"]').type("New Company");
    cy.get('input[name="companyName"]').type("New Company Name");
    cy.get('input[name="collaboratorsCount"]').type("10");
    cy.get('input[type="radio"][value="true"]').check();

    cy.get('button[type="submit"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Empresa criada com sucesso!");
    });

    cy.wait("@createCompany").its("response.statusCode").should("equal", 201);
  });

  it("should edit company", () => {
    cy.visit("/companies");

    cy.wait("@getCompanies").its("response.statusCode").should("equal", 200);

    cy.get('button[title*="Editar"]').first().click();

    cy.get('input[name="name"]').clear().type("Company Edited");
    cy.get('input[name="companyName"]').clear().type("Company Name Edited");
    cy.get('input[name="collaboratorsCount"]')
      .clear()
      .invoke("removeAttr", "disabled")
      .type("4");
    cy.get('input[type="radio"][value="false"]').check();

    cy.get('button[type="submit"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Empresa atualizada com sucesso!");
    });
  });

  it("should delete a company", () => {
    cy.visit("/companies");

    cy.wait("@getCompanies").its("response.statusCode").should("equal", 200);

    cy.get('button[title*="Remover"]').first().click();

    cy.on("window:confirm", () => true);

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Empresa removida com sucesso!");
    });
  });
});
