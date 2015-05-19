Feature: resources

    Scenario: existing list requested
        Given list of "foo" resources exists in the api
        When list of "foo" resources is requested
        Then list of "foo" resources is returned
