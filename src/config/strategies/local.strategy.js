const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    (username, password, done) =>{
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, (err,db) => {
            var collection = db.collection('users');
            collection.findOne(
                {
                    username: username
                }, 
        
                (err, results) => {
                    if (results.password === password) {
                        var user = results;
                        done(null, user);                        
                    } else {
                        done(null, false, {message: 'Error with Password'});
                    }
                }
            );
        });
    }));
};