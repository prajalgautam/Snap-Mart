import { Suspense } from "react";

const OrdersLayout = ({ children }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          {children}
        </Suspense>
      </div>
    </section>
  );
};

export default OrdersLayout;
