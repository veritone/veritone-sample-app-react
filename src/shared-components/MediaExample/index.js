import React from 'react';
import { connect } from 'react-redux';
import { objectOf, shape, string, func, any } from 'prop-types';

import Divider from 'material-ui/Divider';
import MediaUpload from 'shared-components/MediaUpload';
import MediaUploadState from 'shared-components/MediaUploadState';
import MediaUploadStates from 'shared-components/MediaUploadStates';
import RequestBar from 'shared-components/RequestBar';

import { transcribeMedia } from 'modules/mediaExample';

class MediaExample extends React.Component {
  static propTypes = {
    actions: objectOf(
      shape({
        name: string,
        status: string
      })
    ),
    transcribeMedia: func.isRequired,
    result: objectOf(any)
  };

  state = {
    expanded: false
  };

  handleFileLoad = (e, file) => {
    this.setState({
      expanded: true
    });

    this.props.transcribeMedia(file);
  };

  render() {
    const actions = this.props.actions;
    const showResults = actions.getJob && actions.getJob.status === 'success';

    return (
      <div>
        <h4>Transcription Example</h4>
        <RequestBar
          id={1}
          description="Upload a media file to begin transcription"
          expanded={this.state.expanded}
          button={<MediaUpload onFileLoad={this.handleFileLoad} />}
        >
          <Divider style={{ marginTop: 20 + 'px' }} />
          <MediaUploadStates actions={actions} />
          <Divider />
          {showResults && <MediaUploadState action="Results" />}
          {showResults && (
            // fixme: <RequestBarPayload> component
            <div className="requestBar__payload">
              <pre>{JSON.stringify(this.props.result, null, 2)}</pre>
            </div>
          )}
        </RequestBar>
      </div>
    );
  }
}

export default connect(
  state => ({
    actions: state.mediaExample.actions,
    result: state.mediaExample.result
  }),
  { transcribeMedia }
)(MediaExample);
