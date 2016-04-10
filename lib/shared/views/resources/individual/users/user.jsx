export default (React) => {
    function User({user}) {
        const avatar = user.avatar;

        return (
            <div className="resource h-card panel panel-default">
                <h3 className="p-name panel-heading">{user.displayName}</h3>
                <div className="container-fluid panel-body">
                    <dl className="col-sm-6">
                        <dt>First Name</dt>
                            <dd className="p-given-name">{user.name.first}</dd>
                        <dt>Last Name</dt>
                            <dd className="p-family-name">{user.name.last}</dd>
                        <dt>Username</dt>
                            <dd className="p-nickname">{user.id}</dd>
                    </dl>
                    <figure className="col-sm-6">
                        <img
                            src={avatar.src}
                            height={avatar.size}
                            width={avatar.size}
                            alt={user.displayName}
                            className="img-rounded u-photo"
                        />
                    </figure>
                </div>
            </div>
        );
    }

    User.displayName = 'User';

    return User;
};
