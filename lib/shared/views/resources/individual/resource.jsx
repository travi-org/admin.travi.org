export default (React) => {
    function Resource({resource}) {
        return <h3>{resource.displayName}</h3>;
    }
    Resource.displayName = 'Resource';

    return Resource;
};
