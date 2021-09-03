import React, { useEffect, useState } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {
  const [sushiList, setSushiList] = useState([]);
  const [budget, setBudget] = useState(100);
  const [plates, setPlates] = useState([])

  const handleIsEatenClick = (id) => {
    const eatenSushi = sushiList.find(sushi => sushi.id === id);
    if (budget - eatenSushi.price > 0) {
      const editedList = sushiList.map(sushi => {
        return (sushi.id === id) ? { ...sushi, isEaten: true } : sushi;
      });
      setBudget(oldBudget => oldBudget - eatenSushi.price);
      setSushiList(editedList);
      setPlates((oldPlates) => [...oldPlates, eatenSushi])
    }
  }

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setSushiList(data.map(sushi => ({ ...sushi, isEaten: false }))));
  }, []);

  return (
    <div className="app">
      <SushiContainer sushis={sushiList} budgetRemaining={budget} onIsEatenClick={handleIsEatenClick} />
      <Table plates={plates} budgetRemaining={budget} />
    </div>
  );
}

export default App;
