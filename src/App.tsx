import {useEffect, useState} from "react";

const TARGER_SIZE = "12vmin";

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">("initial");
  const [timer, setTimer] = useState<number>(0);
  const [position, setPosition] = useState<[number, number]>([
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ]);
  const [score, setScore] = useState<number>(0);

  function handleClick() {
    setScore((prevScore) => prevScore + 1);
    if (score === 20) {
      setStatus("finished");
      setScore(0);
    }
    setPosition([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
  }

  useEffect(() => {
    let interval: number;
    if (status === "playing") {
      interval = setInterval(() => setTimer((timer) => timer + 1), 100);
    }
    return () => clearInterval(interval)
  }, [status]);
  return(
    <main>
      <header>
        <h1>{Math.round((timer / 10) * 100) / 100} seconds</h1>
      </header>
      <section style={{position: "relative", marginRight: TARGER_SIZE, marginLeft: TARGER_SIZE}}>
        {status === "playing" && (
          <figure
            style={{
              width: TARGER_SIZE,
              height: TARGER_SIZE,
              transform: `scale(${1 - score * 0.04})`,
              position: "absolute",
              top: `${position[0]}%`,
              left: `${position[1]}%`}}
          onClick={handleClick} />
        )}
        <h1>{score}</h1>
      </section>
      <footer>
        {status === "initial" && <button onClick={() => setStatus("playing")}>Play</button>}
        {status === "playing" && <button onClick={() => setStatus("finished")}>Finish</button>}
        {status === "finished" && <button onClick={() => setStatus("initial")}>Reset</button>}
      </footer>
    </main>
  );
}

export default App;
