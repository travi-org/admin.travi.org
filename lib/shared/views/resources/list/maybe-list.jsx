import createResourceList from './list.jsx';

export default (React) => {
    const ResourceList = createResourceList(React);

    function MaybeList({resources, resourceType}) {
        if (resources.length) {
            return <ResourceList resources={resources}/>;
        } else {
            return <p className="alert alert-info">No { resourceType } are available</p>;
        }
    }
    MaybeList.displayName = 'MaybeResourceList';

    return MaybeList;
};
