import { createReducer } from 'helpers/redux';

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
  return (dispatch, getState, client) => {
    dispatch(
      createRecording({
        startDateTime: file.startDateTime,
        stopDateTime: file.stopDateTime
      })
    )
      .then(response => {
        const recordingId = response.payload.recordingId;

        return dispatch(createMediaAsset(recordingId, file));
      })
      .then(response => {
        const recordingId = response.payload.recordingId;
        const tasks = [
          {
            engineId: 'transcribe-voicebase'
          }
        ];

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
  return (dispatch, getState, client) => {
    dispatch({ type: CREATE_RECORDING });
    return client.recording.createRecording(recording).then(
      recording =>
        dispatch({
          type: CREATE_RECORDING_SUCCESS,
          payload: recording
        }),
      err =>
        dispatch({
          type: CREATE_RECORDING_FAILURE
        })
    );
  };
}

export function createMediaAsset(recordingId, asset) {
  return (dispatch, getState, client) => {
    dispatch({ type: CREATE_MEDIA_ASSET });
    return client.recording.createAsset(recordingId, asset).then(
      asset =>
        dispatch({
          type: CREATE_MEDIA_ASSET_SUCCESS,
          payload: asset
        }),
      err =>
        dispatch({
          type: CREATE_MEDIA_ASSET_FAILURE
        })
    );
  };
}

export function createJob(recordingId, tasks) {
  return (dispatch, getState, client) => {
    dispatch({ type: CREATE_JOB });
    return client.job.createJob({ recordingId, tasks }).then(
      job =>
        dispatch({
          type: CREATE_JOB_SUCCESS,
          payload: job
        }),
      err =>
        dispatch({
          type: CREATE_JOB_FAILURE
        })
    );
  };
}

export function getJob(jobId, recordingId) {
  return (dispatch, getState, client) => {
    dispatch({ type: GET_JOB });
    return client.job.getJob(jobId).then(
      job => {
        if (job.status === 'failed') {
          return dispatch({ type: GET_JOB_FAILURE });
        }

        if (job.status === 'complete') {
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
  return (dispatch, getState, client) => {
    dispatch({ type: GET_RECORDING_TRANSCRIPT });
    return client.recording
      .getRecordingTranscript(recordingId)
      .then(
        transcript =>
          dispatch({
            type: GET_RECORDING_TRANSCRIPT_SUCCESS,
            payload: transcript
          }),
        err =>
          dispatch({
            type: GET_RECORDING_TRANSCRIPT_FAILURE
          })
      );
  };
}
