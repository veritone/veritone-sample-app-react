import { createReducer } from 'helpers/redux';
import { isEmpty } from 'helpers';

export const CREATE_RECORDING = 'vtn/recording/CREATE_RECORDING';
export const CREATE_RECORDING_SUCCESS = 'vtn/recording/CREATE_RECORDING_SUCCESS';
export const CREATE_RECORDING_FAILURE = 'vtn/recording/CREATE_RECORDING_FAILURE';

export const CREATE_MEDIA_ASSET = 'vtn/recording/CREATE_MEDIA_ASSET';
export const CREATE_MEDIA_ASSET_SUCCESS = 'vtn/recording/CREATE_MEDIA_ASSET_SUCCESS';
export const CREATE_MEDIA_ASSET_FAILURE = 'vtn/recording/CREATE_MEDIA_ASSET_FAILURE';

export const CREATE_JOB = 'vtn/job/CREATE_JOB';
export const CREATE_JOB_SUCCESS = 'vtn/job/CREATE_JOB_SUCCESS';
export const CREATE_JOB_FAILURE = 'vtn/job/CREATE_JOB_FAILURE';

export const GET_JOB = 'vtn/job/GET_JOB';
export const GET_JOB_SUCCESS = 'vtn/job/GET_JOB_SUCCESS';
export const GET_JOB_FAILURE = 'vtn/job/GET_JOB_FAILURE';

export const namespace = 'mediaExample';

const defaultState = {
  actions: {}
};

const reducer = createReducer(defaultState, {
  [CREATE_RECORDING](state, action) {
    console.log('CREATE_RECORDING action', action)
    console.log('CREATE_RECORDING state', state)
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
    console.log('CREATE_RECORDING_SUCCESS action', action)
    console.log('CREATE_RECORDING_SUCCESS state', state)
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
          name: 'Begin Polling For Job',
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
          name: 'Polling For Job',
          status: 'loading'
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
  }
});

export default reducer;

function local(state) {
  return state[namespace];
}

export function transcribeMedia(file) {
  return (dispatch, getState, client) => {
    dispatch(createRecording({
      startDateTime: file.startDateTime,
      stopDateTime: file.stopDateTime
    }))
    .then((response) => {
      console.log('createRecording() payload', response)
      const recordingId = response.payload.recordingId;

      return dispatch(createMediaAsset(recordingId, file));
    })
    .then((response) => {
      console.log('createMediaAsset() payload', response)
      const recordingId = response.payload.recordingId;
      const tasks = [
        {
          engineId: "44081d92-444d-457e-8899-e45462f17933" // steves
        }
      ];

      return dispatch(createJob(recordingId, tasks));
    })
    .then((response) => {
      console.log('createJob() payload', response)
      const self = this;
      const jobId = response.payload.jobId;
      // var x = 0;
      // var intervalID = setInterval(function () {
        
      //      // Your logic here
      //      self.props.getJob(jobId).then(response => console.log('resp', response));
      //      if (++x === 5) {
      //          window.clearInterval(intervalID);
      //      }
      //   }, 5000);
      

      return dispatch(getJob(jobId));
    })
    .then((response) => {
      // return dispatch(showResults());
      console.log('getJob() payload', response)
    })
  }
}


export function createRecording(recording) {
  console.log('recording..', recording)
  return (dispatch, getState, client) => {
    dispatch({ type: CREATE_RECORDING })
    console.log('client', client);
    return client.client2.recording.createRecording(recording).then(
      (recording) => dispatch({
        type: CREATE_RECORDING_SUCCESS,
        payload: recording
      }),
      (err) => dispatch({
        type: CREATE_RECORDING_FAILURE,
        error: true,
        payload: err
      })
    );
  }
}

export function createMediaAsset(recordingId, asset) {
  console.log('recordingId..', recordingId)
  return (dispatch, getState, client) => {
    dispatch({ type: CREATE_MEDIA_ASSET })
    console.log('client', client);
    return client.client2.recording.createAsset(recordingId, asset).then(
      (recording) => dispatch({
        type: CREATE_MEDIA_ASSET_SUCCESS,
        payload: recording
      }),
      (err) => dispatch({
        type: CREATE_MEDIA_ASSET_FAILURE,
        error: true,
        payload: err
      })
    );
  }
}

export function createJob(recordingId, tasks) {
  console.log('recordingId..', recordingId);
  console.log('tasks', tasks)
  return (dispatch, getState, client) => {
    dispatch({ type: CREATE_JOB })
    console.log('client', client);
    return client.client2.job.createJob({ recordingId, tasks }).then(
      (job) => dispatch({
        type: CREATE_JOB_SUCCESS,
        payload: job
      }),
      (err) => dispatch({
        type: CREATE_JOB_FAILURE,
        error: true,
        payload: err
      })
    );
  }
}

export function getJob(jobId) {
  console.log('jobId..', jobId);
  return (dispatch, getState, client) => {
    dispatch({ type: GET_JOB })
    console.log('client', client);
    return client.client2.job.getJob(jobId).then(
      (job) => dispatch({
        type: GET_JOB_SUCCESS,
        payload: job
      }),
      (err) => dispatch({
        type: GET_JOB_FAILURE,
        error: true,
        payload: err
      })
    );
  }
}