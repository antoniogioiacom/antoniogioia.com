---
title: Dynamic port forwarding with SSH and SOCKS5
date: "2015-11-01T17:00:00.284Z"
description: "Dynamic port forwarding with SSH and SOCKS5"
filepath: "/dynamic-port-forwarding-with-ssh"
cover: "/images/blog/cover-ssh.jpg"
---

# Dynamic Port Forwarding with SSH and SOCKS5

Antonio Gioia, 2015

---

![Cover](https://antoniogioia.com/images/blog/cover-ssh.jpg)

---

In this article, I have collected all the necessary information and useful tips to create **SSH tunnels** between hosts in order to protect internet traffic with an encrypted layer.

Contents:

- What is SSH
- Why you need to use an SSH tunnel
- Public and private key pair
- VPS setup and firewall
- Dynamic port forwarding in detail
- Configure browser, email, instant messages
- Optional configurations
- Links

## What is SSH

SSH stands for Secure Shell and is described on Wikipedia as "a cryptographic (encrypted) network protocol for initiating text-based shell sessions on remote machines in a secure way."

SSH can do much more than remote shell. For example, you can copy files from local to remote host (local forward), mount a remote file system on your computer (remote forward), or tunnel to the internet from a local **SOCKS proxy** (dynamic forward).

In this article, I will explain how to forward and encrypt network traffic between a local SOCKS5 proxy and a VPS (virtual private server).

- SSH enables port forwarding with an encrypted tunnel
- SOCKS5 (Socket Secure) provides a proxy server to route traffic between client and server using authentication
- VPS is our remote server that connects us to the internet
- Applications need to be configured to make use of the tunnel

## Why You Need an SSH Tunnel

The answer is simple: SSH dynamic port forwarding is the fastest and cheapest way to protect your traffic from undesired eyes.

- An additional layer to protect your identity
- An encrypted channel of internet traffic
- A less risky communication environment for your privacy

A few practical examples:

- You can connect to open networks and no one can read your network packets in clear, assuming you carefully protect your private key
- You can reach content blocked because of your location
- You can circumvent firewalls

## Private and Public Key Pair

The very first thing you need to set up is a private and public key pair. With these keys, you can authenticate the client (your machine) on a remote server.

- Generate both keys, private and public, on your computer
- Protect the private key with a long, possibly complex passphrase. You need to enter it every time you want to create an SSH connection
- Copy the public key to the server you want to log in to
- SSH opens a connection only to clients matching the server public key with the right client private key

This process ensures a higher level of security compared to password-protected accounts vulnerable to brute force attacks.

You need to protect your private key; anyone owning it can authenticate themselves as you on every server that can match the relative public key.

You can create a different key pair for every remote host you intend to connect with SSH. This way, if one private key gets compromised, you have an isolated case.

Let's create SSH keys. On your computer terminal type:

    ssh-keygen -t rsa

The next step is to choose a name for the keys. If you just press enter, it would assign the default name id_rsa and id_rsa.pub, and those would become your default keys. I prefer instead to define a custom name for a pair used only for SSH tunnel: id_rsa_tunnel as the private key and id_rsa_tunnel.pub as the public one.

    Enter file in which to save the key (/home/user/.ssh/id_rsa): id_rsa_tunnel

Enter the passphrase you want to use for your private key twice, and you are done. Your keys are located in your home directory, `/.ssh/` folder: `/home/user/.ssh/id_rsa_tunnel` (private) and `/home/user/.ssh/id_rsa_tunnel.pub` (public) where /user/ is the user you are logged in as.

## VPS Setup and Firewall

Your remote host, a VPS in this case, is going to route your traffic to the internet. Choose the right VPS provider according to your needs. Once you have the remote public IP, it's convenient to change your hosts file. Assuming the public IP of your VPS is 34.86.122.31 (I just invented it), you can add this line to file `/etc/hosts` naming it "tunnel":

    34.86.122.31 tunnel

Save (you need to be root) and quit. From now on, your system will recognize your remote host with the word "tunnel". Open a terminal and type:

    ssh root@tunnel

You should get a remote shell as root after you type in the password. Once logged in, update the server:

    apt-get update

and then:

    apt-get upgrade

and install new packages if any. Install the tools needed:

    apt-get install sudo ufw

`sudo` grants administrative permissions to regular users and `ufw` stands for Uncomplicated Firewall, an easy-to-use front end for `iptables`.

It's time to create a regular user account and say goodbye to root. Go for a generic name like "sshuser" and choose a password that's easy to remember and difficult to brute force. Finally, add the user to sudo. Each line is a different command to enter:

    useradd -s /bin/bash -m -d /home/sshuser -c "sshuser" sshuser
    passwd sshuser
    usermod -aG sudo sshuser

You can now log out from the root session.

It's now time to SSH into the VPS using the user account you just created, but first, you have to associate your public key to the account. There is a tool called `ssh-copy-id` that will help with this. You just have to run:

    ssh-copy-id sshuser@tunnel

and your default public key will be automatically copied securely to the remote host (use option -i to define a custom public key). If you created the key pair following the article, you have to type:

    ssh-copy-id -i ~/.ssh/id_rsa_tunnel.pub sshuser@tunnel

Now you can log in to your VPS with:

    ssh sshuser@tunnel

Enter the passphrase, and you are in. It's time to change the server SSH configuration in `/etc/ssh/sshd_config`. Open the file with sudo and check the following lines; if they're not there, add them:

    Port 5432
    Protocol 2
    UsePrivilegeSeparation yes
    PermitRootLogin no
    StrictModes yes
    PubkeyAuthentication yes
    AuthorizedKeysFile      %h/.ssh/authorized_keys
    PasswordAuthentication no
    X11Forwarding no
    TCPKeepAlive yes
    AllowUsers sshuser
    AllowTcpForwarding yes

The SSH default port is 22, but you can obfuscate the traffic a little by setting it to port 5432, usually adopted by PostgreSQL. With `PermitRootLogin` and `PasswordAuthentication`, we block possible easy attacks, and with `AllowUsers`, you restrict access even more to only your user.

The last step to strengthen your server is to configure the firewall. All you have to do is allow connections only to the port you want to connect to and limit possible brute force attacks.

    sudo ufw allow 5432/tcp

Opens the TCP port 5432 for outside connections.

    sudo ufw limit 5432/tcp

Limits password login attempts. Consider using [SSHguard](http://www.sshguard.net) or [fail2ban](http://www.fail2ban.org/wiki/index.php/Main_Page) for a definitive solution to brute force attacks.

    sudo service ufw restart

Restart the firewall to enable changes. Your remote server is now ready.

## Dynamic Port Forwarding in Detail

You now have everything ready to create an SSH tunnel. Open a terminal on your computer and type:

    ssh -D 8080 -N -p 5432 sshuser@tunnel -vv

If everything works as expected, the tunnel is created after you type the passphrase. That's it.

The command in detail:

- `-D` enables dynamic forwarding
- `8080` is the port of localhost you are going to listen with proxy; it can be any open port on your computer
- `-N` stops SSH from executing commands
- `-p` is the port of the remote host you connect to; you configured the firewall server to keep port 5432 open
- `-vv` is very verbose output on console (`-v` and `-vvv` are less and more verbose). I suggest keeping this option the first few times to have a better idea of what's going on with the SSH connection and remove it later on.

You can fork the process in the background and keep SSH quiet with the options `-f` and `-q`.

    ssh -D 8080 -fNq -p 5432 sshuser@tunnel

The tunnel is now up. All traffic can now be routed through your localhost (or 127.0.0.1) from port 8080 to your VPS and then to the internet.

Note that this will work using your default private key. To specify the private key you created earlier, use the option `-i`:

    ssh -i ~/.ssh/id_rsa_tunnel -D 8080 -fNq -p 5432 sshuser@tunnel

Your SSH connection is now in the background. To close it, you have to terminate the process; use `htop` to find and kill it.

## Configure Browser, Email, Instant Messages

Every application not listening on the SOCKS proxy will leak packets out of the tunnel. It's important that you configure all applications you normally use for internet to make use of the proxy.

### Browser

The tunnel is created, so let's open a browser to access the internet. You can open Chromium from the terminal by typing:

    chromium --temp-profile --proxy-server="socks5://localhost:8080"

Note the flag `--proxy-server` that tells Chromium where the proxy is located. This is enough to browse using the SSH tunnel.

You can add more flags to a Chromium session; there are plenty of [Chromium command-line switches](https://peter.sh/experiments/chromium-command-line-switches) listed here. Why not run incognito mode and disable most functionalities you don't use:

    chromium --temp-profile --incognito --no-referrers --enable-strict-mixed-content-checking --disable-java --disable-plugins --no-experiments --no-pings --disable-preconnect --disable-translate --dns-prefetch-disable --disable-background-mode --proxy-server="socks5://localhost:8080"

Add or remove flags depending on your needs.

To configure Firefox (known as Iceweasel on Linux), click on the menu icon and go to Preferences. Click on the Advanced tab and then on the Network inner tab. Finally, click on the Settings button and click on "Manual proxy configuration," typing "localhost" in the field next to SOCKS Host, port 8080. Click on SOCKS v5 if not selected. Click OK, and your browsing should now be encrypted.

Watch out for **DNS leaks** when using Firefox (or Iceweasel). Open the config window by typing `about:config` where you would type a URL and press enter. Search for `network.proxy.socks_remote_dns` and set it to true. Test results before and after the changes on [dnsleaktest.com](https://dnsleaktest.com).

### Email

The procedure to enable SOCKS proxy on Thunderbird (or Icedove on Linux) is similar to Firefox, as described above. Menu, Preferences, Preferences, Advanced, Network and Disk Space, Settings, and then configure proxy in the same way.

### Instant Messaging

[Pidgin](https://www.pidgin.im) is a universal chat client that supports most common protocols and social network chats. In one application, you can chat over many networks, and in combination with [OTR plugin](https://otr.cypherpunks.ca), you can encrypt your messages over not-secure networks. You can configure Pidgin to use the proxy as well. Just open Preferences, and under the Network label, you can set the Proxy Server as SOCKS5, host as "localhost," and port 8080.

If you are more old school and chat over IRC with the `irssi` client, type within the console (each line is a different command to enter):

    /set proxy_address 127.0.0.1
    /set proxy_port 8080
    /set use_proxy ON

Note that 127.0.0.1 is the address of `localhost`. I wrote an article about [IRC, SSL, and OTR configurations](/irc-with-ssl-and-otr) if you want to know more.

## Optional Configurations

You can now create shortcuts for future SSH sessions. You can also run a script at boot time that opens a tunnel in the background. You can find many examples on the internet about it. I personally prefer to create and delete tunnels as I need them, without any automation.

Remember the command to open a tunnel:

    ssh -i ~/.ssh/id_rsa_tunnel -D 8080 -fNq -p 5432 sshuser@tunnel

To create a shortcut to this command, edit or create a config file on your computer at: `/home/user/.ssh/config` and add the lines:

    Host tunnel
        HostName 34.86.122.31
        Port 5432
        User sshuser
        IdentityFile ~/.ssh/id_rsa_tunnel.pub

Now to open an SSH tunnel, you can type:

    ssh -fNq tunnel

An even better alternative is aliases. Add the following line to the `.bashrc` file in your home directory:

    alias sshtunnel='ssh -i ~/.ssh/id_rsa_tunnel -D 8080 -fNq -p 5432 sshuser@tunnel'

And now you can create a tunnel just by typing:

    sshtunnel

There is one more shortcut available. You can avoid typing the same long passphrase every time you want to log in to your VPS: use `ssh-add`, an SSH agent that takes care of your private key identities. Type:

    ssh-add

Press enter and type the passphrase. If the ssh agent is not started, type:

    eval $(ssh-agent)

and repeat the ssh-add command. Log in to your server with SSH now, and if everything is correct, you should automatically get the remote shell.

Another important add-on useful for tunnels is [autossh](https://www.harding.motd.ca/autossh), a tool to automate SSH reconnections if the tunnel drops due to network connectivity problems.

## Links

- [OpenSSH, project homepage](http://www.openssh.com)
- [SOCKS, protocol standards](https://www.ietf.org/rfc/rfc1928.txt)
- [Ufw, un-complicated firewall](https://wiki.ubuntu.com/UncomplicatedFirewall)
- [SSHguard, log monitor](http://www.sshguard.net)
- [autossh, restarts SSH sessions and tunnels](http://www.harding.motd.ca/autossh)

---

## Notes

Feel free to save or share this article. If you notice a mistake or want to contribute to a revision of the article, please contact me at [info@antoniogioia.com](info@antoniogioia.com).

Cover picture by [Francesco Ungaro](https://www.pexels.com/it-it/@francesco-ungaro)
