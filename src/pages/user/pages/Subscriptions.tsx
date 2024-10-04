/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  getAllPaymentMethods,
  getSubscriptionDetails,
} from "@/service/apis/business-services";

import // PaymentElement,
// useStripe,
// useElements
"@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import AddPaymentMethod from "../supplier-profile/add-credit-card";
import { Card } from "@/components/ui/card";

const Subscriptions = () => {
  const {
    data: BusinessSubscription,
    isLoading: subscriptionLoading,
    isSuccess: subscriptionSuccess,
    isError: isSubscriptionError,
    error: subscriptionError,
  } = useQuery({
    queryKey: ["subscriptions-details"],
    queryFn: async () => {
      const response = await getSubscriptionDetails();
      if (response.status === 200) {
        return response.data.data;
      }
    },
  });

  const {
    data: paymentMethods,
    isLoading: methodsLoading,
    isSuccess: methodsSuccess,
    isError: isMethodsError,
    error: methodError,
  } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const response = await getAllPaymentMethods();
      if (response.status === 200) {
        return response.data.data;
      }
    },
  });
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  console.log({paymentMethods})
  return (
    <div>
      <h1 className="w-full text-center font-bold text-4xl">Subscriptions</h1>

      {openCreateModal && (
        <AddPaymentMethod onClose={() => setOpenCreateModal(false)} />
      )}
      <div>
        <h1 className="font-semibold text-lg">Subscription Details</h1>

        {subscriptionSuccess &&
          BusinessSubscription.map((sub: any) => (
            <div>
              {/* {JSON.stringify(BusinessSubscription)} */}
              <h1>{sub.plan.productName}</h1>
              <h3>{sub.plan.productDescription}</h3>
              <p>
                {sub.plan.interval}ly charges: {sub.plan.currency}:{" "}
                {sub.plan.amount}
              </p>
              <p>Status: {sub.trial}</p>
              <p>
                Period Started: {moment.unix(sub.start).format("Do MMMM YYYY")}
              </p>
              <p>Period Ends: {moment.unix(sub.end).format("Do MMMM YYYY")}</p>
            </div>
          ))}
        {isSubscriptionError && (
          <div>
            <div>An error occured while loading subscriptions</div>
            <div>
              {subscriptionError.name} - {subscriptionError.message}
            </div>
          </div>
        )}
        {subscriptionLoading && <div>Loading subscription...</div>}
      </div>
      <div>
        <h1>Payment Details</h1>
        {isMethodsError && (
          <div>
            <div>An error occured while loading subscriptions</div>
            <div>
              {methodError.name} - {methodError.message}
            </div>
          </div>
        )}
        {methodsLoading && <div>Loading subscription...</div>}
        {methodsSuccess &&
          paymentMethods.map((meth: any) => (
            <Card>
              <h1>Brand: {meth.brand}</h1>
              <h2>Last four digits: {meth.last4}</h2>
              <h2>
                expiry date: {meth.expMonth}/{meth.expYear}
              </h2>
              <h2>Name: {meth.billingName}</h2>
              <h1>Email: {meth.billingEmail}</h1>
            </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button onClick={() => setOpenCreateModal(true)}>
          Add payment Method
        </Button>
        <Button disabled>Upgrade subscription</Button>
        <Button disabled>Downgrade Subscription</Button>
        <Button disabled>Cancel Subscription</Button>
      </div>
    </div>
  );
};

export default Subscriptions;
