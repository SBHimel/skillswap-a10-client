import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder", 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
    },
  },

  user: {
  additionalFields: {
    role: {
      type: "string",
      required: false,
      defaultValue: "client",
      input: true, 
    },
    // 🟢 ঠিক এখানে এই কমা ও নতুন ফিল্ডটি বসাও
    isBlocked: {
      type: "boolean",
      required: false,
      defaultValue: false,
    }
  },
},
  
session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 60,
    },
    user: {
      fields: ["id", "name", "email", "image", "role", "isBlocked"],
    },
  },
  // 🟢 এই মাঝখানের জায়গায় হুকের কোডটুকু পেস্ট করে দাও
  hooks: {
    before: async (context) => {
      if (context.path.includes("sign-in")) {
        const body = context.requestBody;
        if (!body || !body.email) return;

        const dbUser = await db.collection("user").findOne({ email: body.email });

        if (dbUser && dbUser.isBlocked === true) {
          throw new Error("Your account has been blocked by the administrator.");
        }
      }
    },
  },
  plugins: [jwt()],
});