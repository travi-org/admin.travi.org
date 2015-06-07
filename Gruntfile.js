/*global module*/
module.exports = function (grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        config: {
            webPageTestApiToken: process.env.WEB_PAGE_TEST_API_TOKEN
        }
    });
};
