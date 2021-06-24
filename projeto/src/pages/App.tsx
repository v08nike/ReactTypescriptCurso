import { useState } from 'react'
import {Form} from '../components/Form/index'
import {List} from '../components/List/index'
import {Stopwatch} from '../components/Stopwatch/index'
import { ITaskData } from '../types/Task'
import { date } from 'common/utils/date'
import './style.scss'

function App() {

  const [list, setList] = useState<ITaskData[]>([])
  const [selected, setSelected] = useState<ITaskData>()
  const [time, setTime] = useState<number>(0)
  
  function handleSaveTask(data: ITaskData) {
    setList([...list, { ...data, completed: false, selected: false }])
  }

  function handleOnClick(item: ITaskData, index: number) {
    item.selected = true
    setSelected(item)
    setList((prevList: ITaskData[]) => 
        prevList.map((prevItem: ITaskData, prevIndex: number) => (
          prevIndex === index ? {...prevItem, selected: true} : prevItem
        ))
    )  
    setTime(date.timeToSeconds(item.time)) 
  }

  function handleOnFinish() {
    if (selected){
      const item = selected
      setList((prevList: ITaskData[]) => 
      prevList.map((prevItem: ITaskData) => (
        prevItem.id === item.id ? {...prevItem, selected: false, completed: true} : prevItem
      )))
      setTime(0)
    }
  }

  return (
    <div className="App">
      <Form saveTask={handleSaveTask}/>
      <Stopwatch time={time} setTime={setTime} onFinish={handleOnFinish}/>
      <List list={list} onClick={handleOnClick}/>
    </div>
  );
}

export default App