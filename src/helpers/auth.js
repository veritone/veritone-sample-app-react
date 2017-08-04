// import { routerActions } from 'react-router-redux';
// //import { UserAuthWrapper } from 'redux-auth-wrapper';
// //import { isEmpty } from 'lodash';
// // import {
// //   permissions as perms,
// //   util as permissionUtil
// // } from 'functional-permissions-lib';
// //
// // import { userCompletedDevSignup } from 'modules/user';
//
// //todo: middleware that watches for 401s and re-checks userIsLoggedIn if it sees
// //one, then base authSelector on that.
//
// export const EnsureUserIsAuthenticated = UserAuthWrapper({
//   authSelector: state => state.user,
//   predicate: user => !isEmpty(user.user),
//   authenticatingSelector: state =>
//     state.user.isLoggingIn || state.user.isFetching,
//   redirectAction: routerActions.replace,
//   wrapperDisplayName: 'UserIsAuthenticated',
//   failureRedirectPath: '/login',
//   // no access -> logout -> login as dev user should not redir to no-access
//   allowRedirectBack: ({ pathname }) => pathname !== '/no-access'
// });
//
// export const EnsureUserCompletedDevSignup = UserAuthWrapper({
//   authSelector: state => state.user,
//   predicate: userState => {
//     if (
//       !permissionUtil.hasAccessTo(
//         perms.developer.access,
//         userState.user.permissionMasks
//       )
//     ) {
//       // ignore for users who don't have app permissions
//       return true;
//     }
//
//     // redirect if user hasn't completed signup
//     return userCompletedDevSignup(userState);
//   },
//   // authenticatingSelector: state => state.user.isLoggingIn || state.user.isFetching,
//   failureRedirectPath: '/onboarding/profile',
//   redirectAction: routerActions.replace,
//   allowRedirectBack: false,
//   wrapperDisplayName: 'EnsureUserCompletedDevSignup'
// });
//
// export const RedirectIfLoggedIn = UserAuthWrapper({
//   authSelector: state => state.user,
//   predicate: user => isEmpty(user.user),
//   // redirect the user when they are done loading and authenticated
//   authenticatingSelector: state =>
//     state.user.isLoggingIn || state.user.isFetching,
//   failureRedirectPath: (state, ownProps) =>
//     ownProps.location.query.redirect || '/',
//   allowRedirectBack: false,
//   redirectAction: routerActions.replace,
//   wrapperDisplayName: 'RedirectIfLoggedIn'
// });
//
// export const RedirectIfCompletedDevSignup = UserAuthWrapper({
//   authSelector: state => state.user,
//   predicate: userState => !userCompletedDevSignup(userState),
//   failureRedirectPath: '/',
//   allowRedirectBack: false,
//   redirectAction: routerActions.replace,
//   wrapperDisplayName: 'RedirectIfCompletedDevSignup'
// });
