# Viral Waitlist

### You can access the live version of this project [here](https://viral-waitlist.surge.sh/).  

This is a simple viral waitlist app. Anybody can create a product. And they can share the URL to the product so that people can join the waitlist. Any person after joining waitlist will get an email. The person who joined waitlist can also refer other people using the referral link. Whenever someone uses referral link to signup, both persons will receive email. Anybody can view the leaderboard and the other details of the product. 

The app uses React for the frontend.  
The app uses Express, MongoDB for the backend.  
The app uses LocalStorage of the browser.  
The app uses Heroku.com for hosting the Express server.  
The app uses Surge.sh for hosting the React client.  
The app uses MLab.com for hosting the MongoDB database.  
The app uses Mailgun for sending emails.

---
To use this application locally, follow the next steps.  

```
echo "
REACT_APP_SERVER_URL=http://localhost:5000
" > react-client/.env  

echo "
MONGO_URI=mongodb://localhost:27017/viralwaitlist
PORT=5000
MAILGUN_DOMAIN_NAME=<MAILGUN_DOMAIN_NAME>
MAILGUN_API_KEY=<MAILGUN_API_KEY>
MAILGUN_FROM=\"Viral Waitlist <viral@waitlist.mailgun.org>\"
CLIENT_URL=http://localhost:3000
" > express-server/.env

cd express-server
yarn install
yarn dev

cd ../react-client
yarn install
yarn start
```
---

### You can access the live version of this project [here](https://viral-waitlist.surge.sh/).


#### Working Demo Pics
![1](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%203.56.38%20PM.png)
![2](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%203.57.05%20PM.png)
![3](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%203.58.02%20PM.png)
![4](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%203.58.24%20PM.png)
![5](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%203.58.44%20PM.png)
![6](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%204.03.22%20PM.png)
![7](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%204.03.43%20PM.png)
![8](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%204.04.05%20PM.png)
![9](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%204.04.41%20PM.png)
![10](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%204.05.55%20PM.png)
![11](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%204.06.21%20PM.png)
![12](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%204.06.52%20PM.png)
![13](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%204.07.41%20PM.png)
![14](https://raw.githubusercontent.com/s-xync/viral-waitlist/master/pics/Screen%20Shot%202019-11-24%20at%204.08.19%20PM.png)


### You can access the live version of this project [here](https://viral-waitlist.surge.sh/).

#### Thanks!!
