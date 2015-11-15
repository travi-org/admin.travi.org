Feature: errors

    Scenario: api response error from catalog
        Given the api is down
        When the homepage is loaded
        Then a "500" error should be returned

    Scenario: api error from list endpoint
        Given the api is down
        When list of "foo" resources is requested
        Then a "500" error should be returned

    Scenario: api error for single resource
        Given the api is down
        When the "foo" is requested by id
        Then a "500" error should be returned
