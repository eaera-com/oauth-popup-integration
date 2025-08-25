# EAERA OAuth Integration Guide

## Quick Start

### Your Responsibilities

- Provide the website’s hostname to EAERA
  EX: For the domain https://example.com => example.com
- Implement a "Login with EAERA" button on your website.
- Create and manage popup windows for EAERA authorization.
- Securely pass authorization codes to your backend team.

## Running the Example Project Locally

To test the OAuth integration example, you must use the domain `localhost` (not including a port, e.g. `https://localhost/login.html`). The site must be served over HTTPS.

If you use the Live Server extension in VS Code, follow these steps:

1. **Configure Live Server for HTTPS and localhost domain:**

   - Open the Live Server settings in VS Code.
   - Set the protocol to `https`.
   - Set the host to `localhost`.
   - Make sure the port is not included in the URL (access via `https://localhost/login.html`).

2. **Start Live Server:**
   - Right-click on `login.html` and select "Open with Live Server".
   - Your site should now be accessible at `https://localhost/login.html`.

> **Note:** OAuth authentication requires HTTPS and the domain to be exactly `localhost`. Using other domains or including a port may

## Implementation Steps

### 1. Create a "Login with EAERA" Button

Add a button to your website to initiate the EAERA authentication process.

### 2. Open EAERA Authentication Popup

Use the following JavaScript function to open a popup window for EAERA authentication:

```javascript
function openEaeraAuthPopup() {
  const url = "https://{EAERA domain}/user-auth/login?isEmbedded&Oauth&parent_origin=" + window.location.hostname';
  window.open(url, "oauthPopup", "width=425,height=700");
}
```

### 3. Receive Access Token and User Information

Set up a message listener to receive the `access_token` and user information from the OAuth popup:

```javascript
function initEaeraMessageListener() {
  window.addEventListener("message", (event) => {
    // Check origin for security
    if (event.origin !== "https://{EAERA domain}") return;

    const { user, access_token } = event.data?.data || {};

    // Process the user and access_token data
  });
}
```

#### Expected Data Format

The popup will send a message with the following structure:

```json
{
  "data": {
    "user": {
      // User information object
    },
    "access_token": "<string>"
  }
}
```

## Visual Flow Diagram

### User Journey Through OAuth Flow (postMessage)

1. **User Visits Your Site**

   - User sees the "Login with EAERA" button on `login.html`.

2. **User Clicks Button**

   - A popup window (`popup.html`) opens for EAERA authentication.
   - User enters their email and password.

3. **User Authorizes**

   - The EAERA popup sends a message containing `{ user, access_token }` to the parent window (`login.html`).

4. **Send Data to Backend**

   - The parent window receives the message and forwards the `access_token` to your backend for verification.
   - Your backend verifies the `access_token` with EAERA and issues a session or JWT for your site.

5. **Login Success**
   - User is redirected to the dashboard or home page (`dashboard.html`) upon successful login.
