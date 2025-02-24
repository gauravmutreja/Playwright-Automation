Feature: Ecommerce Validations
    @Regression
    Scenario: Placeing an Order
        Given a login to Ecommerce application with "gaurav@gmail.com" and "Gaurav@123"
        When Add "Banarsi Saree" to Cart
        Then Verify "Banarsi Saree" is diplayed in Cart
        When Enter valid detail and Place the Order
        Then Verify order is present in the OrderHistory