import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '../../../lib/mongodb'
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
	EmailProvider({
	  server: process.env.EMAIL_SERVER,
	  from: process.env.EMAIL_FROM
	}),

	GoogleProvider({
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	      }),

	GitHubProvider({
		clientId: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET
	      }),
	TwitterProvider({
		clientId: process.env.TWITTER_CLIENT_ID,
		clientSecret: process.env.TWITTER_CLIENT_SECRET
	      })
      ],

      callbacks: {
	async session({ session, token, user }) {
	  // Send properties to the client, like an access_token from a provider.
	//   session.accessToken = token.accessToken
	  console.log("logging from nextauth ........................................")
	  console.log(session)
	  console.log(user)
	  return session
	}
      }
  
})