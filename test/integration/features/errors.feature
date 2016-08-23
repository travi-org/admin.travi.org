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

    Scenario: html requested for missing list route
        Given html is requested
        And user has api privileges
        And list of "foo" resources does not exist in the api
        When list of "foo" resources is requested
        Then a "404" status code should be returned
        And the "404" page should be displayed
        And the primary nav is rendered

    Scenario: html requested for missing single resource route
        Given html is requested
        And user has api privileges
        And a "foo" does not exist in the api
        When the "foo" is requested by id
        Then the "404" page should be displayed
        And a "404" status code should be returned
        And the primary nav is rendered

    Scenario: html requested for existing server route with missing page
        Given html is requested
        And user has api privileges
        When a request is made to "/foo/42/bar"
        Then a "404" status code should be returned
        And the "404" page should be displayed
        And the primary nav is rendered
