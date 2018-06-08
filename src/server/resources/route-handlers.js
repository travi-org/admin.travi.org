import {getResource, getListOf} from './controller';

export async function getResourceHandler(request) {
  return {resource: await getResource(request.params.resourceType, request.params.id)};
}

export async function getResourcesHandler({params}) {
  const {resourceType} = params;

  return {[resourceType]: await getListOf(resourceType), resourceType};
}
