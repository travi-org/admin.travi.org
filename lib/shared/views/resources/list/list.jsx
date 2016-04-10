import {Link} from 'react-router';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default (React) => {
    function ResourceList({resources}) {
        return (
            <ListGroup>{ resources.map((resource) => (
                <ListGroupItem key={resource.id}>{(() => {
                    if (resource.thumbnail) {
                        return <img src={resource.thumbnail.src} className="thumbnail"/>;
                    } else {
                        return '';
                    }
                })()}{(() => {
                    if (resource.links.self) {
                        return <Link to={resource.links.self.href}>{resource.displayName}</Link>;
                    } else {
                        return resource.displayName;
                    }
                })()}</ListGroupItem>
            )) }</ListGroup>
        );
    }
    ResourceList.displayName = 'ResourceList';

    return ResourceList;
};
