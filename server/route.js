import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: "35101254912-7jgqlr26e2rmns8q7gg5a837vbdn5tbv.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}