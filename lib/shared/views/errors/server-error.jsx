export default (React) => {
    function ServerError() {
        return (
            <div className="jumbotron">
                <h2>500</h2>
                <p>Server Error</p>
            </div>
        );
    }
    ServerError.displayName = 'ServerError';

    return ServerError;
};
