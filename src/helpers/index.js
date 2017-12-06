import { parse } from 'qs';
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, printAST } from 'apollo-client-preset'
import { setContext } from 'apollo-link-context'
import Cookies from 'universal-cookie';
import { onError } from "apollo-link-error";
import { print } from 'graphql/language/printer'
import { Observable } from 'apollo-link'
import { extractFiles } from 'extract-files'

/**
 * Checks whether an object is empty
 * @param  {Object} obj
 * @return {Boolean}
 */
export function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
export function getQuery() {
  return parse(window.location.search.substring(1));
}

const gqlBaseLink = 
// Set context to base httplink for authentication
setContext((opertation, prevCtx) => {
  // get the authentication token from cookies if it exists
  const token = new Cookies().get('oauthToken');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...prevCtx.headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})
/** For Debugging */
.concat(
  onError(({ graphQLErrors, networkError, operation, response }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`[Apollo GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,);
    })
  }
  if (networkError) {
    console.error(`[Apollo Network Err]: ${networkError}`,);
  }
  if (operation) {
    console.error(`[Apollo Operation Err]: ${networkError}`,);
  }
  if (response) {
    console.error(`[Apollo Response Err]: ${networkError}`,);
  }
}));

// Credit to https://github.com/jaydenseric/apollo-upload-client/blob/master/src/index.mjs
// Minor tweak to fit our specs
const createUploadLink = (
  {
    includeExtensions,
    uri: linkUri = '/graphql',
    credentials: linkCredentials,
    headers: linkHeaders,
    fetchOptions: linkFetchOptions = {},
    fetch: linkFetch = fetch
  } = {}
) =>
  new ApolloLink(
    ({ operationName, variables, query, extensions, getContext, setContext }) =>
      new Observable(observer => {
        const requestOperation = { query: print(query) }
        if (operationName) requestOperation.operationName = operationName
        if (Object.keys(variables).length)
          requestOperation.variables = variables
        if (extensions && includeExtensions)
          requestOperation.extensions = extensions

        const files = extractFiles(variables)      
        const {
          uri = linkUri,
          credentials = linkCredentials,
          headers: contextHeaders,
          fetchOptions: contextFetchOptions = {}
        } = getContext()

        const fetchOptions = {
          ...linkFetchOptions,
          ...contextFetchOptions,
          headers: {
            ...linkFetchOptions.headers,
            ...contextFetchOptions.headers,
            ...linkHeaders,
            ...contextHeaders
          },
          method: 'POST'
        }

        if (credentials) fetchOptions.credentials = credentials

        if (files.length) {
          // GraphQL multipart request spec:
          // https://github.com/veritone/core-graphql-server/blob/develop/docs/samples.md

          fetchOptions.body = new FormData()

          fetchOptions.body.append('query',print(query))
          fetchOptions.body.append('variables', JSON.stringify(variables))
          fetchOptions.body.append('file', files[0].file)
          // filename part is required by the core-graphql-server
          // it is automatically added by append() with File object's filename.
        } else {
          fetchOptions.headers['content-type'] = 'application/json'
          fetchOptions.body = JSON.stringify(requestOperation)
        }

        linkFetch(uri, fetchOptions)
          .then(response => {
            setContext({ response })
            if (!response.ok)
              throw new Error(`${response.status} (${response.statusText})`)
            return response.json()
          })
          .then(result => {
            observer.next(result)
            observer.complete()
          })
          .catch(error => observer.error(error))
      })
  );

const gqlUploadLink = gqlBaseLink.concat(createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
}));

const gqlLink = gqlBaseLink.concat(new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
}));

export const gqlUploadClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: gqlUploadLink
})
export const gqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: gqlLink
});


