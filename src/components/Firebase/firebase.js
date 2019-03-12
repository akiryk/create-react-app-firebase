import app from "firebase/app";
import "firebase/auth";
import "firebase/database"; // import the realtime database
import "firebase/firestore"; // import the realtime database

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    // this.db = app.database(); // initialize the realtime database
    this.db = app.firestore(); // initialize the firestore database
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`); // The paths in the ref() method match the location where your entities (users) will be stored in Firebase’s realtime database API

  users = () => this.db.ref("users");

  getStories = () =>
    new Promise((resolve, reject) => {
      this.db
        .collection("stories")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title
          }));
          console.log(data);
          resolve(data);
        });
    });

  getOneStory = storyId => {
    var docRef = this.db.collection("stories").doc(storyId);
    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log(doc);
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  // ** Use Firestore ***
  useFirestore = ({
    name = "Los Angeles",
    state = "Californa",
    country = "USA"
  }) => {
    console.log("This is boston not la");
    this.db
      .collection("stories")
      .doc("chapter0001")
      .set({
        title: "The first "
      });
  };
}

export default Firebase;
