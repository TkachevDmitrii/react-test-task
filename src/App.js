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




// async function func2() {
//   const res = await formatProperty(func());
//   return(res);
// }

// const a = func2();
// console.log(a);

export default function App() {

  const [property, setProperty] = React.useState();

  async function func() {
    try {
      const res = await fetchProperties();
      setProperty(res);
    } catch(err) {
      console.log(err);
    }
  }

  func();

  if(property) {
    console.log(formatProperty(property[3]));
  }

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
      <div className="a">
        <div className="b">
          <li className="c"></li>
          <li className="d"></li>
          <li className="e"></li>
          <li className="f"></li>
          <li className="c"></li>
          <li className="f"></li>
        </div>
      </div>
    </div>
  );
}
