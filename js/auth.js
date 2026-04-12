// auth.js

console.log("auth.js loaded ✅");

window.login = function(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password);
};

window.register = function(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
};

window.logout = function(){
    return firebase.auth().signOut();
};

window.checkAuth = function(callback){
    firebase.auth().onAuthStateChanged(function(user){
        callback(user);
    });
};