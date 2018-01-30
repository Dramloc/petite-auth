<p align="center">
	<img alt="Petite · Auth logo" src="https://petite-auth.surge.sh/assets/icons/android-chrome-192x192.png" />
</p>

# Petite · Auth

> :lock: Tiny (433B) JavaScript OAuth2 client. Try it live [here](https://petite-auth.surge.sh/).

This library implements OAuth2 _implicit grant_ flow (or client-side flow).

## Installation

Install package from npm:
```shell
npm install --save petite-auth
```

Use it in your project:
```js
import { authorize, parseHash } from 'petite-auth';
```

## Usage

### Login

Redirect user to your OAuth2 provider authorize endpoint:

```js
import { authorize } from 'petite-auth';

function login() {
  authorize(process.env.AUTHORIZE_URL, {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    response_type: 'token id_token',
    scope: 'openid profile',
  });
}
```

### Handle authentication

When OAuth2 provider redirected to your application callback URL, parse hash and store authentication result:
```js
import { parseHash } from 'petite-auth';

function handleAuthentication() {
  const authResult = parseHash();
  const expiresAt = JSON.stringify((authResult.expires_in * 1000) + Date.now());
  localStorage.setItem('access_token', authResult.access_token);
  localStorage.setItem('id_token', authResult.id_token);
  localStorage.setItem('expires_at', expiresAt);
}
```

### Check if user is authenticated

```js
function isAuthenticated() {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return Date.now() < expiresAt;
}
```

### Logout

```js
function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
}
```

## Framework integration

### Preact

You can use this [preact-cli template](https://github.com/Dramloc/preact-petite-auth-template) to quickly get started with petite-auth.

## Integration with OAuth2 providers

### Auth0

Create your auth0 tenant and client on [https://auth0.com/](https://auth0.com/).

Add your application `redirect_uri` to your client Allowed Callback URLs.

```js
import { authorize } from 'petite-auth';

function login() {
  authorize(`https://${process.env.AUTH0_DOMAIN}/authorize`, {
    client_id: process.env.AUTH0_CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    response_type: 'token id_token',
    scope: 'openid profile',
  });
}
```

If you specified `profile` scope, you can fetch user profile using the userprofile endpoint:

```js
function getProfile() {
  return fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }).then(response => response.json());
}
```

### Google

Create your application and OAuth keys on the [Google developer console](https://console.developers.google.com).

Add your application `redirect_uri` to the authorized callback URIs.

```js
import { authorize } from 'petite-auth';

function login() {
  authorize('https://accounts.google.com/o/oauth2/v2/auth', {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    response_type: 'token id_token',
    scope: 'openid profile',
  });
}
```

If you specified `profile` scope and enabled Google+ API in the [developer console](https://console.developers.google.com/apis/library), you can fetch user's Google+ profile using the access token:

```js
function getProfile() {
  return fetch('https://www.googleapis.com/plus/v1/people/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }).then(response => response.json());
}
```

### Facebook

Create your application in the [Facebook developer console](https://developers.facebook.com/apps). Add Facebook Login to it and add your application `redirect_uri` to the authorized callback URIs.

```js
import { authorize } from 'petite-auth';

function login() {
  authorize('https://www.facebook.com/v2.11/dialog/oauth', {
    client_id: process.env.FACEBOOK_CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    response_type: 'token',
    scope: 'public_profile',
  });
}
```

You can fetch user's public profile using the access token:

```js
function getProfile() {
  return fetch('https://graph.facebook.com/me?fields=id,name,picture', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }).then(response => response.json());
}
```

## License

[MIT](https://oss.ninja/mit/dramloc)
