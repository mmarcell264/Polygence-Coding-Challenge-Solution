import React, { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { DateTime } from "luxon";
import Loader from "./Loader";
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from "../styles/ComponentStyles";

export default function SpendingList({
  spendings,
  setSpendings,
  filter,
  ordering,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredAndOrderedSpendings, setFilteredAndOrderedSpendings] = useState([])

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/spendings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let applyFilterAndOrdering = spendings;

    if (filter === "") {
      applyFilterAndOrdering = spendings;
    } else if (filter === "HUF ") {
      applyFilterAndOrdering = spendings.filter(
        (s) => s.currency === "HUF"
      );
    } else if (filter === "USD") {
      applyFilterAndOrdering = spendings.filter(
        (s) => s.currency === "USD"
      );
    }

    if (ordering === "-date") {
      applyFilterAndOrdering = applyFilterAndOrdering.sort(
        (a, b) => new Date(b.spent_at) - new Date(a.spent_at)
      );
    } else if (ordering === "date") {
      applyFilterAndOrdering = applyFilterAndOrdering.sort(
        (a, b) => new Date(a.spent_at) - new Date(b.spent_at)
      );
    } else if (ordering === "-amount_in_huf") {
      applyFilterAndOrdering = applyFilterAndOrdering.sort(
        (a, b) => b.amount - a.amount
      );
    } else if (ordering === "amount_in_huf") {
      applyFilterAndOrdering = applyFilterAndOrdering.sort(
        (a, b) => a.amount - b.amount
      );
    }
    setFilteredAndOrderedSpendings([...applyFilterAndOrdering])
  }, [filter, ordering, spendings]);

  if (loading) return <Loader />;

  return (
    <>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!spendings.length && !error && (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Yay!{" "}
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            🎉
          </span>{" "}
          No spendings!
        </h1>
      )}
      {filteredAndOrderedSpendings.length > 0 &&
        filteredAndOrderedSpendings.map((spending) => (
          <Spending key={spending.id}>
            <IconWrapper>
              <FiDollarSign color="var(--color-blue)" />
            </IconWrapper>
            <TextWrapper>
              <h3>{spending.description}</h3>
              <p>
                {DateTime.fromISO(spending.spent_at).toFormat(
                  "t - MMMM dd, yyyy"
                )}
              </p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending.currency}>
                {(spending.amount / 100).toFixed(2)}
              </Amount>
            </AmountWrapper>
          </Spending>
        ))}
    </>
  );
}
