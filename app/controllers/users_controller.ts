import type { HttpContext } from '@adonisjs/core/http'
import { signUpValidator } from '../validators/auth.js'
import User from '../models/user.js'
import { generateOTP } from '../utils/otp.js'
import hash from '@adonisjs/core/services/hash'
import { getHtmlOtpEmailContent } from '../utils/mailcontent.js'
import { sendEmail } from '../utils/Mailer.js'
export default class UsersController {
    public async signUp({ request, response }: HttpContext) {
        // step 2 check if email already exist than return if exist
        // step 3 if the user exist and not verified (what to do ???)
        // step 4 if user does not exist with this email than create a user with email.
        // step 5 update user otp (hashed) column in user record .
        // step 6 send otp via email.

        const data = request.body()
        const payload = await signUpValidator.validate(data)

        const { emailAddress } = payload

        const userWithThisEmail = await User.findBy("email_address", emailAddress);
        if (userWithThisEmail) return userWithThisEmail;

        const otp = generateOTP();
        const hashedOTP = await hash.make(otp);


        const user = await User.create({ emailAddress: emailAddress, loginOtp: hashedOTP });
        await user.save()

        const emailContent = getHtmlOtpEmailContent(otp);
        await sendEmail(
            {
                htmlContent: emailContent
                , subject: "Tasks-Sync Your One-Time Password (OTP)",
                recipientEmail: user.emailAddress
            })

        return response.send({
            status: 200,
            otp: otp,
            message: "Verification Otp has been sent on Email."
        })


    }
}