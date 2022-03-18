import React from "react";
import type { NextPage } from "next";
import { useAppDispatch, useTypedSelector } from "../src/store";
import { decrement, increment, changeString } from "../src/store/reducers/counterSlice";

const Home: NextPage = () => {
  const { value, string } = useTypedSelector((store) => store.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <span>{value}</span>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increase
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrease
        </button>
      </div>
      <div>
        <input
          type="text"
          value={string}
          onChange={(e) => {
            dispatch(changeString(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default Home;
