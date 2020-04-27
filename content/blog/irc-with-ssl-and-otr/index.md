---
title: IRC with SSL and OTR encryption
date: "2015-12-14T17:00:00.284Z"
description: "IRC with SSL and OTR encryption"
---

IRC with SSL and OTR encryption
===============================

Antonio Gioia, 2015

***

![Cover](/images/blog/cover-encryption.jpg)

***

IRC is a chat protocol active since early nineties, it belongs to a time when internet services were developed for the sake of communication rather than for profit, intrusive advertising and social control.

You can chat on IRC with people all around the world, using **strong encryption**, in a matter of minutes.

There are plenty of IRC servers with hundreds active channels each, all you need is a IRC client to access them. This article shows how to properly configure the open source IRC client [Irssi](https://irssi.org) to achieve an encrypted connection between your client and the server you connect and even more between you and the people you chat with.

IRSSI
-----

Irssi is a minimal command line IRC client available for most Linux distributions, on recent Ubuntu and Debian is already compiled with SSL support but to enable OTR you need to install a plugin:

    apt-get install irssi irssi-plugin-otr

After installation start the client typing:

    irssi

Specify your identity with those commands:

    /set real_name your_nickname
    /set user_name your_nickname
    /set nick your_nickname

Official [documentation of the OTR plugin](https://github.com/cryptodotis/irssi-otr) suggests to set the following option to speed up sessions:

    /set cmd_queue_speed 1msec

To save configuration enter:

    /save

You can now connect to a server and chat on IRC. Use the commands `/connect` to connect to a server, `/join` to join a channel (or create a new one if does not exist) and `/query` to start a private conversation with somebody.

By default IRC establish a **not** secure connection but is very easy to improve security using SSL and OTR.

SSL
---

SSL creates an encrypted connection between your client and the IRC server. Assuming you want to connect to Indymedia IRC server, you would type:

    /connect irc.indymedia.org

Improve this command with SSL: you need to add the `-ssl` option and the server port:

    /connect -ssl irc.indymedia.org 6697

That’s it. To verify the secure connection you can whois your self typing:

    /whois your_nickname

Press Alt + 1 to go to the main window of Irssi and read the response, press Alt + Left (or Right) Arrow to jump between open sessions.

If you cannot install an IRC client or your client does not support SSL, a few most popular IRC servers allow you to connect directly via web browser using HTTPS (secure HTTP connection with SSL). For example you can access Indymedia IRC server via [https://chat.indymedia.org](https://chat.indymedia.org) as well.

Check the homepage of your favorite IRC server for instructions about SSL configuration.

OTR (Off-the-Record Messaging)
------------------------------

[OTR protocol](https://otr.cypherpunks.ca) provides **encryption**, **authentication**, **deniability** and **perfect forward secrecy** for instant messaging chat sessions. It works with IRC, Pidgin, Adium, Jitsi, WeeChat and [many others](https://en.wikipedia.org/wiki/Off-the-Record_Messaging#Client_support).

In Irssi to enable OTR plugin you must load it from main window (press Alt + 1), type:

    /load otr

It’s handy to add in the status bar a notification that tells you the state of the OTR session, type:

    /statusbar window add otr

A session can have 4 different states: `plain text`, `finished`, `OTR`, `OTR (unverified)`.

Remember to save the configuration with:

    /save

You can automatically load OTR at startup adding the load command in Irssi startup file, type in a separate terminal:

    echo “load otr” >> ~/.irssi/startup

Last step is to create a key to be used by your account on a certain IRC server. Once OTR is loaded type:

    /otr genkey your_nickname@irc.indymedia.org

Verify the status of the process (might take a while) typing:

    /otr info

You need to wait until the key is generated to start using OTR.

OTR only works if both you and the person you want to chat have it installed and enabled. Assuming you are both connected to same server, open a private chat session and then start OTR typing:

    /otr init

Once you want to finish th OTR session type:

    /otr finish

### But are you really sure the person you are chatting with is the person you think he/she is?

You can **authenticate** each other in 3 different ways, remembering that the best way to verify a key fingerprint or share a secret for authentication is to meet face to face or through encrypted email (GPG).

#### 1. Use a shared secret that you both know

Use the command:

    /otr auth secret

Example: both you and the other person like the same punk band. You both agree to authenticate using the name of the band as secret. In real world scenario you would say something like:

**you** > *let’s check if it’s really you, let’s authenticate with the name of our favorite punk band*

**person** > *ok, let’s do it ;)*

Assuming the favorite band name is *Wolfbrigade*, now you both type in your own client:

    /otr auth wolfbrigade

If you both type the same band name, you can assume that person is really your friend.

#### 2. Ask a question to verify if the other person can answer correctly.

    /otr authq [question] secret

For example, I know that the person I want to chat knows my favorite punk band is Wolfbrigade. I can use this to verify he/shw knows that:

    /otr authq [what’s the name of my favorite punk band?] wolfbrigade

If the person’s answer is correct (in this case wolfbrigade) you can authenticate that person.

#### 3. Trust the fingerprint

Command:

    /otr trust fingerprint

You can print on screen the key fingerprints to verify:

    /otr contexts

Or your own key fingerprint:

    /otr info

For example you can share the fingerprints via GPG-signed emails, if the person fingerprint matches with the one visualized on your client then you can assume you can trust that user.

    /otr trust 6DAB45AA 5569FFAC EEFA5122 C5C501FF ECEC4BFC

Of course the fingerprint above is not real. **You should never copy / paste your fingerprint anywhere**, share it only with secure means of communications.

You can abort an authentication with:

    /otr authabort

Distrust a fingerprint:

    /otr distrust fingerprint

And remove it from fingerprints file:

    /otr forget fingerprint

Links
-----

* [Irssi command line IRC client](https://irssi.org)
* [Irssi OTR plugin](https://github.com/cryptodotis/irssi-otr)
* [OTR protocol](https://otr.cypherpunks.ca)

***

Notes
-----

Feel free to save or share this article. If you notice a mistake or want to contribute to a revision of the article contact me at [info@antoniogioia.com](info@antoniogioia.com).