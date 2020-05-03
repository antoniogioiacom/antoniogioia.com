---
title: How to configure your VPS with security in mind
date: "2020-02-10T17:00:00.284Z"
description: "How to configure your VPS with security in mind"
filepath: "/how-to-configure-your-vps-with-security"
cover: "/images/blog/cover-vps.jpg"
---

# How to configure your VPS with security in mind

Antonio Gioia, 2020

---

![Cover](https://antoniogioia.com/images/blog/cover-vps.jpg)

---

Nowadays it's quite cheap to rent a Virtual Private Server and run your own website, web application or programs. When you _spin up_ a fresh server you get a basic OS installation with no security setup other than a root account with plain text login. It is necessary, once logged in, to configure the system to prevent most common attack vectors that can be easilly targeted as soon as the VPS is up and running and IP is public. This guide is for VPS running **Debian/Ubuntu** OS.

Contents:

-   User creation
-   SSH configuration with private and public keys
-   Basic firewall configuration
-   Automatic updates

## User creation

When you get a new VPS your provider usually gives two things: an IP address and a root account with password. The first step to take is to login, create a new regular user, create and associate SSH keys to the new user and then disable root password login. Enter your VPS with SSH login and `root` account, assuming the IP address of the VPS is 123.123.123.123:

    ssh root@123.123.123.123

Add a user, we will call it `dev`:

    adduser dev

Choose a long and complex password and then add the new user to `sudo` group with:

    usermod -aG sudo dev

You can now logout with root account and login with `dev` one.

## SSH configuration with private and public keys

A **_password protected login is not safe_**, brute force attacks are to be expected on a public server. You can setup up login with SSH keys instead and protect access to your server from unwanted guests. Once the private and public SSH keys are created you keep the private one on your computer and the public one on the server, the protocol will make sure that the access is granted only to the user that can verify the corresponding private key. If you want to know more about SSH I suggest to read my [article about SSH port forwarding](/dynamic-port-forwarding-with-ssh).

Open a terminal on your computer, move to the `.ssh` folder (`/home/YOURUSER/.ssh` on Linux, (`/Users/YOURUSER/.ssh` on Mac, in `Home` folder on Windows):

    cd /Users/YOURUSER/.ssh

Create the keys with:

    ssh-keygen -t rsa -b 4096

You'll get a message like this:

    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/YOURUSER/.ssh/id_rsa):

Give the name `dev` to the key and choose a long and complex _passphrase_ that you need to remember. **_Never reuse the same pair of keys_**, create as many keys as the servers or services you need. For example creare a set of keys for Github and another set for your VPS. Never share the passphrase or even your SSH private key online anywhere, never send it via email.

Now that you have the keys you need to upload the public one on your VPS, with the following command you'll copy it directly into the `authorized_keys` file:

    cat dev.pub | ssh dev@123.123.123.123 “mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys”

Login to your VPS to enable SSH:

    ssh dev@123.123.123.123

Open `sshd_config` file:

    sudo nano /etc/ssh/sshd_config

Uncomment removing the `#` character the line:

    AuthorizedKeysFile %h/.ssh/authorized_keys

Change the following line to `no`:

    PasswordAuthentication no

Save and close the config file. Restart SSH and finally logout from server.

    sudo service ssh restart

You are now ready to login to your VPS with SSH.
Open a terminal and type the command:

    ssh -i /Users/YOURUSER/.ssh/dev dev@123.123.123.123

If everything goes as expected and you successfully login then you can finally disable root account login.

Open once again ssh config file:

    sudo nano /etc/ssh/sshd_config

Change the line `PermitRootLogin` to `no`. Save the file and restart SSH:

    sudo service ssh restart

Last step is to disable root password once for all with this command:

    sudo passwd -dl root

Complete the firewall configuration to further protect your server.

## Basic firewall configuration

On linux Debian / Ubuntu you can configure easilly a firewall with a package called `ufw`, literally _uncomplicated_ firewall. To install it first update OS packages references with:

    sudo apt-get update

Then install ufw:

    sudo apt-get install ufw

Assuming you have a webserver running, you should keep open only the standard ports `22` (ssh) and `80` (http), if you run it with https then you need to keep open port `443` (https) as well:

    sudo ufw allow 22
    sudo ufw allow 80
    sudo ufw allow 443

Enable the change with the command:

    sudo ufw enable

Final step is to install fail2ban, a package that mitigate brute force attacks on standard ports:

    sudo apt-get install fail2ban

That's all for a basic configuration.

## Automatic updates

Your VPS **_OS must be updated_**, an outdated software might be expoited if there are known vulnerabilities. Luckly on Linux it's easy to automate updates, you only need to install the package `unattended-upgrades`:

    sudo apt-get install unattended-upgrades

Run it with:

    sudo dpkg-reconfigure unattended-upgrades

Choose `Yes` and `Ok` to end configuration.

## Links

-   [How To Set Up a Firewall with UFW on Ubuntu / Debian](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-18-04)
-   [fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page)

---

## Notes

Feel free to save or share this article. If you notice a mistake or want to contribute to a revision of the article contact me at [info@antoniogioia.com](info@antoniogioia.com).

Cover picture by [panumas nikhomkhai](https://www.pexels.com/it-it/@cookiecutter)
