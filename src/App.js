import React from "react";
import { fetchProperties } from "./api";
import "./styles.css";

function formatProperty(property) {
  switch (property.type) {
    case "string":
    case "number":
      return property.value;
    case "range": {
      const { from, to } = property.value;
      return `${from}-${to}`;
    }
    case "2dimensions":
    case "3dimensions": {
      const { a, b, c } = property.value;
      return [a, b, c].filter(Boolean).join("x");
    }
    default:
      return JSON.stringify(property.value);
      // return property.value
  }
}

export default function App() {
  const [property, setProperty] = React.useState();
  // let arrayOfValues = [];

  //get data from api
  async function fetchData() {
    try {
      const res = await fetchProperties();
      setProperty(res);
    } catch(err) {
      console.log(err);
    }
  }

  fetchData();

  //get array from fetched data
  function getArray(a) {
    // let margin = 0;
    console.log(a);
    if(a && typeof a !== 'string') {
      a.forEach(function(entry) {
        if(entry.type !== 'group') {
          // console.log(margin);
          // const color = entry.id % 2;
          // console.log(entry);
          // console.log(a.indexOf(entry));
          // console.log(entry.name);
          // console.log(formatProperty(entry));
          // return ([<li className='e'></li>]);
        } else {
          // console.log(entry.name);
          // console.log(JSON.parse(formatProperty(entry)));
            getArray(JSON.parse(formatProperty(entry)));
          // console.log('------', entry.name);
          // console.log('______', entry.value);
          // console.log('entry', getArray(formatProperty(entry)));
        }
      });
    }
    
  }

  React.useEffect(() => {
    getArray(property);
  }, [property])

  return (
    <div className="App">
      <h1>Характеристики</h1>
      <img alt="Пример выполненой работы" src="/result.png" />
      <p>
        Нужно сверстать компонент для вывода характеристик в виде дерева. Стили
        не важны, главное сохранить отступы, заголовки групп (иконки можно не
        выводить) и чередующуюся раскраску строк. Для получения данных нужно
        воспользоваться функцией <code>fetchProperties</code> (имитирует запрос
        на сервер) из файла <code>api.js</code>. Для форматирования значения
        характеристики есть функция <code>formatProperty</code> в{" "}
        <code>App.js</code>.
      </p>
      <div className='a'>
        <div className='b'>
          {console.log(property)}
          {!!property && property.map(item => (
            <li 
              className='c'
              key={item.type}
            >

            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
