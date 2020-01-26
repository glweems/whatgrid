export interface SiteUrl {
  path: string;
  text: string;
}

/**
 * Login Url
 @example /?login=true
 */
export const login: SiteUrl = {
  path: '/?login=true',
  text: 'login'
};

/**
 * Signup Url
 @example /?signup=true
 */
export const signup: SiteUrl = {
  path: '/?signup=true',
  text: 'signup'
};
