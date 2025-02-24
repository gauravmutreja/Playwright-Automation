Feature: Error Validations
   

     @Validation
    Scenario Outline: Placeing an Order
        Given Login to Ecommerce2 application with "<username>" and "<passowrd>"
        Then Verify Error message is diplayed

        | username          | passowrd      |
        | King@gmail.com    | IamKing#999   |
        | Gaurav@gmail.com  | GauravKing@12 |
        | Sahil@gmail.com   | SahilKing@12  |
