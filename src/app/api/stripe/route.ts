// /api/stripe

import { db } from "@/lib/db";
import { userSubscriptions } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const returnUrl = process.env.NEXT_BASE_URL + "/account";

export async function GET() {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId)
            return NextResponse.json("Not authorized", { status: 402 });

        //
        const _userSubscription = await db
            .select()
            .from(userSubscriptions)
            .where(eq(userSubscriptions.userId, userId));

        if (_userSubscription[0] && _userSubscription[0].stripeCustomerId) {
            // trying to cancel at the billing portal
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: _userSubscription[0].stripeCustomerId,
                return_url: returnUrl,
            });
            return NextResponse.json(
                { url: stripeSession.url },
                { status: 200 }
            );
        }

        // user's first time trying to subscribe
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: returnUrl,
            cancel_url: returnUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user?.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: "ChatPdf Pro",
                            description: "unlimited PDF sessions!",
                        },
                        unit_amount: 9900,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
        });
        return NextResponse.json({ url: stripeSession.url });
    } catch (error) {
        console.log("stripe error", error);
        return NextResponse.json("internal server error", { status: 500 });
    }
}
