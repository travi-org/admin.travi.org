Feature: HTML Rendering

    Scenario: html requested for landing page
        Given html is requested
        And user has api privileges
        When the homepage is loaded
        Then a "200" status code should be returned
        And the primary nav is rendered
        And the index route is rendered
        And the static assets are included

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

    Scenario: html requested for list page
        Given html is requested
        And list of "rides" resources exists in the api
        And user has api privileges
        When list of "rides" resources is requested
        Then a "200" status code should be returned
        And the primary nav is rendered
        And the resource-list route is rendered

    Scenario: html requested for single resource
        Given html is requested
        And a "rides" exists in the api
        And user has api privileges
        When the "rides" is requested by id
        Then a "200" status code should be returned
        And the primary nav is rendered
        And the resource route is rendered
