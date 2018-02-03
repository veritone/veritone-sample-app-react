import axios from 'axios';
import { helpers } from 'veritone-redux-common';
const { createReducer } = helpers;

export const TRANSCRIBE_START = 'TRANSCRIBE_START';
export const TRANSCRIBE_SUCCESS = 'TRANSCRIBE_SUCCESS';

export const CREATE_TDO = 'CREATE_TDO';
export const CREATE_TDO_FAILURE = 'CREATE_TDO_FAILURE';

export const CREATE_MEDIA_ASSET = 'CREATE_MEDIA_ASSET';
export const CREATE_MEDIA_ASSET_FAILURE = 'CREATE_MEDIA_ASSET_FAILURE';

export const CREATE_JOB = 'CREATE_JOB';
export const CREATE_JOB_FAILURE = 'CREATE_JOB_FAILURE';

export const GET_JOB = 'GET_JOB';
export const GET_JOB_FAILURE = 'GET_JOB_FAILURE';

export const GET_TDO_TRANSCRIPT = 'GET_TDO_TRANSCRIPT';
export const GET_TDO_TRANSCRIPT_FAILURE = 'GET_TDO_TRANSCRIPT_FAILURE';

export const namespace = 'mediaExample';

const defaultState = {
  steps: [],
  running: false,
  failure: false,
  failureMessage: '',
  result: {}
};

const reducer = createReducer(defaultState, {
  [TRANSCRIBE_START]() {
    return {
      ...defaultState,
      running: true
    };
  },

  [TRANSCRIBE_SUCCESS](state, action) {
    return {
      ...state,
      running: false,
      result: action.payload
    };
  },

  [CREATE_TDO](state) {
    return {
      ...state,
      steps: [...state.steps, { name: 'Create Temporal Data Object' }]
    };
  },

  [CREATE_TDO_FAILURE](state, action) {
    return {
      ...state,
      failure: true,
      running: false,
      failureMessage: action.payload
    };
  },

  [CREATE_MEDIA_ASSET](state) {
    return {
      ...state,
      steps: [...state.steps, { name: 'Create Media Asset' }]
    };
  },

  [CREATE_MEDIA_ASSET_FAILURE](state, action) {
    return {
      ...state,
      failure: true,
      running: false,
      failureMessage: action.payload
    };
  },

  [CREATE_JOB](state) {
    return {
      ...state,
      steps: [...state.steps, { name: 'Create Job' }]
    };
  },

  [CREATE_JOB_FAILURE](state, action) {
    return {
      ...state,
      failure: true,
      running: false,
      failureMessage: action.payload
    };
  },

  [GET_JOB](state) {
    return {
      ...state,
      steps: [...state.steps, { name: 'Poll for Job' }]
    };
  },

  [GET_JOB_FAILURE](state, action) {
    return {
      ...state,
      failure: true,
      running: false,
      failureMessage: action.payload
    };
  },

  [GET_TDO_TRANSCRIPT_FAILURE](state, action) {
    return {
      ...state,
      failure: true,
      running: false,
      failureMessage: action.payload
    };
  }
});

export default reducer;

export function transcribeMedia(file) {
  return async (dispatch, getState, client) => {
    dispatch({ type: TRANSCRIBE_START });

    let tdoId;
    try {
      dispatch({ type: CREATE_TDO });

      let createTDOQuery = `mutation {
        createTDO(input: {
          startDateTime: ${file.startDateTime},
          stopDateTime: ${file.stopDateTime}
        }), {
          id
        }
      }
      `;

      await axios({
        url: '/v3/graphql',
        method: 'post',
        data: {
          query: createTDOQuery
        }
      }).then(response => {
        tdoId = response.data.data.createTDO.id;
      });
    } catch (e) {
      return dispatch({
        type: CREATE_TDO_FAILURE,
        payload: 'Failed to create temporal data object'
      });
    }

    try {
      dispatch({ type: CREATE_MEDIA_ASSET });

      let createAssetQuery = `mutation {
        createAsset(input: {
          containerId: ${tdoId},
          assetType: "media",
        }),{
          id
        }
      }
      `;

      let formData = new FormData();
      formData.append("query", createAssetQuery)
      formData.append("filename", file.name)
      formData.append("file", file)
      await axios.post('v3/graphql', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (e) {
      return dispatch({
        type: CREATE_MEDIA_ASSET_FAILURE,
        payload: 'Failed to create media asset'
      });
    }

    let jobId;
    try {
      dispatch({ type: CREATE_JOB });

      let engineId = "2b06ec74-2e70-5f1a-f834-2bd7d6fdfdf2"; //Supernova-English (USA)
      let createJobQuery =`mutation {
        createJob(input:{
          targetId: ${tdoId},
          tasks :[
            {
              engineId: "${engineId}"
            }
          ]
        }) {
          id
        }
      }
      `;

      await axios({
        url: '/v3/graphql',
        method: 'post',
        data: {
          query: createJobQuery
        }
      }).then(response => {
        jobId = response.data.data.createJob.id;
      });
    } catch (e) {
      return dispatch({
        type: CREATE_JOB_FAILURE,
        payload: 'Failed to create job'
      });
    }

    try {
      dispatch({ type: GET_JOB });

      await pollForJob(jobId, client).then(response => {
        tdoId = response.target.id;
      });
    } catch (e) {
      return dispatch({
        type: GET_JOB_FAILURE,
        payload: 'Failed to retrieve job'
      });
    }

    let assets;
    try {
      dispatch({ type: GET_TDO_TRANSCRIPT });

      let getTDOQuery = `query {
        temporalDataObject(id:${tdoId}) {
          assets {
            count,
            records{
              id,
              contentType,
              type,
              jsondata,
              signedUri
            }
          }
        }
      }
      `;
      await axios({
        url: '/v3/graphql',
        method: 'post',
        data: {
          query: getTDOQuery
        }
      }).then(response => {
        console.log(response);
        assets = response.data.data.temporalDataObject.assets
      });
    } catch (e) {
      return dispatch({
        type: GET_TDO_TRANSCRIPT_FAILURE,
        payload: 'Failed to fetch transcript'
      });
    }

    dispatch({ type: TRANSCRIBE_SUCCESS, payload: assets });
  };
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function pollForJob(jobId, client) {
  let job;
  try {
    let getJobQuery = `query {
      job(id:"${jobId}") {
        id
        status
        tasks {
          records {
            id
            status
            output
            target {
              id
            }
          }
        },
        target {
          id
        }
      }
    }
    `;
    await axios({
      url: '/v3/graphql',
      method: 'post',
      data: {
        query: getJobQuery  
      }
    }).then(response => {
      job = response.data.data.job;
    });
  } catch (e) {
    throw new Error('Failed to fetch job');
  }

  if (job.status === 'failed') {
    throw new Error('Job failed');
  }

  if (job.status === 'complete') {
    return job;
  }

  await delay(5000);
  return await pollForJob(jobId, client);
}
