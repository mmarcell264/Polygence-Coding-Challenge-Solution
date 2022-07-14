import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [ordering, setOrdering] = useState("-date");
  const [filter, setFilter] = useState("");


  return (
    <>
      <Layout>
        <Form setSpendings={setSpendings} />
        <FiltersAndOrderings
            setOrdering={setOrdering} setFilter={setFilter}
        />
        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          ordering={ordering}
          filter={filter}
        />
      </Layout>
    </>
  );
}
