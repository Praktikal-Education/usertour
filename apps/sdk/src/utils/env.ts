import { UserTourTypes } from '@usertour-ui/types';
import { window } from './globals';

const getWsUri = () => {
  return getUsertourEnvVars('WS_URI') || import.meta.env.VITE_WS_URI;
};

const getWsPath = () => {
  const wsUri = getWsUri();
  let basePath = '/';

  if (wsUri) {
    if (wsUri.includes('://')) {
      try {
        const url = new URL(wsUri);
        basePath = url.pathname;
      } catch (e) {
        console.error('Invalid WS_URI format:', wsUri, e);
      }
    } else if (wsUri.startsWith('/')) {
      basePath = wsUri;
    } else {
      basePath = `/${wsUri}`;
    }
  }

  if (basePath !== '/' && !basePath.endsWith('/')) {
    basePath = `${basePath}/`;
  }

  return `${basePath}socket.io`;
};

const getAssetsUri = () => {
  return getUsertourEnvVars('ASSETS_URI') || import.meta.env.VITE_ASSETS_URI;
};

const getMainCss = () => {
  // @ts-ignore: USERTOUR_APP_MAIN_CSS is injected by vite
  const mainCss =
    typeof USERTOUR_APP_MAIN_CSS !== 'undefined' ? USERTOUR_APP_MAIN_CSS : '/css/index.css';
  return getAssetsUri() + mainCss;
};

const getUserTourCss = () => {
  // @ts-ignore: USERTOUR_APP_USER_TOUR_CSS is injected by vite
  const userTourCss =
    typeof USERTOUR_APP_USER_TOUR_CSS !== 'undefined'
      ? USERTOUR_APP_USER_TOUR_CSS
      : '/css/usertour.css';
  return getAssetsUri() + userTourCss;
};

const getUsertourEnvVars = (key: string) => {
  const w: UserTourTypes.WindowWithUsertour = typeof window === 'undefined' ? ({} as any) : window;
  const envVars = w.USERTOURJS_ENV_VARS || {};
  return envVars[key];
};

export { getWsUri, getMainCss, getUserTourCss, getWsPath };
