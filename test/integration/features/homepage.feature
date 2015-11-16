Feature: homepage

    Scenario: no api privileges
        Given user has no api privileges
        When the homepage is loaded
        Then no resources are listed

    Scenario: some api privileges
        Given user has api privileges
        When the homepage is loaded
        Then a "200" status code should be returned
        And top level resources are listed
