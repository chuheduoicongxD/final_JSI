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


window.googleLogin = function(){

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)

        .then((result) => {

            alert("Đăng nhập Google thành công!");

            window.location.href = "main.html";

        })

        .catch((error) => {

            console.error(error);

            alert(error.message);

        });
}