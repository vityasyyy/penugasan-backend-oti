# Penugasan Back End Omah TI Vityasy

## What is it?
Back end system yang memungkinkan user untuk menambahkan event yang akan mereka buat, dan memungkinkan user lainnya untuk mendaftar ke dalam event tersebut.

System ini mengimplementasikan CRUD, Database MongoDB, dan Authentication menggunakan passport



## Tools that are used

Used <a href="https://www.npmjs.com/package/passport">passport</a> for the password security, <a href="https://www.npmjs.com/package/connect-flash">flash</a> to flash the error or the success message, <a href="https://www.npmjs.com/package/express-session">session</a> to know if the user is still logged in or not, <a href="https://www.npmjs.com/package/ejs">ejs</a> for the templating, and <a href="https://www.npmjs.com/package/joi">joi</a> for the form validation


## How to Install and Run?

You can clone this repo and then install all of the dependencies by typing ⁠`npm install` in your terminal

and then u can type ⁠`node index.js` ⁠in your terminal to run the code and then open localhost:3000 in your browser

Note: Please be sure to install mongoDB on your machine, the installation tutorial can be found in <a href="https://www.mongodb.com/docs/manual/installation/">here</a>

## Register and Login 

### Register using postman
<img width="1529" alt="Screenshot 2024-02-24 at 17 38 55" src="https://github.com/vityasyyy/penugasan-back-end-oti/assets/149230734/b80adf6a-5288-4ab2-88e2-ef94b0c8577d">


### Data after we register
<img width="569" alt="Screenshot 2024-02-24 at 17 39 31" src="https://github.com/vityasyyy/penugasan-back-end-oti/assets/149230734/bbe9a4fd-b94b-4d2c-bf04-b775dd642287">



The password has been hashed thanks to passport, using the .register() function given by passport
```
const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', `Welcome to the page ${registeredUser.username}`);
            res.redirect('/events');
        })
```

This way, even the admin cannot see what's the password of the user is
Ensuring the security of the user data, 


## How to use 

### You can add a place after signing up or logging in
<img width="703" alt="Screenshot 2024-02-24 at 13 32 57" src="https://github.com/vityasyyy/penugasan-back-end-oti/assets/149230734/37c4ad47-35f2-4a8c-bc23-c829f5949544">

### The data then gets added to our database
<img width="526" alt="Screenshot 2024-02-24 at 17 57 39" src="https://github.com/vityasyyy/penugasan-back-end-oti/assets/149230734/0f40d747-8fb3-4c48-b53a-8c5ae3e5cb6e">

### You can register to the event if u are logged in as another user, you must type join, otherwise you cannot register to the event, and after u register to an event, you cannot register another entry
<img width="1319" alt="Screenshot 2024-02-24 at 13 35 23" src="https://github.com/vityasyyy/penugasan-back-end-oti/assets/149230734/7778dc3f-9e67-45b4-a536-d1014c7f3f04">


## Validation, Authentication, and Authorization
In the utilities folder, we have validateEvent and validateRegist, is to ensure the format of the event and registration that are going to be submitted turn out to be right, thank to the help of <a href="https://joi.dev">joi</a> schema that has been set up in the schema.js file

You may also notice the isLoggedIn, isAuthor, etc, in the routes. It's a middleware that has been set up to ensure the user cannot add, delete, or edit the event unless:
    1. They're logged in
    2. They're the author / the registration author


### Even if we try to send a get edit request via postman, we'll be redirected to register
<img width="622" alt="Screenshot 2024-02-24 at 13 34 21" src="https://github.com/vityasyyy/penugasan-back-end-oti/assets/149230734/03318dde-507a-4045-97b3-51f102f51b43">


