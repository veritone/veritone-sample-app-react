import React from 'react';
import Divider from 'material-ui/Divider';
import ExpandingContainer from 'shared-components/ExpandingContainer';
import MediaUploadState from 'shared-components/MediaUploadState';
import MediaUploadStates from 'shared-components/MediaUploadStates';
import { PropTypes } from 'helpers/react';

import './styles/index.css';

const { number, string, arrayOf, objectOf, func, any, bool } = PropTypes;


export default class RequestBar extends React.Component {
  static propTypes = {
    id: number,
    description: string,
    endpoint: string,
    parameters: objectOf(any),
    fields: arrayOf(any),
    expanded: bool,
    button: any,
    onClick: func
  };
  static defaultProps = {
    expanded: false
  };

  render() {
    const defaultBtn = (
      <button className="requestBar__btn" onClick={this.props.onClick}>
        Request
      </button>
    );
    const button = !this.props.expanded ? (this.props.button || defaultBtn) : null;

    const endpointMarkup = (
      <small className='requestBar__endpoint'>
        { this.props.endpoint }
      </small>
    );
    const endpoint = this.props.endpoint ? endpointMarkup : null;

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

    return (
      <div className='requestBar'>
        <div className='requestBar__header'>
          <div>
            <div>
              { this.props.id }. { this.props.description }
            </div>
            { endpoint }
          </div>
          <div className='requestBar__btn-container'>
            { button }
          </div>
        </div>
        <ExpandingContainer
            defaultExpanded={this.props.expanded}
          >
          <Divider style={{ marginTop: '20px'}}/>
          <MediaUploadStates />
          <Divider />
          {false &&
          <MediaUploadState action='Results' />}
          {false &&
          <div className='requestBar__payload'>
            <pre>{JSON.stringify(payload, null, 2)}</pre>
          </div>}
        </ExpandingContainer>
      </div>
    );
  }
}