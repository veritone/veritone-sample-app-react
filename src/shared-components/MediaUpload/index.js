// *-* mode: rjsx -*-
import React, {Component} from 'react';
import propTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {filter, assign} from 'lodash';

import styles from './styles/index.css';


export default class MediaUpload extends Component {

    static defaultProps = {
        fileTypeRegex: /.*/,
        onFileLoad: (e) => undefined,
        buttonControl: RaisedButton,
        myVideos: []
    };

    static propTypes = {
        fileTypeRegex: propTypes.object,
        onFileLoad: propTypes.func,
        buttonControl: propTypes.func,
        myVideos: propTypes.array
    };

    exclusiveProps = [
        'fileTypeRegex',
        'onFileLoad',
        'buttonControl'
    ];

    onInputChange = (e) => {
        filter(
            e.target.files,
            (file) => file.type.match(this.props.fileTypeRegex) !== null
        )
            .forEach(
                (file) => {
                    const self = this;
                    console.log('file', file)
                    // Files is a list because you can select several files
                    // We just upload the first selected file
                    const reader = new FileReader();

                    // We read the file and call the upload function with the result
                    reader.onload = (evt) => {
                        console.log('evt', evt);
                        self.props.myVideos.push(file);
                        const video = document.createElement('video');
                        video.preload = 'metadata';
                        
                        video.onloadedmetadata = function() {
                            window.URL.revokeObjectURL(this.src)
                            const startDateTime = file.lastModified;
                            const duration = Math.round(video.duration);
                            const stopDateTime = startDateTime + duration;
                            console.log('duration', duration)
                            self.props.myVideos[self.props.myVideos.length-1].startDateTime = startDateTime;
                            self.props.myVideos[self.props.myVideos.length-1].stopDateTime = stopDateTime;
                            self.props.myVideos[self.props.myVideos.length-1].duration = duration;
                            console.log('startDateTime', startDateTime);
                            console.log('stopDateTime', stopDateTime);

                            self.props.onFileLoad(evt, self.props.myVideos[0]);
                        }

                        video.src = URL.createObjectURL(file);
                    }

                    reader.readAsArrayBuffer(file);                      
                }
            );
    };

    componentDidMount() {
        findDOMNode(this.refs['file-input'])
            .addEventListener(
                'change',
                this.onInputChange,
                false
            );
    };

    componentWillUnmount() {
        findDOMNode(this.refs['file-input'])
            .removeEventListener(
                'change',
                this.onInputChange,
                false
            );
    };

    getControlProps() {
        return Object
            .keys(this.props)
            .filter(
                (name) => this.exclusiveProps.indexOf(name) === -1
            )
            .reduce(
                (acc, name) => {
                    acc[name] = this.props[name];
                    return acc;
                },
                {}
            );
    };

    render() {
        return (
            <RaisedButton
                backgroundColor='#2196f3'
                buttonStyle={{ minWidth:'110px' }}
                labelStyle={{ color: '#fff', textTransform:'capitalize' }}
                containerElement='label'
                label='Upload'>
                <input
                    className='FileInput'
                    type="file"
                    ref="file-input"
                />
            </RaisedButton>
        );
    };

}