var isAuth;
function fbaseAuth() {
    firebase.initializeApp({
        apiKey: 'AIzaSyBgDjQ2FPrQWgtc05zSQ4OAaZ5qVQAIcps',
        authDomain: 'kriszti-8865b.firebaseapp.com',
        projectId: 'kriszti-8865b'
    });
    isAuth=localStorage.getItem("logged")
    firebase.auth().onAuthStateChanged(function(user) {
        window.user = user; // user is undefined if no user signed in
        if(user) {
            localStorage.setItem("logged",1)
        } else {
            localStorage.removeItem("logged")
        }
    });

    $("#signout").click(function(){
        if(user) {
            firebase.auth().signOut().then(function(){
                location=location;
            })
        }
    })
}
