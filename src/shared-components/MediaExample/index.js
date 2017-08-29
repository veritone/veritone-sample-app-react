import React from 'react';
import { PropTypes } from 'helpers/react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import MediaUpload from 'shared-components/MediaUpload';
import MediaUploadState from 'shared-components/MediaUploadState';
import MediaUploadStates from 'shared-components/MediaUploadStates';
import RequestBar from 'shared-components/RequestBar';
import ExpandingContainer from 'shared-components/ExpandingContainer';

import { transcribeMedia } from 'modules/mediaExample';


const { bool } = PropTypes;


class MediaExample extends React.Component {

  state = {
    expanded: false
  };

  onFileLoad = (e, file) => {

    this.setState({
      expanded: true
    });

    this.props.transcribeMedia(file);
  };

  render() {
    const payload = {
        "jobId": "000e68d8-4d3b-4bc3-b7b2-4bdca5ed8326",
        "recordingId": "21098970",
        "sourceAssetId": null,
        "createdDateTime": 1503701619,
        "modifiedDateTime": 1503701619,
        "retries": 0,
        "clusterId": null,
        "bundleId": null,
        "tasks": [
            {
                "taskId": "000e68d8-4d3b-4bc3-b7b2-4bdca5ed8326-ca5ecf8f-1e6d-4c94-90f2-9d2dbe46e422",
                "jobId": "000e68d8-4d3b-4bc3-b7b2-4bdca5ed8326",
                "applicationId": "652cf6d2-0834-46c2-bbd3-821333d369ea",
                "createdDateTime": 1503701619,
                "queuedDateTime": 1503701619,
                "modifiedDateTime": 1503701619,
                "completedDateTime": null,
                "taskOrder": 0,
                "taskExecutor": "iron-io",
                "taskExecutorId": "59a0aa73dc3073000ba3dd3e",
                "taskStatus": "queued",
                "taskPayload": {
                    "mode": "library-run",
                    "libraryId": "513c805f-2893-4f49-8814-b2548ef700d6"
                },
                "taskOutput": null,
                "recordingId": "21098970",
                "isClone": false,
                "engineId": "imagedetection-facerecognition-kairos",
                "failureType": null,
                "taskLog": null,
                "sourceAssetId": null,
                "enginePrice": null,
                "customerPrice": null,
                "mediaLengthSecs": null,
                "mediaStorageBytes": null,
                "mediaFileName": null,
                "businessName": null,
                "buildId": "aa6832b6-6e44-4297-8bc5-128311d44c13",
                "buildId2": null,
                "buildId3": null
            }
        ],
        "status": "running"
    }

    const actions = this.props.actions;

    const showResults = this.props.actions.getJob &&
                        this.props.actions.getJob.status === 'success';

    return (
      <div>
        <h4>Transcription Example</h4>
        <RequestBar
          id={1}
          description='Upload a media file to begin transcription'
          expanded={this.state.expanded}
          button={
            <MediaUpload onFileLoad={this.onFileLoad}/>
          }
        >
          <Divider style={{ marginTop: '20px'}} />
          <MediaUploadStates actions={this.props.actions} />
          <Divider />
          {showResults &&
          <MediaUploadState action='Results' />}
          {showResults &&
          <div className='requestBar__payload'>
            <pre>{JSON.stringify(payload, null, 2)}</pre>
          </div>}
        </RequestBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    actions: state.mediaExample.actions
  }
}

const mapDispatchToProps = { transcribeMedia }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaExample)

