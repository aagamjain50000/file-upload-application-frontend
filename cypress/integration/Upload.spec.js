// cypress/integration/upload.spec.js
describe("File Upload", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("uploads a file", () => {
    const fileName = "test-file.csv"; // Adjust with an existing test file path

    cy.fixture(fileName).then((fileContent) => {
      cy.get('input[type="file"]').attachFile(fileName); // Use cypress-file-upload plugin

      // Check that progress bar appears and completes
      cy.get(".progress-bar").should("be.visible");
      cy.wait(2000); // Wait for upload to complete (adjust timing as necessary)
      
      cy.contains("File uploaded successfully").should("be.visible");
    });
  });

  it("shows error on upload failure", () => {
    // Simulate an upload error (you can modify backend or test files)
    cy.get('input[type="file"]').attachFile("non-existent-file.csv");
    cy.contains("Failed to upload").should("be.visible");
  });
});
