import React from 'react';
import reactDom from 'react-dom/server';

import cheerio from 'cheerio';
import microformats from 'microformat-node';
import any from '../../../../../../../helpers/any';
import assert from 'assert';

import createUser from '../../../../../../../../lib/shared/views/resources/individual/users/user';
const User = createUser(React);

suite('user component test', () => {
    test('that displayName is set', () => {
        assert.equal(User.displayName, 'User');
    });

    test('that the resource is displayed', () => {
        const data = {
                user: {
                    id: any.string(),
                    displayName: any.string(),
                    name: {
                        first: any.string(),
                        last: any.string()
                    },
                    avatar: {
                        src: any.url(),
                        size: any.int()
                    }
                }
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(
                <User {...data} />
            )),

            $avatar = $('div.resource img');

        assert.equal($('div.resource > h3').text(), data.user.displayName);
        assert.equal($avatar.attr('src'), data.user.avatar.src);
        assert.equal($avatar.attr('alt'), data.user.displayName);
        assert.equal($avatar.attr('height'), data.user.avatar.size);
        assert.equal($avatar.attr('width'), data.user.avatar.size);

        microformats.get({node: $}, (err, mformats) => {
            const hCard = mformats.items[0];
            assert.equal(hCard.properties.name, data.user.displayName);
            assert.equal(hCard.properties.photo, data.user.avatar.src);
            assert.equal(hCard.properties.nickname, data.user.id);
            assert.equal(hCard.properties['given-name'], data.user.name.first);
            assert.equal(hCard.properties['family-name'], data.user.name.last);
        });
    });
});
