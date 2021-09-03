import React, { useState } from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";

function SushiContainer({ sushis, onIsEatenClick }) {
  const [page, setPage] = useState(0);
  const paginatedSushiList = sushis.slice(page * 4, (page * 4) + 4);
  const sushiList = paginatedSushiList.map(sushi => (
    <Sushi
      key={sushi.id}
      id={sushi.id}
      name={sushi.name}
      img_url={sushi.img_url}
      price={sushi.price}
      isEaten={sushi.isEaten}
      onIsEatenClick={onIsEatenClick}
    />));
  console.log(page)
  const handleMoreClick = () => {
    setPage((prevPage) => (prevPage + 1 >= sushis.length / 4) ? 0 : prevPage + 1);
  }
  return (
    <div className="belt">
      {sushiList}
      <MoreButton handleMoreClick={handleMoreClick} />
    </div>
  );
}

export default SushiContainer;
