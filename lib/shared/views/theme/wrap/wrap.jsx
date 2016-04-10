import createPrimaryNav from './../primary-nav.jsx';

export default (React) => {
    const PrimaryNav = createPrimaryNav(React);

    function Wrap({primaryNav, children}) {
        return (
            <div className="container">
                <PrimaryNav primaryNav={primaryNav}/>
                { children }
            </div>
        );
    }
    Wrap.displayName = 'Wrap';

    return Wrap;
};
