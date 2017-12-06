import React from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import MediaUpload from 'shared-components/MediaUpload';
import MediaUploadState from 'shared-components/MediaUploadState';
import MediaUploadStates from 'shared-components/MediaUploadStates';
import RequestBar from 'shared-components/RequestBar';

import { transcribeMedia as transcribeMediaGql } from '../../modules/mediaExample-gql';
import { transcribeMedia as transcribeMediaRest} from '../../modules/mediaExample';

class MediaExample extends React.Component {
  state = {
    expanded: false
  };

  onFileLoad = (e, file) => {
    this.setState({
      expanded: true
    });
    if (process.env.REACT_APP_CLIENT_TYPE === 'GRAPHQL') {
      this.props.transcribeMediaGql(file);
    } else {
      this.props.transcribeMediaRest(file);
    }
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
          button={<MediaUpload onFileLoad={this.onFileLoad} />}
        >
          <Divider style={{ marginTop: 20 + 'px' }} />
          <MediaUploadStates actions={actions} />
          <Divider />
          {showResults && <MediaUploadState action="Results" />}
          {showResults &&
            <div className="requestBar__payload">
              <pre>
                {JSON.stringify(this.props.payload, null, 2)}
              </pre>
            </div>}
        </RequestBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    actions: state.mediaExample.actions,
    payload: state.mediaExample.result
  };
};

const mapDispatchToProps = { transcribeMediaRest, transcribeMediaGql };

export default connect(mapStateToProps, mapDispatchToProps)(MediaExample);
