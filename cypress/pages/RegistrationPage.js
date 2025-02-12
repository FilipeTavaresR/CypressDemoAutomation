class RegistrationPage {
  constructor() {
    this.firstNameInput = 'input[placeholder="First Name"]';
    this.lastNameInput = 'input[placeholder="Last Name"]';
    this.addressInput = 'textarea[ng-model="Adress"]';
    this.emailInput = 'input[ng-model="EmailAdress"]';
    this.phoneInput = 'input[ng-model="Phone"]';
    this.genderRadio = 'input[ng-model="radiovalue"]';
    this.dropDownLanguages = '#msdd';
    this.skillsDropdown = '#Skills';
    this.countryDropdown = '#countries';
    this.selectCountryDropdown = '#country';
    this.passwordInput = '#firstpassword';
    this.confirmPasswordInput = '#secondpassword';
    this.yearDropdown = '#yearbox';
    this.monthDropdown = 'select[ng-model="monthbox"]';
    this.dayDropdown = '#daybox';
    this.submitButton = '#submitbtn';
    this.errorMessage = '.error';
    this.successMessage = '#success-message';
  }

  hobbiesCheckbox(hobby) {
    return `input[type="checkbox"][value="${hobby}"]`;
  }

  selectLanguage(languages) {
    cy.get(this.dropDownLanguages).click();
    languages.forEach(language => {
      cy.contains(".ui-corner-all", language).click();
    });
    cy.contains("Languages").click() //clica no label para fechar o dropdown
  }

  selectCountry(country) {
    cy.get(this.selectCountryDropdown).parent().find('.select2-selection').click(); // Clica para abrir o dropdown
    cy.get('.select2-results__option').contains(country).click(); // Seleciona 'India'
  }

  validateRequiredField(selector, expectedMessage = "") {
    cy.get(selector).then(($el) => {
      if ($el[0].validationMessage) {
        cy.wrap($el)
          .invoke("prop", "validationMessage")
          .should("not.be.empty");
        //Wrap Converte um elemento do DOM para um objeto Cypress. 
        //Invoke executa um comando diretamente no elemento DOM. A validationMessage é um texto automático do navegador que aparece sempre que um campo 
        //required não é preenchido.
        if (expectedMessage) {
          cy.wrap($el)
            .invoke("prop", "validationMessage")
            .should("contain", expectedMessage);
        }
      }
    });
  }

  visit() {
    cy.intercept("GET", "https://restcountries.eu/rest/v1/all", {
      statusCode: 200,
      body: [
        { "name": "Brasil" },
        { "name": "França" },
        { "name": "Argentina" },
        { "name": "Peru" },
        { "name": "Venezuela" },
        { "name": "India" }
      ]
    }).as("getCountries"); //aqui como a chamada v1/all não está respondendo porque não existe, 
    // foi feito um mock para simular o campo com alguns países
    cy.visit("/Register.html");
    cy.wait("@getCountries");
  }

  fillForm({ firstName, lastName, address, email, phone, gender, hobbies, languages, skill, country, yearBirth, monthBirth, dayBirth, password, confirmPassword }) {
    cy.get(this.firstNameInput).type(firstName);
    cy.get(this.lastNameInput).type(lastName);
    cy.get(this.addressInput).type(address);
    cy.get(this.emailInput).type(email);
    cy.get(this.phoneInput).type(phone);
    cy.get(this.genderRadio).check(gender);
    hobbies.forEach(hobby => {
      cy.get(this.hobbiesCheckbox(hobby)).check();
    });
    this.selectLanguage(languages);
    cy.get(this.skillsDropdown).select(skill);
    cy.get(this.countryDropdown).select(country);
    this.selectCountry(country)
    cy.get(this.yearDropdown).select(yearBirth);
    cy.get(this.monthDropdown).select(monthBirth);
    cy.get(this.dayDropdown).select(dayBirth);
    cy.get(this.passwordInput).type(password);
    cy.get(this.confirmPasswordInput).type(confirmPassword);
  }

  submit() {
    cy.get(this.submitButton).click();
  }
}

export default new RegistrationPage();