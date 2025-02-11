import RegistrationPage from "../pages/RegistrationPage";

describe("User Registration Tests", () => {
  let userData; 

  before(() => {
    cy.fixture('userData').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      // Ignorar erros de scripts de origem cruzada
      return false;
    });
    RegistrationPage.visit();
  });

  it("should register successfully with valid data", () => {
    RegistrationPage.fillForm(userData.validUser);
    RegistrationPage.submit();

    cy.intercept('POST', '**/api/1/databases/userdetails/collections/**', {
      statusCode: 200,
      body: {}, // Simula uma resposta vazia
    }).as('mockedAPI'); // Foi utilizado abordagem de mockar a resposta final do submit pois estava direcionando para uma API quebrada, 
    // então feito um mock para quando chegar nesse ponto, sabendo que os campos foram preenhcido de forma adequada, 
    // vai responder 200 para validar sucesso no teste. 
    cy.wait('@mockedAPI'); // Aguarda a requisição falsa ser resolvida
  });

  it("should show error when fields are empty", () => {
    RegistrationPage.submit();

    // Lista de campos obrigatórios
    const requiredFields = [
      RegistrationPage.firstNameInput,
      RegistrationPage.lastNameInput,
      RegistrationPage.emailInput,
      RegistrationPage.phoneInput,
      RegistrationPage.genderRadio,
      RegistrationPage.countryDropdown,
      RegistrationPage.yearDropdown,
      RegistrationPage.monthDropdown,
      RegistrationPage.dayDropdown,
      RegistrationPage.passwordInput,
      RegistrationPage.confirmPasswordInput
    ];

    // Itera sobre os campos obrigatórios e valida cada um
    requiredFields.forEach(field => RegistrationPage.validateRequiredField(field));
  });

  it("should show error when an invalid email is entered", () => {
    cy.get(RegistrationPage.emailInput).type(userData.invalidEmail.email)
    RegistrationPage.validateRequiredField(RegistrationPage.emailInput, 'Inclua um "@" no endereço de e-mail.');
  });

  it("should show error when an invalid phone is entered", () => {
    cy.get(RegistrationPage.phoneInput).type(userData.invalidPhone.phone)
    RegistrationPage.submit();
    RegistrationPage.validateRequiredField(RegistrationPage.phoneInput, 'É preciso que o formato corresponda ao exigido.');
  });

  it("should show error for mismatched passwords", () => {
    cy.get(RegistrationPage.passwordInput).type(userData.invalidConfirmPassword.password)
    cy.get(RegistrationPage.confirmPasswordInput).type(userData.invalidConfirmPassword.confirmPassword)
    RegistrationPage.submit();
    RegistrationPage.validateRequiredField(RegistrationPage.confirmPasswordInput, 'Passwords dont match');
  });

  it("should show error when a weak password is entered", () => {
    cy.get(RegistrationPage.passwordInput).type(userData.weakPassword.password)
    RegistrationPage.submit();
    RegistrationPage.validateRequiredField(RegistrationPage.passwordInput, 'Please Enter an UpperCase,LowerCase Alphabet and a Number');
  });

});