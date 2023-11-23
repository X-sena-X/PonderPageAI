import axios from "axios";
import React from "react";
import { Button } from "./ui/button";

type Props = {
    isPro: boolean;
};

const SubscriptionButton = (props: Props) => {
    const [loading, setLoading] = React.useState(false);
    const handleSubscription = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Button disabled={loading} onClick={handleSubscription}>
            {props.isPro ? "Manage subsciption" : "Upgrade to Pro"}
        </Button>
    );
};

export default SubscriptionButton;
