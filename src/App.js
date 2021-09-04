import React from "react";
import { fetchProperties } from "./api";
import "./styles.css";

import List from "./components/List";


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
  }
}

export default function App() {
  const [property, setProperty] = React.useState();
  const arr = [];
  let level = 0;
  let groupCount = 0;
  let groupName = null;
  

  async function fetchData() {
    try {
      setProperty(await fetchProperties());

    } catch(err) {
      console.log(err);
    }
  }
  
  function getArray(property) {
    if(property) {
      property.map(entry => {
        if(entry.type !== 'group') {
          if(level > 0) {
            if(groupCount > 0) {
              groupCount -= 1;
              arr.push({margin: level, groupName: groupName, name: entry.name, value: formatProperty(entry)})
              
            } else {
              arr.push({margin: level, groupName: groupName, name: entry.name, value: formatProperty(entry)})
              level = 1;
            }
          } else {
            groupCount -= 1;
            level = 1
            arr.push({margin: level, groupName: groupName, name: entry.name, value: formatProperty(entry)})
          }
          groupName = null;
        } else {  
            groupCount = entry.value.length - 1;
            level += 1;
            groupName = entry.name;
            getArray(JSON.parse(formatProperty(entry)));
        }
      });
    }
  }

  fetchData();
  getArray(property);

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
      {arr.length !== 0 && <List arr={arr}/>}
    </div>
  );
}
