Feature: HTML Rendering

    Scenario: html requested for landing page
        Given html is requested
        And user has api privileges
        When the homepage is loaded
        Then a "200" status code should be returned
        And the primary nav is rendered
        And the index route is rendered

    Scenario: html requested for list page
        Given html is requested
        And list of "persons" resources exists in the api
        And user has api privileges
        When list of "persons" resources is requested
        Then a "200" status code should be returned
        And the primary nav is rendered
        And the resource-list route is rendered

    Scenario: html requested for single resource
        Given html is requested
        And a "persons" exists in the api
        And user has api privileges
        When the "persons" is requested by id
        Then a "200" status code should be returned
        And the primary nav is rendered
        And the resource route is rendered

    @wip
    Scenario: html requested when error occurs
        Given html is requested
        Then a "500" status code should be returned
        And the primary nav is rendered

    @wip
    Scenario: html requested for missing server route
        Given html is requested
        Then a "404" status code should be returned
        And the primary nav is rendered

    @wip
    Scenario: html requested for existing server route with missing page
        Given html is requested
        And list of "foo" resources exists in the api
        And user has api privileges
        When list of "foo" resources is requested
        Then a "404" status code should be returned
        And the primary nav is rendered
