const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp();


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     return res.redirect(303, snapshot.ref.toString());
//   });
// });


exports.createUser = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();
      // access a particular field as you would any JS property
      const phone = newValue.phone;
      const totalSum = 0;
      const creditAmount = 0;
      const orgShare = 0;

      const doc = admin.firestore().doc('userProfile/'+phoneNumber);
      doc.set({totalSum:totalSum,
      creditAmount:creditAmount,
      orgShare:orgShare})

      return admin.database().ref('/phoneNumbers/'+phone).push(
        {
          totalSum:totalSum,
          creditAmount:creditAmount,
          orgShare:orgShare
        });
      // perform desired operations ...
    });


    exports.createTransaction = functions.firestore
        .document('users/{phoneNumbers}/transactions/{transaction}')
        .onCreate((snap, context) => {

        const transactionDetails = snap.data();

        const status = transactionDetails.status;
        const phoneNumber = transactionDetails.phoneNumber;
        const denomination = transactionDetails.denomination;
        const creditAmount = transactionDetails.creditAmount;
        const orgShare = transactionDetails.orgShare;
        const timeStamp = transactionDetails.uploadTime;

        // if(status==="APPROVED"){
        //   const doc = admin.firestore().doc('userProfile/'+phoneNumber);
        //   doc.set({ phoneNumber: phoneNumber,
        //   denomination:denomination,
        //   creditAmount:creditAmount,
        //   orgShare:orgShare})
        // }

        // exports.updateUser = functions.firestore
        //     .document('userProfile/'+phoneNumber)
        //     .onUpdate((change, context) => {
        //       // Get an object representing the current document
        //       const newValue = change.after.data();
        //
        //       // ...or the previous value before this update
        //       const previousValue = change.before.data();
        //
        //
        //
        //     });

          return admin.database().ref('/phoneNumbers/'+phoneNumber)
          .push(
            {
              totalSum:denomination,
              creditAmount:creditAmount,
              orgShare:orgShare,
              timeStamp:timeStamp
            });
          // perform desired operations ...
        });
