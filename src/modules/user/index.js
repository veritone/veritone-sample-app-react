const User = {
  requestParameters: {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer 10d590c0-2e82-4297-9b2e-9d2387a50236',
      'Content-Type': 'application/json'
    }
  },
  responseParameters: {
    fields: [
      'userId',
      'userName',
      'email',
      'lastLoggedIn',
      'apiToken',
      'applications'
    ]
  }
};

export { User };
