import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, resendOtpValidator, signUpValidator, verifyOtpValidator } from '../validators/auth.js'
import User from '../models/user.js'
import { generateOTP } from '../utils/otp.js'
import hash from '@adonisjs/core/services/hash'
import { getHtmlOtpEmailContent } from '../utils/mailcontent.js'
import { sendEmail } from '../utils/Mailer.js'
import { generateAuthToken } from '../utils/jwt.js'
export default class UsersController {
    public async signUp({ request, response }: HttpContext) {
        const data = request.body()
        const payload = await signUpValidator.validate(data)


        const { emailAddress, firstName, lastName } = payload

        const userWithThisEmail = await User.findBy("email_address", emailAddress);
        if (userWithThisEmail) return response.send({
            status: 400,
            message: "User already Exist."
        })


        const otp = generateOTP();
        const hashedOTP = await hash.make(otp);

        const user = await User.create({ firstName, lastName, emailAddress: emailAddress, loginOtp: hashedOTP });
        await user.save()

        await this.sendOtpByEmail(otp, user);

        return response.send({
            status: 200,
            message: "Verification Otp has been sent on Email."
        })


    }


    async verifyOtp({ request, response }: HttpContext) {
        const data = request.body();
        const payload = await verifyOtpValidator.validate(data);
        const { otp, emailAddress } = payload
        const user = await User.findBy("email_address", emailAddress);

        if (!user) {
            return response.json({
                status: 400,
                message: "No User Found With this Email."
            });
        }


        if (!user.loginOtp) {
            return response.json({
                status: 400,
                message: "No Otp Generated"
            });
        }




        const isOtpCorrect = await hash.verify(user.loginOtp, otp);


        if (!isOtpCorrect) {
            return response.json({
                status: 400,
                message: "Invalid Otp Please Try Again.",
                otp: user.loginOtp
            })

        }

        user.loginOtp = "";
        user.isVerified = true;
        await user.save()

        const token = await generateAuthToken(user.id, user.emailAddress);


        return response.json({
            status: 200,
            message: "Verification Completed Success.",
            data: {
                token: token
            }
        })



    }

    async resendOtp({ request, response }: HttpContext) {
        const data = request.body();
        const payload = await resendOtpValidator.validate(data);
        const { emailAddress } = payload
        const user = await User.findBy("email_address", emailAddress);


        if (!user) {
            return response.send({
                status: 400,
                message: "No user found with this Email."
            })
        }

        if (user?.isVerified) {
            return response.send({
                status: 400,
                message: "User is already Verified."
            })
        }


        const otp = generateOTP();
        const hashedOTP = await hash.make(otp);



        user.loginOtp = hashedOTP;
        await user.save()

        await this.sendOtpByEmail(otp, user);


        return response.send({
            status: 200,
            message: "Verification Otp has been sent on Email."
        })


    }

    private async sendOtpByEmail(otp: string, user: User) {
        const emailContent = getHtmlOtpEmailContent(otp);
        await sendEmail(
            {
                htmlContent: emailContent
                , subject: "Tasks-Sync Your One-Time Password (OTP)",
                recipientEmail: user.emailAddress,
                recipientName: user.firstName + " " + user.lastName
            })
    }



    async login({ request, response }: HttpContext) {
        const data = request.body()
        const payload = await loginValidator.validate(data)

        const { emailAddress } = payload

        const user = await User.findBy("email_address", emailAddress);
        if (!user) return response.send({
            status: 400,
            message: "No User Found With this Email."
        })



        const otp = generateOTP();
        const hashedOTP = await hash.make(otp);

        user.loginOtp = hashedOTP;
        await user.save();


        await this.sendOtpByEmail(otp, user);

        return response.send({
            status: 200,
            otp: otp,
            message: "Verification Otp has been sent on Email."
        })
    }



}