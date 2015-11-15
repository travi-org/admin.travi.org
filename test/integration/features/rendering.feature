Feature: HTML Rendering

    Scenario: html requested for landing page
        Given html is requested
        And user has api privileges
        When the homepage is loaded
        Then the primary nav is rendered
        And the "index" route is rendered

    @wip
    Scenario: html requested for list page
        Given html is requested
        When list of "foo" resources is requested

    @wip
    Scenario: html requested for single resource
        Given html is requested
        When the "foo" is requested by id

    @wip
    Scenario: html requested when error occurs
        Given html is requested

    @wip
    Scenario: html requested for missing page
        Given html is requested
