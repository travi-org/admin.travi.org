export default (React) => {
    function NotFound() {
        return (
            <div className="jumbotron">
                <h2>404</h2>
                <p>Page Not Found</p>
            </div>
        );
    }
    NotFound.displayName = 'NotFound';

    return NotFound;
};
