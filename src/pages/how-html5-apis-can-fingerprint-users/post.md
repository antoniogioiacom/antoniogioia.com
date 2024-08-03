---
title: How HTML5 APIs can fingerprint users
date: "2015-11-12T17:00:00.284Z"
description: "How HTML5 APIs can fingerprint users"
filepath: "/how-html5-apis-can-fingerprint-users"
cover: "/images/blog/cover-html.jpg"
---

# How HTML5 APIs Can Fingerprint Users

Antonio Gioia, 2015

---

![Cover](https://antoniogioia.com/images/blog/cover-html.jpg)

---

_Warning: Some configuration procedures might be different on current browser versions_

If you think that IP address, cookies, and HTTP headers are the only factors used to **uniquely identify and track users** around the web... you are terribly wrong!

New, modern fingerprinting techniques rely on multiple factors:

- IP address
- Cookies
- Language settings
- Timezone
- HTTP headers (User agent, referer, etc.)
- HTML5 APIs (WebRTC, Battery API, etc.)
- HTML5 and CSS3 features detection
- CSS media queries
- WebGL
- Browser plugins (Flash, Silverlight, Java, etc.)
- Browser add-ons
- Browser options (Do-Not-Track etc.)
- Browser storage
- System fonts
- TLS/SSL Session IDs
- Hardware detection (Camera, Mic, Touch screen, etc.)
- Screen (resolution, color depth, pixel density, etc.)
- Audio and video codecs
- Accessibility features

And the list goes on. Recent W3C additions to HTML standards allow developers to communicate with the user's device for enhanced options in websites, apps, or games. It is not surprising that many APIs are exploited to actually calculate a more precise **user fingerprint**.

## What is a fingerprint?

Imagine you walk into a shop and at the entrance, an advanced camera scans you and saves information like: body type, height, skin color, walk style, tone of voice, etc. All this data is then serialized and passed through a hashing function to calculate your **unique** fingerprint. The next time you visit the shop or a shop of the same franchise, even if you have a different dressing style, with a quick analysis, your fingerprint is still associable to the one from your previous visit.

The same happens when visiting a webpage with a browser (_without user explicit cooperation_).

It doesn't matter if you are not logged in or you disable cookies. It is still possible to associate a user with a token. It is not a 100% accurate technique (yet) but continues to evolve.

[Electronic Frontier Foundation](https://www.eff.org) researched browser fingerprinting in the publication ["How unique is your Web Browser?" (PDF)](https://panopticlick.eff.org/static/browser-uniqueness.pdf). An accurate description of device fingerprinting is on [WebKit Wiki](https://trac.webkit.org/wiki/Fingerprinting) and in the ["Device fingerprint" article on Wikipedia](https://en.wikipedia.org/wiki/Device_fingerprint).

## Client-side Javascript

To have a better idea of how fingerprinting currently works, you can inspect a javascript library used by web developers: [Fingerprintjs2](https://github.com/Valve/fingerprintjs2).

To effectively block scripts, disable javascript globally or use [uBlock Origin](https://github.com/gorhill/uBlock) browser extensions. Other factors can still reveal a lot about you, and there might exist other fingerprinting methods not yet disclosed.

## HTML5 APIs

Thanks to new HTML5 standards, developers can access sensitive user information or device hardware in some cases without the need to ask for permissions. The following APIs are currently exploited _in the wild_. The most common way to block these features is to disable javascript or use a specific add-on.

### Canvas

This is a nasty, stealth, and (with javascript enabled) almost unstoppable technique, utilized actively since 2012, occasionally embedded in widely used scripts (remember [AddThis "research"](https://venturebeat.com/2014/07/30/canvas-fingerprinting-is-tracking-you-and-you-dont-even-know-what-it-is) to find alternatives to cookies).

When the browser visits a webpage with a canvas fingerprinting script, it is instructed to draw a hidden graphic that gets converted to a token. The uniqueness of the token depends on factors like browser, operating system, and installed graphics hardware.

To avoid Canvas fingerprinting, you can either:

- Disable javascript globally
- Use [uBlock Origin](https://github.com/gorhill/uBlock) (available for any browser) or CanvasFingerprintBlock (Chrome only) extensions
- Use Tor Browser

### Battery

According to research, the Battery Status API is able to get level, charging time, and discharging time of device battery. All this data combined is nearly unique for each device and battery status, potentially allowing the tracking of activities on the web.

A paper titled ["The leaking battery – A privacy analysis of the HTML5 Battery Status API" (PDF)](https://eprint.iacr.org/2015/616.pdf) targets Firefox users on Linux systems. As a result of the impressive study: "We propose minor modifications to Battery Status API and its implementation in the Firefox browser to address the privacy issues presented in the study. Our bug report for Firefox was accepted and a fix is deployed."

On Chrome, you can install the add-on Battery Info Blocker to prevent websites from accessing your battery info.

### WebRTC

**You should disable WebRTC if you don't use it**. WebRTC leaks your local IP and [might leak your IP on VPN](https://torrentfreak.com/huge-security-flaw-leaks-vpn-users-real-ip-addresses-150130) (on Windows) in addition to being another factor used to fingerprint your system. [Test WebRTC leaks on your browser](https://browserleaks.com/webrtc).

To avoid WebRTC leaks, you should use Firefox and disable WebRTC by opening `about:config`, finding the value `media.peerconnection.enabled`, and setting it to `false`.

On Chrome, you can install the add-on [uBlock Origin](https://github.com/gorhill/uBlock) and check the extension options.

### Resource Timing

Developers can use this API to collect complete timing information related to resources on a document. Concerns involving privacy are expressed in the [Resource Timing Working Draft](https://www.w3.org/TR/resource-timing): "Statistical fingerprinting is a privacy concern where a malicious web site may determine whether a user has visited a third-party web site by measuring the timing of cache hits and misses of resources in the third-party web site."

If you use Firefox, you can disable this API by opening `about:config` and setting to `false` the options `dom.enable_resource_timing`, `dom.enable_user_timing`, and `dom.performance.enable_user_timing_logging`.

On Chrome, the only way to disable it might be to disable javascript.

### Geolocation

If geolocation is enabled, it can reveal your physical location, compromising your privacy. Modern browsers and apps always ask permission to get geolocation data.

To disable this feature permanently on Firefox, you should open `about:config` in the address bar, look for `geo.enabled` value, and set it to `false`.

On Chrome, go to Settings, then Show advanced settings, find Privacy block and click on Content settings. In this window, look for Location and select the option "Do not allow any site to track your physical location."

### Hardware fingerprinting

A paper titled ["Hardware Fingerprinting Using HTML5" (PDF)](http://arxiv.org/pdf/1503.01408v3) shows new potential techniques that rely on the ability to communicate with device hardware to get a specific hardware fingerprint in addition to a software-based one (browser, OS, etc.).

The paper shows that hardware like GPU (modern browsers use hardware acceleration), camera, speakers and mic, motion sensors, GPS, and battery can all be accessed with HTML5 (not always with user permission), and in particular, GPU can effectively be used to fingerprint users.

## Links

- [Device fingerprinting](https://en.wikipedia.org/wiki/Device_fingerprint)
- [What is fingerprinting?](https://trac.webkit.org/wiki/Fingerprinting)
- [EFF: How Unique Is Your Web Browser? (PDF)](https://panopticlick.eff.org/static/browser-uniqueness.pdf)
- [EFF: Panopticlick tests your browser to see how unique it is](https://panopticlick.eff.org)
- [The Web never forgets: Persistent tracking mechanisms in the wild](https://securehomes.esat.kuleuven.be/~gacar/persistent)
- [A privacy analysis of the HTML5 Battery Status API (PDF)](https://eprint.iacr.org/2015/616.pdf)
- [Hardware Fingerprinting Using HTML5 (PDF)](http://arxiv.org/abs/1503.01408)
- [Browser leaks and web browser fingerprinting](http://browserleaks.com)
- [Modern & flexible browser fingerprinting library](https://github.com/Valve/fingerprintjs2)

---

## Notes

Feel free to save or share this article. If you notice a mistake or want to contribute to a revision of the article, please contact me at [info@antoniogioia.com](info@antoniogioia.com).
