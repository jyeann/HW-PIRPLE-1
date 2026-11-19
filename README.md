# HW-PIRPLE-1

The Assignment:

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice. 

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 

## Running it

The HTTPS server needs a private key that is deliberately not in this repository. Create a local, self-signed pair before starting:

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout https/key.pem -out https/cert.pem
```

`https/key.pem` is git-ignored. Never commit a private key.
