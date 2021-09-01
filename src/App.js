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
  }
}

console.log( fetchProperties() );

export default function App() {
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
      <div 
        style={{ 
          borderColor: 'black',
          borderStyle: 'solid', 
          width: '500px', 
          height: '284px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <div
          style={{ 
            borderColor: 'black',
            borderStyle: 'solid', 
            margin: '10px'
          }}
        >

        </div>
      </div>
    </div>
  );
}
