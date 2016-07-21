Feature: resources

    Scenario: existing list requested
        Given list of "foo" resources exists in the api
        And user has api privileges
        When list of "foo" resources is requested
        Then list of "foo" resources is returned

    Scenario: list of size one is returned
        Given list of "foo" contains one entry
        And user has api privileges
        When list of "foo" resources is requested
        Then list of "foo" resources is returned


    Scenario: existing list of rides requested
        Given list of "rides" resources exists in the api
        And user has api privileges
        When list of "rides" resources is requested
        Then list of "rides" resources is returned

    Scenario: existing list of persons requested
        Given list of "persons" resources exists in the api
        And user has api privileges
        When list of "persons" resources is requested
        Then list of "persons" resources is returned

    @wip
    Scenario: non-existing list of resources requested
        Given list of "widgets" resources does not exist in the api
        When list of "widgets" resources is requested
        Then list of "widgets" resources is reported to be "Not Found"

    Scenario: existing resource requested by id
        Given a "foo" exists in the api
        And user has api privileges
        When the "foo" is requested by id
        Then the "foo" is returned

    @wip
    Scenario: non-existing resource is requested by id
        Given a "foo" does not exist in the api
        When the "foo" is requested by id
        Then the "foo" is reported to be "Not Found"
