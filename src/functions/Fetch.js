async function Fetch(link) {
  let result;
  await fetch(link)
    .then((response) => response.json())
    .then((data) => { result = data; });
  return result;
}

export default Fetch;
