import User from "@/models/user"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        //credentials -> ข้อมูลที่ส่งมาจากform
        const { email, password } = credentials
        try {
          //ดึงค่าข้อมูลที่ตรงกับ email จาก database
          const user = await User.findOne({ email })

          //ถ้าไม่มี user
          if (!user) {
            return null
          }
          //ถ้ามี เทียบ password ว่าตรงกันไหม
          const passwordMatch = await bcrypt.compare(password, user.password)
          //ถ้าไม่ตรง
          if (!passwordMatch) {
            return null;
          }
          return user;

        } catch (error) {
          console.log("Error", error)
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  page: { //กำหนดหน้า
    signIn: "/login"
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
