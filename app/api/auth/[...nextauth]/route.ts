import NextAuth,{AuthOptions} from 'next-auth'
import { authOptions } from '@/libs/nextAuth'

const handler=NextAuth(authOptions);

export {handler as GET, handler as POST}




