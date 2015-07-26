Feature: resources

    Scenario: existing list requested
        Given list of "foo" resources exists in the api
        When list of "foo" resources is requested
        Then list of "foo" resources is returned

    Scenario: list of size one is returned
        Given list of "foo" contains one entry
        When list of "foo" resources is requested
        Then list of "foo" resources is returned


    Scenario: existing list of rides requested
        Given list of "rides" resources exists in the api
        When list of "rides" resources is requested
        Then list of "rides" resources is returned

    Scenario: existing list of users requested
        Given list of "users" resources exists in the api
        When list of "users" resources is requested
        Then list of "users" resources is returned

    @wip
    Scenario: non-existing list of resources requested
        Given list of "widgets" resources does not exist in the api
        When list of "widgets" resources is requested
        Then list of "widgets" resources is returned

    @wip
    Scenario: existing resource requested by id
        Given a "foo" exists in the api
        When the "foo" is requested by id
        Then the "foo" is returned

    @wip
    Scenario: non-existing resource is requested by id
        Given a "foo" does not exist in the api
        When the "foo" is requested by id
        Then the "foo" is reported to be "Not Found"
