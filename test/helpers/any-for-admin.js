import any from '@travi/any';

any.resource = function () {
    return {
        id: any.integer()
    };
};

any.resources = {
    ride() {
        return {
            id: any.integer(),
            nickname: any.string(),
            _links: {}
        };
    },
    user() {
        return {
            id: any.string(),
            'first-name': any.string(),
            'last-name': any.string(),
            avatar: {
                src: any.url(),
                size: any.integer()
            },
            _links: {}
        };
    }
};

export default any;
