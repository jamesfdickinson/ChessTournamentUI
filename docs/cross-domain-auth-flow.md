# Cross-Domain Authentication Flow

## Overview
This document describes the cross-domain authentication flow between `tournamentjd.com` and `bracketjd.com`.

## The Flow

### Step 1: User Clicks "Login with Bracket JD"
- User is on: `https://tournamentjd.com/Login?redirect=/some-page`
- Clicks the "Login with Bracket JD" button

### Step 2: Redirect to bracketjd.com Auth Callback
- Browser redirects to: `https://bracketjd.com/statichtml/auth-callback.html?returnUrl=https://tournamentjd.com/Login/callback&redirect=/some-page`

### Step 3: Auth Callback Page Extracts Token
The `auth-callback.html` page:
1. Checks if user is logged in by reading `localStorage.getItem('user')`
2. If **NOT logged in**: Redirects to `https://bracketjd.com/Login?returnUrl=...&redirect=...`
3. If **logged in**: Extracts the token from localStorage
4. Redirects back to: `https://tournamentjd.com/Login/callback?token=xxx&redirect=/some-page`

### Step 4: tournamentjd.com Receives Token
- The Login.vue component's `handleTokenCallback()` method:
  1. Extracts the token from URL query parameters
  2. Stores it in local storage
  3. Initializes notifications
  4. Redirects to the final destination (`/some-page`)

## Files Involved

### tournamentjd.com (ChessUI)
- **src/views/Login.vue**: Main login page with "Login with Bracket JD" button
- **src/router.js**: Routes for `/Login` and `/Login/callback`

### bracketjd.com (Should be deployed)
- **public/statichtml/auth-callback.html**: Static HTML page that extracts token and redirects back

## Required Setup on bracketjd.com

The user must be logged in to bracketjd.com with their user data stored in localStorage in this format:

```json
{
  "token": "user-auth-token-here",
  "username": "user@example.com",
  "email": "user@example.com"
  // ... other user fields
}
```

## Security Considerations

1. **HTTPS Only**: All pages must be served over HTTPS
2. **Token Validation**: tournamentjd.com should validate the token with the backend before trusting it
3. **Token Expiry**: Tokens should have expiration times
4. **Origin Checking**: Consider adding origin validation

## Fallback Flow (If User Not Logged In)

If the user is NOT logged in to bracketjd.com:

1. `auth-callback.html` detects no localStorage user data
2. Redirects to: `https://bracketjd.com/Login?returnUrl=...&redirect=...`
3. User logs in to bracketjd.com
4. After successful login, bracketjd.com's Login page should redirect back to `auth-callback.html` with same parameters
5. Flow continues from Step 3 above

## Testing

To test the flow:

1. Log in to `bracketjd.com` first (this stores user data in localStorage)
2. Visit `tournamentjd.com/Login?redirect=/tournaments`
3. Click "Login with Bracket JD"
4. Should be redirected back with token and automatically logged in
5. Should land on `/tournaments`

## Future Enhancements

- Add token validation API call
- Add error handling UI for failed authentications
- Add session management
- Add refresh token support
- Add "Remember Me" functionality
