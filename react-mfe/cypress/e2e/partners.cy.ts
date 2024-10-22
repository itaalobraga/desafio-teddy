describe("CRUD Partners", () => {
  beforeEach(() => {
    cy.intercept("GET", "/v1/test/partners").as("getPartners");
    cy.intercept("POST", "/v1/test/partners").as("createPartner");
  });

  it("should create a new partner", () => {
    cy.visit("/partners/create");

    cy.get('input[name="name"]').type("New Partner");
    cy.get('input[name="repositoryGit"]').type("https://github.com/example");
    cy.get('input[name="urlDoc"]').type("https://example.com");
    cy.get('input[name="clients"]').type("1, 2, 3");
    cy.get('input[name="projects"]').type("1, 2, 3");
    cy.get('textarea[name="description"]').type("Description");

    cy.get('button[type="submit"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Parceiro(a) criado(a) com sucesso!");
    });

    cy.wait("@createPartner").its("response.statusCode").should("equal", 201);
  });

  it("should edit partner", () => {
    cy.visit("/partners");

    cy.wait("@getPartners").its("response.statusCode").should("equal", 200);

    cy.get('button[title*="Editar"]').first().click();

    cy.get('input[name="name"]').clear().type("Partner edited");
    cy.get('input[name="repositoryGit"]')
      .clear()
      .type("https://github.com/example-edited");
    cy.get('input[name="urlDoc"]').clear().type("https://example.com/edited");
    cy.get('input[name="clients"]').clear().type("3, 2, 1");
    cy.get('input[name="projects"]').clear().type("3, 2, 1");
    cy.get('textarea[name="description"]').clear().type("Description Edited");

    cy.get('button[type="submit"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Parceiro(a) atualizado(a) com sucesso!");
    });
  });

  it("should delete a partner", () => {
    cy.visit("/partners");

    cy.wait("@getPartners").its("response.statusCode").should("equal", 200);

    cy.get('button[title*="Remover"]').first().click({ force: true });

    cy.on("window:confirm", () => true);

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Parceiro(a) removido(a) com sucesso!");
    });
  });
});
