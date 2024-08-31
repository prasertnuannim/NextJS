import NextAuth from 'next-auth';
import { authOptions } from './authOptions'; // Adjust the path according to where your authOptions are defined

export default NextAuth(authOptions);