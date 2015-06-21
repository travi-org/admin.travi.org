Feature: resources

    Scenario: existing list requested
        Given list of "foo" resources exists in the api
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
