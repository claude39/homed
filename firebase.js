import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCU6Gw_vICh2UgJ41i-nq5Pgh2yMmaX_iE",
    authDomain: "homed-78026.firebaseapp.com",
    databaseURL: "https://homed-78026.firebaseio.com",
    projectId: "homed-78026",
    storageBucket: "homed-78026.appspot.com",
    messagingSenderId: "341148040538"
};


let instance = null

class FirebaseService {
    constructor() {
        if (!instance) {
            this.app = firebase.initializeApp(config);
            instance = this;
        }
        return instance
    }
}

const firebaseService = new FirebaseService().app
export default firebaseService;