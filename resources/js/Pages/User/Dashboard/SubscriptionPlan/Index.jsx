import SubscriptionCard from "@/Components/SubscriptionCard";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

export default function SubscriptionPlan({ auth, subscriptionPlans, env }) {
    const selectSubscription = (id) => {
        Inertia.post(
            route("user.dashboard.subscriptionPlan.userSubscribe", {
                subscriptionPlan: id,
            }),
            {},
            {
                only: ["userSubscription"],
                onSuccess: ({ props }) => {
                    onSnapMidtrans(props.userSubscription);
                },
            }
        );
    };

    const onSnapMidtrans = (userSubscription) => {
        snap.pay(userSubscription.snap_token, {
            onSuccess: function (result) {
                console.log("success");
                console.log(result);
            },
            onPending: function (result) {
                console.log("pending");
                console.log(result);
            },
            onError: function (result) {
                console.log("error");
                console.log(result);
            },
        });
    };

    return (
        <>
            <Head>
                <script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={env.MIDTRANS_CLIENT_KEY}
                ></script>
                <title>Subscription Plan</title>
            </Head>

            <Authenticated auth={auth}>
                <div className="py-20 flex flex-col items-center">
                    <div className="text-black font-semibold text-[26px] mb-3">
                        Pricing for Everyone
                    </div>
                    <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                        Invest your little money to get a whole new experiences
                        from movies.
                    </p>
                    {/* Pricing Card */}
                    <div className="flex justify-center gap-10 mt-[70px]">
                        {subscriptionPlans.map((subscriptionPlan) => (
                            <SubscriptionCard
                                name={subscriptionPlan.name}
                                price={subscriptionPlan.price}
                                durationInMonth={
                                    subscriptionPlan.active_period_in_months
                                }
                                features={JSON.parse(subscriptionPlan.features)}
                                isPremium={subscriptionPlan.name === "Premium"}
                                onSelectSubscription={() =>
                                    selectSubscription(subscriptionPlan.id)
                                }
                            />
                        ))}
                    </div>
                    {/* /Pricing Card */}
                </div>
            </Authenticated>
        </>
    );
}
