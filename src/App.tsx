import {useEffect, useState} from "react";

const TARGET_SIZE = "12vmin";

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">("initial");
  const [timer, setTimer] = useState<number>(0);
  const [position, setPosition] = useState<[number, number]>([
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ]);
  const [score, setScore] = useState<number>(0);
  const [bestTime, setBestTime] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);

  function handleClick() {
    setScore((prevScore) => {
      const updatedScore = prevScore + 1;

      if (updatedScore === 20) {
        setStatus("finished");
      }

      if ((updatedScore === bestScore && timer < bestTime) || updatedScore > bestScore) {
        setBestTime(timer); // Actualizar el mejor tiempo si es igual puntaje en menor tiempo o mejor puntaje
        setBestScore(updatedScore); // Actualizar el mejor puntaje
      }

      return updatedScore;
    });
    setPosition([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
  }

  useEffect(() => {
    let interval: number;

    if (status === "playing") {
      interval = setInterval(() => setTimer((timer) => timer + 1), 100);
    }

    return () => clearInterval(interval);
  }, [status]);

  return (
    <main>
      <header>
        <h1>{Math.round((timer / 10) * 100) / 100} seconds</h1>
        <div className="card">
          <h2>Best Time: {bestTime} seconds</h2>
          <h2>Best Score: {bestScore}</h2>
        </div>
      </header>
      <section style={{position: "relative", marginRight: TARGET_SIZE, marginLeft: TARGET_SIZE}}>
        {status === "playing" && (
          <figure
            style={{
              width: TARGET_SIZE,
              height: TARGET_SIZE,
              transform: `scale(${1 - score * 0.04})`,
              position: "absolute",
              top: `${position[0]}%`,
              left: `${position[1]}%`,
            }}
            onClick={handleClick}
          />
        )}
        <h1>{score}</h1>
      </section>
      <footer>
        {status === "initial" && <button onClick={() => setStatus("playing")}>Play</button>}
        {status === "playing" && (
          <button
            onClick={() => {
              setStatus("finished");
              setTimer(0); // Reinicia el tiempo a 0 cuando termina el juego
            }}
          >
            Finish
          </button>
        )}
        {status === "finished" && (
          <button
            onClick={() => {
              setStatus("initial");
              setTimer(0); // Reinicia el tiempo a 0 cuando se reinicia el juego
              setScore(0); // Reinicia el puntaje a 0 cuando se reinicia el juego
            }}
          >
            Reset
          </button>
        )}
      </footer>
    </main>
  );
}

export default App;
