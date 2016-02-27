'use strict';

module.exports = (React) => {
    function User({user}) {
        const avatar = user.avatar;

        return (
            <div className="resource h-card">
                <h3 className="p-name">{user.displayName}</h3>
                <img src={avatar.src} height={avatar.size} width={avatar.size} className="img-rounded u-photo"/>
                <dl>
                    <dt>Username</dt>
                        <dd className="p-nickname">{user.id}</dd>
                </dl>
            </div>
        );
    }

    User.displayName = 'User';

    return User;
};
