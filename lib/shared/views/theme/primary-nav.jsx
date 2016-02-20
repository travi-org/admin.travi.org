'use strict';

const
    router = require('react-router'),
    IndexLink = router.IndexLink,

    Navbar = require('react-bootstrap').Navbar,
    NavItem = require('react-bootstrap').NavItem,
    Nav = require('react-bootstrap').Nav,
    LinkContainer = require('react-router-bootstrap').LinkContainer;

module.exports = (React) => {
    function PrimaryNav(props) {
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
                        {props.primaryNav.map((resourceType) => (
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
    PrimaryNav.displayName = 'PrimaryNav';

    return PrimaryNav;
};
