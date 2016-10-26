## Installation
1) Install dependencies with

```bash
npm install
```
If this doesn't work you may need to globally install npm-install-missing and run it. This is because Phantom.JS sometimes disrupts the module installation process.
```bash
npm install -g npm-install-missing
```
Once installed you can run it with
```bash
npm-install-missing
```

2) To begin gulp development process or view app locally run
```bash
gulp
```

3) To begin e2e protractor testing run (You will need to make sure Java is installed on your machine)
```bash
gulp test
```

4) Start webserver without watch task
```bash
gulp server
```

