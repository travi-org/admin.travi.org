Feature: errors

    Scenario: api response error
        Given the api is down
        When the homepage is loaded
        Then a "500" error should be returned
