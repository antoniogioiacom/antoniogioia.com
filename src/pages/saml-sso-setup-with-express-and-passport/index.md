---
layout: ../../layouts/Post.astro
title: SAML Single Sign On setup with Express and Passport
date: "2020-05-03T17:10:00.284Z"
description: "SAML Single Sign On setup with Express and Passport"
filepath: "/saml-sso-setup-with-express-and-passport"
cover: "/images/blog/cover-saml.jpg"
---

# SAML Single Sign On setup with Express and Passport

Antonio Gioia, 2020

---

![Cover](https://antoniogioia.com/images/blog/cover-saml.jpg)

---

In this short guide about SAML authentication on a [Express](https://expressjs.com/) based web app I'm going to show how to implement a basic setup using [Passport](http://www.passportjs.org/), the authentication middleware for [Node.js](https://nodejs.org/).

## What is SAML protocol

The [Wikipedia page about SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) says: "_Security Assertion Markup Language is an open standard for exchanging authentication and authorization data between parties, in particular, between an identity provider and a service provider_". In other words a user can use a single login (username and password) for two different applications, for example to login into his university **and** in your app with the same credentials.

![SAML exchange](https://antoniogioia.com/images/blog/saml-browser-sso.png)

On your app (Service Provider) you have to create a route that Passport will automatically redirect to the Identity Provider login page (in our example the university login page), a user would then login with his student credentials provided by university (Single Sign On) and then get redirected to your app authenticated and authorized.

In order to make this work both parties (Service Provider and Identity Provider) must coordinate to configure the parts that are going to exchange the XML based security assertions, a successful exchange returns to your backend a JSON object with a few informations, one of which the e-mail address of the student. You have to use that piece of information to check if you already know the user and finally give access to content or, if it's a new user, to complete registration. You are not going to save the password of a user logged in via SAML because the authentication is managed by the Identity Provider.

## Example of SSO with Express and Passport

Our setup include Express as web server and Passport as authentication middleware. For a basic Service Provider configuration you need:

- Your cert keys
- Identity Provider metadata page
- Identity Provider entry point URL

And you, as Service Provider, have to provide to the Identity Provider:

- Your metadata page
- Your callback URL

### Create cert keys

Open a terminal, create a `certs` folder and create your keys with OpenSSL:

    mkdir certs
    openssl req -x509 -newkey rsa:4096 -keyout certs\key.pem -out certs\cert.pem -nodes -days 900

Identity Provider has to give to you the address of their **metadata** page, an endpoint for an XML document with various details needed by SAML to verify assertions. You need to know the **entry point URL** as well, it's the actual page on the Identity Provider website where the user will type his credentials to login. On the Identity Provider metadata page you can find the public key that you need have on your server. Find the tag `X509Certificate`, copy the content in a file named `idp_key.pem` and save it in `certs` folder.

### Create your Service Provider metadata page

As a Service Provider you need to create a metadata page too, Identity Provider will need it to configure their end point. We will use `passport-saml` as SAML authentication provider for Passport, you can install it with `npm` and require it together with `passport` in your Express app.

    const passport = require("passport");
    const saml = require("passport-saml");

    app.route("/metadata").get(function(req, res) {
        res.type("application/xml");
        res.status(200);
        res.send(
        samlStrategy.generateServiceProviderMetadata(
            fs.readFileSync("./certs/cert.pem", "utf8"),
            fs.readFileSync("./certs/cert.pem", "utf8")
        )
        );
    });

Now if you open the route `/metadata` on your app you should see a XML document with your public key exposed.

We can now configure two more routes, the first will automatically redirect a user to the Identity Provider entry point, the second, where we receive the response, will be called by the Identity Provider application soon after the user is authenticated on their server.

    app.route("/login-idp").get(passport.authenticate("samlStrategy"));
    app.route("/login-idp/callback").post(samlCallback(passport));

We have now to define the SAML strategy for both routes.

### Configure SAML strategy and session

We can define a SAML strategy with a new instance of `Strategy` from `passport-saml`:

    const samlStrategy = new saml.Strategy(
        {
            callbackUrl: "/login-idp/callback",
            entryPoint: "https://idp.webapplication.com/idp/profile/SAML2/Redirect/SSO",
            issuer: "mywebapp-saml",
            decryptionPvk: fs.readFileSync("./certs/key.pem", "utf8"),
            privateCert: fs.readFileSync("./certs/key.pem", "utf8")
            // more settings might be needed by the Identity Provider
        },
            function(profile, done) {
            return done(null, profile);
        }
    );

    passport.use("samlStrategy", samlStrategy);

The two arguments are a configuration object and a function that returns a profile object, more details about the configuration on the [passport-saml github page](https://github.com/bergie/passport-saml). The `entryPoint` key is a URL provided by the Identity Provider, the `issuer` key is a string that identifies your request on the Identity Provider side.

Now we need to define the callback function for the POST request arriving from the Identity Provider application at `"/login-idp/callback"`, assuming in the response there is a key `email` that identifies the user:

    const samlCallback = function(passport) {
        return function(req, res, next) {
            passport.authenticate("samlStrategy", function(err, user, info) {

                const email = user.email;

                // check in database if user with that email exists
                // ...

                // if exists show content for registered users:
                req.login(user, function(err) {
                    return res.redirect("/my-contents-page");
                });

                // application logic code
                // ...

                // if doesn't exist redirect to complete registration page
                req.login(user, function(err) {
                    return res.redirect(
                        "/complete-registration"
                    );
                });

            })(req, res, next);

        };
    };

`req.login` (together with [req.logout](http://www.passportjs.org/docs/login/)) is the Passport function that takes care to establish a login session in our Express app. A popular middleware to handle sessions on Express is `express-session`, we can use it in our app together with `cookie-parser` to keep track of user authentication with cookies:

    const session = require('express-session');
    const cookieParser = require('cookie-parser');

    app.use(cookieParser());

    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
        store: [...] // save on database
    }));

Check [express-session documentation](https://github.com/expressjs/session) for more info.

## Links

- [Security Assertion Markup Language on Wikipedia](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)
- [Setup a Single Sign On SAML Test Environment with Docker and NodeJS](https://medium.com/disney-streaming/setup-a-single-sign-on-saml-test-environment-with-docker-and-nodejs-c53fc1a984c9)
- [Passport-SAML package](http://www.passportjs.org/packages/passport-saml/)

---

## Notes

Feel free to save or share this article. If you notice a mistake or want to contribute to a revision of the article contact me at [info@antoniogioia.com](info@antoniogioia.com).
