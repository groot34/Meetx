'use server'
import { currentUser } from "@clerk/nextjs";
import { searchInCollection } from "./search";
import { getDatabase, ref, set } from "firebase/database";

export const handleSearch = async (): Promise<boolean> => {
  try {
    const user = await currentUser();
    console.log("Helloooooooooooooooooooooooooooooooo");

    const val = user?.emailAddresses[0]?.emailAddress;

    if (val) {
      const resu = await searchInCollection("users", "userId", val);
      console.log("Database me dhunda hua data", resu);
      console.log("Check if true ya false->", resu[0].data.userId === val);
      return (resu[0].data.userId === val);
    } else {
      console.error("Email address is undefined");
      return false;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
};


import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const db = getFirestore();

export const addData = async (userJoinLink: string): Promise<void> => {
  try {
    const user = await currentUser();
    console.log("Helloooooooooooooooooooooooooooooooo");

    const val = user?.emailAddresses[0]?.emailAddress;

    if (val) {
      // Create a query to search for the user in the "users" collection by their email
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userId", "==", val));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Iterate over the results and update each document
        querySnapshot.forEach(async (docSnapshot) => {
          const userDocRef = doc(db, "users", docSnapshot.id);
          
          // Update the document by adding the invitation link
          await updateDoc(userDocRef, {
            userJoinLink: userJoinLink,
          });
          
          console.log("Invitation link added and data updated in the database for document ID:", docSnapshot.id);
        });
      } else {
        console.error("No data found for the provided userId");
      }
    } else {
      console.error("Email address is undefined");
    }
  } catch (error) {
    console.error("Error adding data:", error);
  }
};





