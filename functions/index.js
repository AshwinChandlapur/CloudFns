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
      return admin.database().ref('/phoneNumbers/'+phone).push(
        {
          phone: phone,
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

        const phoneNumber = transactionDetails.phoneNumber;
        const denomination = transactionDetails.denomination;
        const creditAmount = transactionDetails.creditAmount;
        const orgShare = transactionDetails.orgShare;

          return admin.database().ref('/phoneNumbers/'+phoneNumber)
          .push(
            {
                      // Only edit data when it is first created.
              // if (change.before.exists()) {
              //   return null;
              // }
              // // Exit when the data is deleted.
              // if (!change.after.exists()) {
              //   return null;
              // }

              // const original = change.after.val();
              // const orgTotalSum = original.totalSum+denomination;
              // const orgCreditAmount = original.orgCreditAmount+creditAmount;
              // const orgOrgShare = original.orgShare+orgShare;

              // totalSum:orgTotalSum,
              // creditAmount:orgCreditAmount,
              // orgShare:orgOrgShare

              phone:phoneNumber,
              totalSum:denomination,
              creditAmount:creditAmount,
              orgShare:orgShare
            });
          // perform desired operations ...
        });
