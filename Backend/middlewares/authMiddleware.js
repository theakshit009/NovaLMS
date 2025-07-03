import { clerkClient } from "@clerk/express";

//Mentor Protecting Routes
export const protectMentor = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)

        if(response.publicMetadata.role !== 'mentor'){
            return res.json({
                success: false,
                message: 'Unauthorized Access'
            })
        }
        next()
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}