---
title: IRC with SSL and OTR encryption
date: "2015-12-14T17:00:00.284Z"
description: "IRC with SSL and OTR encryption"
filepath: "/irc-with-ssl-and-otr"
cover: "/images/blog/cover-encryption.jpg"
---

# IRC with SSL and OTR Encryption

Antonio Gioia, 2015

---

![Cover](https://antoniogioia.com/images/blog/cover-encryption.jpg)

---

IRC is a chat protocol active since the early nineties. It belongs to a time when internet services were developed for the sake of communication rather than for profit, intrusive advertising, and social control.

You can chat on IRC with people all around the world, using **strong encryption**, in a matter of minutes.

There are plenty of IRC servers with hundreds of active channels each. All you need is an IRC client to access them. This article shows how to properly configure the open-source IRC client [Irssi](https://irssi.org) to achieve an encrypted connection between your client and the server you connect to, and even more importantly, between you and the people you chat with.

## IRSSI

Irssi is a minimal command-line IRC client available for most Linux distributions. On recent Ubuntu and Debian distributions, it's already compiled with SSL support, but to enable OTR, you need to install a plugin:

    apt-get install irssi irssi-plugin-otr

After installation, start the client by typing:

    irssi

Specify your identity with these commands:

    /set real_name your_nickname
    /set user_name your_nickname
    /set nick your_nickname

The official [documentation of the OTR plugin](https://github.com/cryptodotis/irssi-otr) suggests setting the following option to speed up sessions:

    /set cmd_queue_speed 1msec

To save the configuration, enter:

    /save

You can now connect to a server and chat on IRC. Use the commands `/connect` to connect to a server, `/join` to join a channel (or create a new one if it does not exist), and `/query` to start a private conversation with somebody.

By default, IRC establishes a **not** secure connection, but it's very easy to improve security using SSL and OTR.

## SSL

SSL creates an encrypted connection between your client and the IRC server. Assuming you want to connect to the Indymedia IRC server, you would type:

    /connect irc.indymedia.org

To improve this command with SSL, you need to add the `-ssl` option and the server port:

    /connect -ssl irc.indymedia.org 6697

That's it. To verify the secure connection, you can use the whois command on yourself by typing:

    /whois your_nickname

Press Alt + 1 to go to the main window of Irssi and read the response. Press Alt + Left (or Right) Arrow to jump between open sessions.

If you cannot install an IRC client or your client does not support SSL, a few of the most popular IRC servers allow you to connect directly via web browser using HTTPS (secure HTTP connection with SSL). For example, you can access the Indymedia IRC server via [https://chat.indymedia.org](https://chat.indymedia.org) as well.

Check the homepage of your favorite IRC server for instructions about SSL configuration.

## OTR (Off-the-Record Messaging)

The [OTR protocol](https://otr.cypherpunks.ca) provides **encryption**, **authentication**, **deniability**, and **perfect forward secrecy** for instant messaging chat sessions. It works with IRC, Pidgin, Adium, Jitsi, WeeChat, and [many others](https://en.wikipedia.org/wiki/Off-the-Record_Messaging#Client_support).

In Irssi, to enable the OTR plugin, you must load it from the main window (press Alt + 1). Type:

    /load otr

It's handy to add a notification to the status bar that tells you the state of the OTR session. Type:

    /statusbar window add otr

A session can have 4 different states: `plain text`, `finished`, `OTR`, and `OTR (unverified)`.

Remember to save the configuration with:

    /save

You can automatically load OTR at startup by adding the load command to the Irssi startup file. Type in a separate terminal:

    echo "load otr" >> ~/.irssi/startup

The last step is to create a key to be used by your account on a certain IRC server. Once OTR is loaded, type:

    /otr genkey your_nickname@irc.indymedia.org

Verify the status of the process (might take a while) by typing:

    /otr info

You need to wait until the key is generated to start using OTR.

OTR only works if both you and the person you want to chat with have it installed and enabled. Assuming you are both connected to the same server, open a private chat session and then start OTR by typing:

    /otr init

When you want to finish the OTR session, type:

    /otr finish

### But are you really sure the person you are chatting with is the person you think they are?

You can **authenticate** each other in 3 different ways, remembering that the best way to verify a key fingerprint or share a secret for authentication is to meet face-to-face or communicate through encrypted email (GPG).

#### 1. Use a shared secret that you both know

Use the command:

    /otr auth secret

Example: both you and the other person like the same punk band. You both agree to authenticate using the name of the band as the secret. In a real-world scenario, you would say something like:

**you** > _let's check if it's really you, let's authenticate with the name of our favorite punk band_

**person** > _ok, let's do it ;)_

Assuming the favorite band name is _Wolfbrigade_, now you both type in your own client:

    /otr auth wolfbrigade

If you both type the same band name, you can assume that the person is really your friend.

#### 2. Ask a question to verify if the other person can answer correctly.

    /otr authq [question] secret

For example, I know that the person I want to chat with knows my favorite punk band is Wolfbrigade. I can use this to verify they know that:

    /otr authq [what's the name of my favorite punk band?] wolfbrigade

If the person's answer is correct (in this case, wolfbrigade), you can authenticate that person.

#### 3. Trust the fingerprint

Command:

    /otr trust fingerprint

You can print the key fingerprints on the screen to verify:

    /otr contexts

Or print your own key fingerprint:

    /otr info

For example, you can share the fingerprints via GPG-signed emails. If the person's fingerprint matches the one visualized on your client, then you can assume you can trust that user.

    /otr trust 6DAB45AA 5569FFAC EEFA5122 C5C501FF ECEC4BFC

Of course, the fingerprint above is not real. **You should never copy / paste your fingerprint anywhere**; share it only through secure means of communication.

You can abort an authentication with:

    /otr authabort

To distrust a fingerprint:

    /otr distrust fingerprint

And to remove it from the fingerprints file:

    /otr forget fingerprint

## Links

- [Irssi command line IRC client](https://irssi.org)
- [Irssi OTR plugin](https://github.com/cryptodotis/irssi-otr)
- [OTR protocol](https://otr.cypherpunks.ca)

---

## Notes

Feel free to save or share this article. If you notice a mistake or want to contribute to a revision of the article, please contact me at [info@antoniogioia.com](info@antoniogioia.com).
