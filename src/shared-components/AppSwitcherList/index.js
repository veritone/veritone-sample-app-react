import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { PropTypes } from 'helpers/react';
import cx from 'classnames';
import styles from './styles/index.scss';
const { string, arrayOf, shape } = PropTypes;

export default class AppSwitcherList extends React.Component {
  static propTypes = {
    enabledApps: arrayOf(
      shape({
        applicationId: string,
        applicationName: string,
        applicationIconSvg: string,
        applicationIconUrl: string
      })
    )
  };
  static defaultProps = {
    enabledApps: []
  };

  render() {
    return this.props.enabledApps.length
      ? <div>
          {this.props.enabledApps.map(app => {
            const appListButtonIconClasses = cx(styles['appListButtonIcon'], {
              [`${styles['hasSvg']}`]: app.applicationIconSvg
            });
            return (
              <MenuItem
                className={styles['appListButton']}
                key={app.applicationId}
                href={`/switch-app/${app.applicationId}`}
                target={app.applicationId}
              >
                <img
                  className={appListButtonIconClasses}
                  src={app.applicationIconSvg || app.applicationIconUrl}
                />
                {app.applicationName}
              </MenuItem>
            );
          })}
        </div>
      : <div className={styles['appListButtonNullstate']}>
          No Applications Found
        </div>;
  }
}
