import any from '@travi/any';

function resource() {
  return {
    id: any.integer()
  };
}

const resources = {
  ride() {
    return {
      id: any.integer(),
      nickname: any.string(),
      _links: {}
    };
  },
  person() {
    return {
      id: any.word(),
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

export {
  resource,
  resources
};
