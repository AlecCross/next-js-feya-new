import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return user.email.endsWith(process.env.Admin_Email); // Ò³ëüêè êîðèñòóâà÷³ ç âàøîãî äîìåíó ìîæóòü óâ³éòè
    }
  }
});
