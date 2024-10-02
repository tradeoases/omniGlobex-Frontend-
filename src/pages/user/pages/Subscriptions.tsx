import { Button } from "@/components/ui/button";

const Subscriptions = () => {

  const addPayment =async()=> {
    


  }

  return (
    <div>
      <h1 className="w-full text-center font-bold text-4xl">Subscriptions</h1>
      <div>
        <h1>Subscription Details</h1>
      </div>
      <div>
        <h1>Payment Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button onClick={addPayment}>Add payment Method</Button>
        <Button disabled>Upgrade subscription</Button>
        <Button disabled>Downgrade Subscription</Button>
        <Button>Cancel Subscription</Button>
      </div>
    </div>
  );
};

export default Subscriptions;
