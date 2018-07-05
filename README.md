# Full-Stack Face Recognition API

Hello there, this project was made with React.js on the front-end and Node.js + Express.js on the back-end

Between other frameworks including: Knex.js, Clarifai Face Model, Brcypt and Cors

An thanks to the creator of the [particles.js](https://vincentgarreau.com/particles.js/) for the incredible component.

This is the Back-end part, if you are interested on the front-end you should go to the [repositorie](https://github.com/Vitorr32/face-recognition-full-stack-app)

## Content

Now, what is this about?

This is an project that concludes the Udemy course "The Complete Web Developer in 2018: Zero to Mastery" and consist of a
web application that allows the user to submit url from images and get back bounding boxes that encompass the faces in the
picture thanks to the API Clarifai Face Model.

For the user to access that tough, he needs to register in the site. To register he needs to input his name, email and 
password, that will be stored in a PostgreSQL database, so that later he can sign in again. And one unique email will be
needed for each account, and also, the number of photos that he submitted will be remembered too.

Finally, the controllers make sure that the password is properly hashed before inputting it at the database, and make a 
properly validation check of the content to be stored.

##Host

Thanks to Heroku Cloud Application I could host the full application, on their servers, and it is running right now on the
link of the project up there!

##Objective

As well as a learning experience, I hope this application can convince you of my skills using React.js and Node.js.
I am up for freelancer work, you can contact me if you are interested.
