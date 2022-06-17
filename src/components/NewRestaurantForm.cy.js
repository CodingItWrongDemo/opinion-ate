import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurant could not be saved. Please try again.';

  let createRestaurant;

  function mountComponent() {
    createRestaurant = cy.stub().as('createRestaurant');
    cy.mount(<NewRestaurantForm createRestaurant={createRestaurant} />);
  }

  describe('initially', () => {
    it('does not display a validation error', () => {
      mountComponent();
      cy.contains(requiredError).should('not.exist');
    });

    it('does not display a server error', () => {
      mountComponent();
      cy.contains(serverError).should('not.exist');
    });
  });

  describe('when filled in', () => {
    function fillInForm() {
      mountComponent();
      createRestaurant.resolves();

      cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
      cy.contains('Add').click();
    }

    it('does not display a validation error', () => {
      fillInForm();
      cy.contains(requiredError).should('not.exist');
    });

    it('does not display a server error', () => {
      fillInForm();
      cy.contains(serverError).should('not.exist');
    });

    it('calls createRestaurant with the name', () => {
      fillInForm();
      cy.get('@createRestaurant').should(
        'have.been.calledWith',
        restaurantName,
      );
    });

    it('clears the name', () => {
      fillInForm();
      cy.get('[placeholder="Add Restaurant"]').should('have.value', '');
    });
  });

  describe('when empty', () => {
    function submitEmptyForm() {
      mountComponent();

      cy.contains('Add').click();
    }

    it('displays a validation error', () => {
      submitEmptyForm();
      cy.contains(requiredError).should('exist');
    });

    it('does not call createRestaurant', () => {
      submitEmptyForm();
      cy.get('@createRestaurant').should('not.have.been.called');
    });
  });

  describe('when correcting a validation error', () => {
    function fixValidationError() {
      mountComponent();
      createRestaurant.resolves();

      cy.contains('Add').click();

      cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
      cy.contains('Add').click();
    }

    it('clears the validation error', () => {
      fixValidationError();
      cy.contains(requiredError).should('not.exist');
    });
  });

  describe('when the store action rejects', () => {
    function fillInForm() {
      mountComponent();
      createRestaurant.rejects();

      cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
      cy.contains('Add').click();
    }

    it('displays a server error', () => {
      fillInForm();
      cy.contains(serverError).should('exist');
    });

    it('does not clear the name', () => {
      fillInForm();
      cy.get('[placeholder="Add Restaurant"]').should(
        'have.value',
        restaurantName,
      );
    });
  });

  describe('when retrying after a server error', () => {
    function retrySubmittingForm() {
      mountComponent();
      createRestaurant.onFirstCall().rejects().onSecondCall().resolves();

      cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
      cy.contains('Add').click();

      cy.contains(serverError).should('exist');

      cy.contains('Add').click();
    }

    it('clears the server error', () => {
      retrySubmittingForm();
      cy.contains(serverError).should('not.exist');
    });
  });
});
