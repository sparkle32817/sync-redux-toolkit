import type { NextPage } from "next";
import { useAppDispatch, useTypedSelector } from "../src/store";
import { decrement, increment } from "../src/store/reducers/counterSlice";

const Home: NextPage = () => {
  const { value } = useTypedSelector((store) => store.counter);
  const dispatch = useAppDispatch();

  return (
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
  );
};

export default Home;
