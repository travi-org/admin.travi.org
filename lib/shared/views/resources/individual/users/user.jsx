'use strict';

module.exports = (React) => {
    function User({user}) {
        const avatar = user.avatar;

        return (
            <div className="resource">
                <h3>{user.displayName}</h3>
                <img src={avatar.src} height={avatar.size} width={avatar.size} className="img-rounded"/>
            </div>
        );
    }

    User.displayName = 'User';

    return User;
};
