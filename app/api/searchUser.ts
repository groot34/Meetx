// pages/api/searchUser.js
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { user?: User | null; error?: string; }): void; new(): any; }; }; }) {
  try {
    const user = await currentUser();
    console.log("Helloooooooooooooooooooooooooooooooo");
    console.log(user);

    // Uncomment and replace with actual logic if needed
    // const data = await searchInCollection("123", "member", user.toString());
    // console.log(data);

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
}
