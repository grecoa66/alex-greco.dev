import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
  interface User extends AdapaterUser {
    role?: string;
  }
}
