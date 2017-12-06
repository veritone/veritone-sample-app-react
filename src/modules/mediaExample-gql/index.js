import { createReducer } from 'helpers/redux';
  import { gqlClient, gqlUploadClient } from '../../helpers/index';
import gql from 'graphql-tag';

export const CREATE_RECORDING = 'vtn/recording/CREATE_RECORDING';
export const CREATE_RECORDING_SUCCESS =
  'vtn/recording/CREATE_RECORDING_SUCCESS';
export const CREATE_RECORDING_FAILURE =
  'vtn/recording/CREATE_RECORDING_FAILURE';

export const CREATE_MEDIA_ASSET = 'vtn/recording/CREATE_MEDIA_ASSET';
export const CREATE_MEDIA_ASSET_SUCCESS =
  'vtn/recording/CREATE_MEDIA_ASSET_SUCCESS';
export const CREATE_MEDIA_ASSET_FAILURE =
  'vtn/recording/CREATE_MEDIA_ASSET_FAILURE';

export const CREATE_JOB = 'vtn/job/CREATE_JOB';
export const CREATE_JOB_SUCCESS = 'vtn/job/CREATE_JOB_SUCCESS';
export const CREATE_JOB_FAILURE = 'vtn/job/CREATE_JOB_FAILURE';

export const GET_JOB = 'vtn/job/GET_JOB';
export const GET_JOB_SUCCESS = 'vtn/job/GET_JOB_SUCCESS';
export const GET_JOB_FAILURE = 'vtn/job/GET_JOB_FAILURE';

export const GET_RECORDING_TRANSCRIPT = 'vtn/recoding/GET_RECORDING_TRANSCRIPT';
export const GET_RECORDING_TRANSCRIPT_SUCCESS =
  'vtn/recoding/GET_RECORDING_TRANSCRIPT_SUCCESS';
export const GET_RECORDING_TRANSCRIPT_FAILURE =
  'vtn/recoding/GET_RECORDING_TRANSCRIPT_FAILURE';

export const namespace = 'mediaExample';

const defaultState = {
  actions: {},
  result: {}
};

const reducer = createReducer(defaultState, {
  [CREATE_RECORDING](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        createRecording: {
          name: 'Creating Recording',
          status: 'loading'
        }
      }
    };
  },

  [CREATE_RECORDING_SUCCESS](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        createRecording: {
          ...state.actions.createRecording,
          name: 'Created Recording',
          status: 'success'
        }
      }
    };
  },

  [CREATE_RECORDING_FAILURE](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        createRecording: {
          ...state.actions.createRecording,
          name: 'Failed To Create Recording',
          status: 'failed'
        }
      }
    };
  },
  [CREATE_MEDIA_ASSET](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        createMediaAsset: {
          name: 'Creating Media Asset',
          status: 'loading'
        }
      }
    };
  },

  [CREATE_MEDIA_ASSET_SUCCESS](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        createMediaAsset: {
          ...state.actions.createMediaAsset,
          name: 'Created Media Asset',
          status: 'success'
        }
      }
    };
  },

  [CREATE_MEDIA_ASSET_FAILURE](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        createMediaAsset: {
          ...state.actions.createMediaAsset,
          name: 'Failed To Create Media Asset',
          status: 'failed'
        }
      }
    };
  },

  [CREATE_JOB](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        createJob: {
          name: 'Creating Job',
          status: 'loading'
        }
      }
    };
  },

  [CREATE_JOB_SUCCESS](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        createJob: {
          ...state.actions.createJob,
          name: 'Created Job',
          status: 'success'
        }
      }
    };
  },

  [CREATE_JOB_FAILURE](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        createJob: {
          ...state.actions.createJob,
          name: 'Failed To Get Job',
          status: 'failed'
        }
      }
    };
  },

  [GET_JOB](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        getJob: {
          name: 'Polling For Job',
          status: 'loading'
        }
      }
    };
  },

  [GET_JOB_SUCCESS](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        getJob: {
          ...state.actions.getJob,
          name: 'Job Complete',
          status: 'success'
        }
      }
    };
  },

  [GET_JOB_FAILURE](state, action) {
    return {
      ...state,
      actions: {
        ...state.actions,
        getJob: {
          ...state.actions.getJob,
          name: 'Failed To Get Job',
          status: 'failed'
        }
      }
    };
  },

  [GET_RECORDING_TRANSCRIPT](state, action) {
    return {
      ...state
    };
  },

  [GET_RECORDING_TRANSCRIPT_SUCCESS](state, action) {
    return {
      ...state,
      result: action.payload
    };
  },

  [GET_RECORDING_TRANSCRIPT_FAILURE](state, action) {
    return {
      ...state
    };
  }
});

