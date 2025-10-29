import React from "react";

type StarProps = {
  rating: number;
  rate: (num: number) => void;
  ind?: number;
};

function Star({ rating, rate, ind = 0 }: StarProps) {
  return (
    <div
      className={`star ${rating > ind ? "star-filled" : ""}`}
      onClick={() => rate(ind + 1)}
    ></div>
  );
}
function Rating({ rating, rate }: StarProps) {
  return (
    <div className="stars">
      {Array.from({ length: 10 }).map((_, i) => (
        <Star rating={rating} rate={rate} ind={i} key={i} />
      ))}
    </div>
  );
}

export default Rating;
