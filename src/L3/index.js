import { OAuth2Strategy } from 'remix-auth-oauth2';

export const PROVIDER_NAME = 'google';

export const SCOPE = {
  USER_INFO: 'https://www.googleapis.com/auth/userinfo.profile',
  USER_EMAIL: 'https://www.googleapis.com/auth/userinfo.email'
};

const ENDPOINT = {
  USER_PROFILE: 'https://www.googleapis.com/oauth2/v2/userinfo'
};


export class GoogleStrategy extends OAuth2Strategy {
  name = PROVIDER_NAME;
  scope;
  userProfileURL;

  constructor(
    { clientID, clientSecret, callbackURL, scope },
    verify
  ) {
    super(
      {
        authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenURL: 'https://oauth2.googleapis.com/token',
        clientID,
        clientSecret,
        callbackURL
      },
      verify
    );

    this.scope = scope ?? `${SCOPE.USER_INFO} ${SCOPE.USER_EMAIL}`;
    this.userProfileURL = ENDPOINT.USER_PROFILE;
  }

  authorizationParams() {
    const urlSearchParams = {
      scope: this.scope
    };

    return new URLSearchParams(urlSearchParams);
  }

  async userProfile(accessToken) {
    const response = await fetch(this.userProfileURL, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const data= await response.json();

    const profile = {
      provider: PROVIDER_NAME,
      displayName: data.name,
      id: data.sub,
      name: {
        familyName: data.family_name,
        givenName: data.given_name,
        middleName: data.middle_name
      },
      emails: [{ value: data.email }],
      photos: [{ value: data.picture }],
      _json: data
    };

    return profile;
  }
}