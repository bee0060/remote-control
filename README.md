# remote-control
A plugin to let one or more client side(s) control the other client side by web-socket.


### Start and play it locally:
1. Install all dependencies
```
npm install
```

2. startup server side
```
npm start
```

2.5. [Optional] Find IP of your server. (IPOfYourServer)
```
Win: You can find by ipconfig in cmd, e.g., mine is 10.22.17.XX
Mac: I don't know. :)
```

3. Open controller side on your PC or mobile, if open in mobile, please use IP of your server(usually your own machine) and click the buttons to try
```html
url: http://localhost:6100/controller
or 
url: http://IPOfYourServer:6100/controller
```

4. Open controlled side to see the commands sent by controller side.
```html
url: http://localhost:6100/controlled
or 
url: http://IPOfYourServer:6100/controlled
```

Enjoy!

------

### TODO List

1. Use grid to style control side buttons position