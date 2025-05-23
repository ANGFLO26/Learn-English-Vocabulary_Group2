/// <reference types="cypress" />

describe('Quiz E2E Tests', () => {
  beforeEach(() => {
    // Visit the quiz page
    cy.visit('/quiz');
  });

  it('should load quiz page', () => {
    // Basic test - check if we can visit the page
    cy.url().should('include', '/quiz');
    cy.contains('Quiz').should('be.visible');
  });

  it('should display quiz elements', () => {
    // Check basic quiz elements
    cy.get('body').should('be.visible');
    // Add more specific selectors based on actual quiz implementation
  });

  it('completes a full quiz session', () => {
    // Check if quiz page is loaded
    cy.get('[data-testid="quiz-container"]').should('be.visible');

    // Answer first question
    cy.get('[data-testid="question-text"]').should('be.visible');
    cy.get('[data-testid="answer-option"]').first().click();

    // Verify feedback
    cy.get('[data-testid="feedback-message"]').should('be.visible');

    // Move to next question
    cy.get('[data-testid="next-button"]').click();

    // Answer second question
    cy.get('[data-testid="question-text"]').should('be.visible');
    cy.get('[data-testid="answer-option"]').first().click();

    // Complete quiz
    cy.get('[data-testid="quiz-complete"]').should('be.visible');
    cy.get('[data-testid="final-score"]').should('be.visible');
  });

  it('saves progress and can resume quiz', () => {
    // Start quiz
    cy.get('[data-testid="quiz-container"]').should('be.visible');
    
    // Answer first question
    cy.get('[data-testid="answer-option"]').first().click();
    
    // Save progress
    cy.get('[data-testid="save-progress"]').click();
    
    // Verify save success
    cy.get('[data-testid="save-success"]').should('be.visible');
    
    // Reload page
    cy.reload();
    
    // Check if progress is restored
    cy.get('[data-testid="progress-indicator"]').should('be.visible');
    cy.get('[data-testid="resume-quiz"]').should('be.visible');
  });

  it('handles network errors gracefully', () => {
    // Simulate network error
    cy.intercept('GET', '/api/questions', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    });

    // Visit quiz page
    cy.visit('/quiz');

    // Check error message
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.get('[data-testid="retry-button"]').should('be.visible');
  });
}); 