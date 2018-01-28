# petite-auth

> lock Tiny (520b) JavaScript OAuth2 client

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
  authorize('<oauth2 provider authorize endpoint>', {
    client_id: '<application oauth2 client_id>',
    redirect_uri: '<application callback URL>',
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

## Integration with OAuth2 providers

### Auth0

Create your auth0 tenant and client on [https://auth0.com/](https://auth0.com/).

Add your application `redirect_uri` to your client Allowed Callback URLs.

```js
import { authorize } from 'petite-auth';

function login() {
  authorize('https://<your auth0 domain>/authorize', {
    client_id: '<auth0 client_id>',
    redirect_uri: '<application callback URL>',
    response_type: 'token id_token',
    scope: 'openid profile',
  });
}
```

If you specified `profile` scope, you can fetch user profile using the userprofile endpoint:

```js
function getProfile() {
  return fetch('https://<your auth0 domain>/userinfo', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }).then(response => response.json());
}
```

### Google accounts

Create your application and OAuth keys on the [Google developer console](https://console.developers.google.com).

Add your application `redirect_uri` to the authorized callback URIs.

```js
import { authorize } from 'petite-auth';

function login() {
  authorize('https://accounts.google.com/o/oauth2/v2/auth', {
    client_id: '<your google client_id>',
    redirect_uri: '<application callback URL>',
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

## License

[MIT](https://oss.ninja/mit/dramloc)
