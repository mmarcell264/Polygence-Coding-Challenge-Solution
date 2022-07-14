import React, { useState } from "react";
import { InputStyles } from "../styles/InputStyles";
import { SelectStyles } from "../styles/SelectStyles";
import { FormStyles, ErrorMessage } from "../styles/ComponentStyles";

const emptyFrom = {
  description: "",
  amount: 0,
  currency: "USD",
};

const validState= {valid:true,  errorMessage: ""}


export default function Form({ setSpendings }) {
  const [state, setState] = useState(emptyFrom);
  const [descriptionValidity, setDescriptionValidity] = useState(validState);
  const [amountValidity, setAmountValidity] = useState(validState);
  const [error, setError] = useState(false);


  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function confirmHandler(e) {
    e.preventDefault();

    let formValidity = true;

    if (state.description === "") {
      setDescriptionValidity({valid:false,  errorMessage:"Missing text from description field."});
      formValidity = false;
    } else if (descriptionValidity.valid === false) {
      setDescriptionValidity(validState);
    }

    if (state.amount === "") {
      setAmountValidity({valid:false,  errorMessage:"Missing number from amount field."});
      formValidity = false;
    } else if (amountValidity.valid === false) {
      setAmountValidity(validState);
    }

    if (formValidity) {

      const date = new Date();
      date.getTime();
      const spent_at = date.toISOString();

      fetch("http://localhost:5000/spendings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: state.description,
          amount: state.amount,
          spent_at: spent_at,
          currency: state.currency,
        }),
      })
        .then(async (res) => {
          const body = await res.json();
          return {
            status: res.status,
            body,
          };
        })
        .then((response) => {
          if (response.status === 201) {
            setState(emptyFrom);
            setSpendings((prevState) => {
              return [...prevState, response.body];
            });;
          }
          if (response.status === 400){
            const errorKey = Object.keys(response.body)[0];
            if (errorKey === 'amount') {
              setAmountValidity({
                valid: false,
                errorMessage: response.body[errorKey],
              });
            }
            setError(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setError(true);
        })

        setAmountValidity(validState);
        setDescriptionValidity(validState);
    }
  };

  return (
    <>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!descriptionValidity.valid && (
        <ErrorMessage>{descriptionValidity.errorMessage}</ErrorMessage>
      )}
      {!amountValidity.valid && (
        <ErrorMessage>{amountValidity.errorMessage}</ErrorMessage>
      )}
      <FormStyles onSubmit={confirmHandler}>
        <InputStyles
          type="text"
          placeholder="description"
          name="description"
          value={state.description}
          onChange={handleChange}
        />
        <InputStyles
          type="number"
          placeholder="amount"
          name="amount"
          value={state.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name="currency"
          value={state.currency}
          onChange={handleChange}
        >
          <option value="HUF">HUF</option>
          <option value="USD">USD</option>
        </SelectStyles>
        <InputStyles type="submit" value="Save" />
      </FormStyles>
    </>
  );
}
