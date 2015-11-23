'use strict';

const
    React = require('react'),
    router = require('react-router'),
    IndexLink = router.IndexLink,

    Navbar = require('react-bootstrap').Navbar,
    NavItem = require('react-bootstrap').NavItem,
    Nav = require('react-bootstrap').Nav,
    LinkContainer = require('react-router-bootstrap').LinkContainer;

module.exports = React.createClass({
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <h1><IndexLink className="navbar-brand" to="/">Travi</IndexLink></h1>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    {this.props.primaryNav.map((resourceType) => (
                        <LinkContainer to={resourceType.path} key={resourceType.text}>
                            <NavItem>
                                {resourceType.text}
                            </NavItem>
                        </LinkContainer>
                    ))}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});
