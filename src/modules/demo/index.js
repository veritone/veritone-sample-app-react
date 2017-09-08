const demo = {
  requests: [
    {
      description: 'Get your current logged in user data',
      endpoint: 'https://api.aws-dev.veritone.com/v1/admin/current-user',
      parameters: {},
      fields: []
    },
    {
      description: 'Get available Veritone applications',
      endpoint: 'https://api.aws-dev.veritone.com/v1/admin/current-user/applications',
      parameters: {},
      fields: []
    }
  ],
  apps: [
    {
      applicationId: 'abcd',
      applicationName: 'Test Application',
      applicationIconSvg: '',
      applicationIconUrl: 'https://www.veritone.com'
    },
    {
      applicationId: '1234',
      applicationName: 'Beta Application',
      applicationIconSvg: '',
      applicationIconUrl: 'https://www.veritone.com'
    }
  ]
};

export default demo