export default reducer;

export function transcribeMedia(file) {
  return (dispatch, getState, gqlClient) => {
    dispatch(
      createRecording({
        startDateTime: Math.round(file.startDateTime / 1000), // Convert to UnixSec
        stopDateTime: Math.round(file.stopDateTime / 1000), // Convert to UnixSec
        status: "uploading" // Enum from media_status
      }))
      .then(response => {
        const recordingId = response.payload.data.createTDO.id;
        return dispatch(createMediaAsset(recordingId, file));
      })
      .then(response => {
        const recordingId = response.payload.recordingId;
        const tasks = [{engineId: 'transcribe-voicebase'}];
        return dispatch(createJob(recordingId, tasks));
      })
      .then(response => {
        const jobId = response.payload.jobId;
        const recordingId = response.payload.recordingId;
        return dispatch(getJob(jobId, recordingId));
      });
  };
}

export function createRecording(recording) {
  return (dispatch, getState, gqlClient) => {
    dispatch({ type: CREATE_RECORDING });
    return gqlClient.mutate({mutation: gql`
        mutation CreateTDO($input: CreateTDO!) {
          createTDO(input: $input) {
            id
            applicationId
          }
        }`, 
      variables: {
        "input": recording
      }
    }).then(
      res => 
        dispatch({
          type: CREATE_RECORDING_SUCCESS,
          payload: res
        }),
      err =>
        dispatch({
          type: CREATE_RECORDING_FAILURE
        })
    );
  };
}

export function createMediaAsset(recordingId, asset) {
  return (dispatch, getState, gqlClient) => {
    dispatch({ type: CREATE_MEDIA_ASSET });
    return gqlUploadClient.mutate({ mutation: gql`
      mutation {
        createAsset(input: {
          containerId: ${recordingId}
          type: "media"
          contentType: "video/mp4"
        }) {
          id
        }
      }
    `
    /**
     * Variables obj is needed here to pass down file. It is not fully supported 
     * by core-graphql-server with multipart request
     */ 
    , variables: {
        "file": asset,
      }
    }
  )
  .then(
      asset =>
        dispatch({
          type: CREATE_MEDIA_ASSET_SUCCESS,
          payload: {recordingId: recordingId}
        }),
      err => {
        dispatch({
          type: CREATE_MEDIA_ASSET_FAILURE
        })
      }
    );
  };
}

export function createJob(recordingId, tasks) {
  return (dispatch, getState, gqlClient) => {
    dispatch({ type: CREATE_JOB });
    return gqlClient.mutate({mutation: gql`
      mutation CreateJob($input: CreateJob!) {
        createJob(input: $input) {
          id
        }
      }`, 
      variables: {
        "input": {
          "targetId": recordingId,
          "tasks": tasks
        }
    }})
    .then(
      resp =>
        dispatch({
          type: CREATE_JOB_SUCCESS,
          payload: {
            jobId: resp.data.createJob.id, 
            recordingId: recordingId
          }
        }),
      err =>
        dispatch({
          type: CREATE_JOB_FAILURE
        })
    );
  };
}

export function getJob(jobId, recordingId) {
  return (dispatch, getState, gqlClient) => {
    dispatch({ type: GET_JOB });
    return gqlClient.query({
      query: gql`{ job(id: "${jobId}") { id status } }`, 
      // fetchPolicy is needed here to bypass InMemoryCache
      fetchPolicy: "network-only"
    })
    .then(
      resp => {
        const status = resp.data.job.status;
        if (status === 'failed') {
          return dispatch({ type: GET_JOB_FAILURE });
        }

        if (status === 'complete') {
          dispatch({ type: GET_JOB_SUCCESS });
          return dispatch(getRecordingTranscript(recordingId));
        }
        setTimeout(function() {
          return dispatch(getJob(jobId, recordingId));
        }, 5000);
      },
      err =>
        dispatch({
          type: GET_JOB_FAILURE
        })
    );
  };
}

export function getRecordingTranscript(recordingId) {
  return (dispatch, getState, gqlClient) => {
    dispatch({ type: GET_RECORDING_TRANSCRIPT });
    return gqlClient.query({query: gql`{ 
      temporalDataObject(id: "${recordingId}") { 
        assets(type: "transcript") {
          records {
            signedUri
          }
        }
      }}`})
      .then(
        resp => {
          dispatch({
            type: GET_RECORDING_TRANSCRIPT_SUCCESS,
            payload: resp.data.temporalDataObject.assets.records
          })
        },
        err =>
          dispatch({
            type: GET_RECORDING_TRANSCRIPT_FAILURE
          })
      );
  };
}
