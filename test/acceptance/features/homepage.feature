Feature: homepage

    Scenario: no api privileges
        Given user has no api privileges
        When the homepage is loaded
        Then no resources are listed