Feature: hello world

    Scenario: hello
        When "/hello" is requested
        Then "Hello World" is returned as the response