Feature: errors

    Scenario: api response error from catalog
        Given the api is down
        When the homepage is loaded
        Then a "500" status code should be returned

    Scenario: api response error from catalog when html is requested
        Given the api is down
        And html is requested
        When the homepage is loaded
        Then a "500" status code should be returned
        And the "500" page should be displayed

    Scenario: api error from list endpoint
        Given the api is down
        When list of "foo" resources is requested
        Then a "500" status code should be returned

    Scenario: api error for single resource
        Given the api is down
        When the "foo" is requested by id
        Then a "500" status code should be returned
