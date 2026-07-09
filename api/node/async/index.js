// fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))

async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchData();
