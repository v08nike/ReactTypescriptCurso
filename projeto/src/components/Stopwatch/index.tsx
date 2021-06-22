import { TimerView } from '../TimerView/index'
import './style.scss'

interface IStopwatchProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  onFinish:() => void;
}

const delay = (ms = 1000) => new Promise((resolve, _) => {
  setTimeout(resolve, ms);
})

export function Stopwatch(props: IStopwatchProps){
  
  async function handleOnClick() {
    for (let i = 1; i <= props.time; i++) {
      await delay()
      props.setTime((prevState) => prevState - 1)
    }
    props.onFinish()
  }

  return (
    <div className="cronometro">
      <div>
        <TimerView totalSeconds={props.time}/>
      </div>
      <button onClick={handleOnClick}>Começar</button>
    </div>
  )
}