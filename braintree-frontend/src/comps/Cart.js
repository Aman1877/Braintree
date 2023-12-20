import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getClientToken, makePayment } from "./apiCalls";
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);

  const [values, setValues] = useState({
    clientToken: null,
    success: "",
    error: "",
    instance: "",
  });

  useEffect(() => {
    setCartProduct(loadCart());
    getToken();
  }, []);

  const { clientToken, success, err, instance } = values;

  // We got Token
  const getToken = () => {
    getClientToken().then((response) => {
      if (response.err) {
        setValues({ ...values, error: response.err });
      }
      setValues({ ...values, clientToken: response.clientToken });
    });
  };

  const loadCart = () => {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")); //   console.log(localStorage.getItem('cart'))
    }
    return [];
  };

  const onPurchase = () => {
    instance.requestPaymentMethod().then((data) => {
      let nonce = data.nonce;
      let paymentData = {
        payment_method_nonce: nonce,
        amount: getAmount(),
      };
      makePayment(paymentData)
        .then((response) => {
          console.log("responseeeeeeee", response);
          if (response.err) {
            setValues({ ...values, error: response.error });
          }
          setValues({ ...values, error: "", success: response.success });
        })
        .catch((err) => {
          setValues({ ...values, error: err, success: "" });
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    cartProduct.map((data, i) => {
      amount += data.amount;
    });
    return amount;
  };

  return (
    <div className="cart">
      <div className="cart-item">
        {cartProduct.length > 0 &&
          cartProduct.map((data, i) => (
            <Product
              key={i}
              name={data.name}
              from="cart"
              amount={data.amount}
              img={data.img}
            />
          ))}

        {cartProduct.length == 0 && <h1>Cart is Empty</h1>}
      </div>

      <div className="payment">
        {cartProduct.length > 0 && <h1>Total amount{getAmount()}$</h1>}
        {clientToken && (
          <div>
            <DropIn
              options={{ authorization: clientToken }}
              onInstance={(instance) =>
                setValues({ ...values, instance: instance })
              }
            />
            <button
              onClick={() => {
                onPurchase();
              }}
            >
              Buy
            </button>
          </div>
        )}
        {!clientToken && <h1>Loading.....</h1>}
      </div>
    </div>
  );
};

export default Cart;
