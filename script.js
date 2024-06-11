const cookieConsent = document.getElementById('cookie-consent');
const acceptAllButton = document.getElementById('accept-all');
const customizeButton = document.getElementById('customize');
const rejectButton = document.getElementById('reject');
const customizeOptions = document.getElementById('customize-options');
const savePreferencesButton = document.getElementById('save-preferences');
const googleAnalyticsCheckbox = document.getElementById('google-analytics');
const facebookPixelCheckbox = document.getElementById('facebook-pixel');

// Cookie names for tracking acceptance (with descriptions)
const cookies = {
  allAccepted: 'cookiesAccepted=all; expires=30d; path=/', // Cookie for accepting all tracking
  googleAnalytics: 'cookiesAccepted=google-analytics; expires=30d; path=/', // Cookie for accepting Google Analytics
  facebookPixel: 'cookiesAccepted=facebook-pixel; expires=30d; path=/', // Cookie for accepting Facebook Pixel
};

// Function to hide the cookie consent banner
const hideCookieConsent = () => {
  cookieConsent.style.display = 'none';
};

// Function to set a cookie based on selection (with explanation)
const setCookie = (cookieName) => {
  document.cookie = cookieName; // Sets the cookie with the provided name
};

// Function to handle tracking code injection (placeholder, replace with your implementation)
const injectTrackingCode = (code) => {
    if (code === 'google-analytics') {
      // Replace 'YOUR_TRACKING_ID' with your actual Google Analytics Tracking ID
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-3M00LYKYCX`;
      document.head.appendChild(script);
  
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3M00LYKYCX');
    } else if (code === 'facebook-pixel') {
      // Replace 'YOUR_PIXEL_ID' with your actual Facebook Pixel ID
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.facebook.com/tr?id=YOUR_PIXEL_ID&pid=pixel_id&auto_debug=1&flags=0`;
      document.head.appendChild(script);
    } else {
      console.warn('Unsupported tracking code:', code);
    }
  };
  

// Event listener for "Accept All" button (with comment explaining its functionality)
acceptAllButton.addEventListener('click', () => {
  setCookie(cookies.allAccepted); // Sets the "allAccepted" cookie
  hideCookieConsent(); // Hides the banner
  // Inject tracking code for all options (replace with actual implementation)
  injectTrackingCode('google-analytics');
  injectTrackingCode('facebook-pixel');
});

// Event listener for "Customize" button (with comment explaining its functionality)
customizeButton.addEventListener('click', () => {
  customizeOptions.style.display = 'block'; // Shows the customization options
});

// Event listener for "Reject All" button (with comment explaining its functionality)
rejectButton.addEventListener('click', () => {
  setCookie(cookies.allAccepted); // Sets an empty cookie to indicate rejection
  hideCookieConsent(); // Hides the banner
  // Don't inject any tracking code
});

// Event listener for "Save Preferences" button (with comment explaining its functionality)
savePreferencesButton.addEventListener('click', () => {
  let selectedTracking = [];
  if (googleAnalyticsCheckbox.checked) {
    selectedTracking.push('google-analytics');
    setCookie(cookies.googleAnalytics);
  }
  if (facebookPixelCheckbox.checked) {
    selectedTracking.push('facebook-pixel');
    setCookie(cookies.facebookPixel);
  }
  // Hide the customize options
  customizeOptions.style.display = 'none';
  hideCookieConsent();
  // Inject tracking code based on selected options (replace with actual implementation)
  selectedTracking.forEach(code => injectTrackingCode(code));
});
