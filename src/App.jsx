import { useState, useEffect } from "react"

const App = () => {
  const [topStories, setTopStories] = useState([])
  const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const getTopStories = async () => {
  const response = await fetch(`${BASE_URL}/topstories.json`);
  const ids = await response.json();

  //API call for Fetch each item
  const storyPromises = ids.map(id =>
    fetch(`${BASE_URL}/item/${id}.json`).then(res => res.json())
  );

  const stories = await Promise.all(storyPromises);
  setTopStories(stories); // array of story objects
};

  useEffect(() => {
    getTopStories();
  }, [])
  

  return ( topStories.length > 0 ?
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hacker News Top Stories</h1>
      {topStories.map(story => (
        <p key={story.id} className="my-2"> - {story.title}</p>
      ))}
    </div> : <div className="p-5 text-2xl">Loading...</div>
  )
}

export default App


// API docs: https://github.com/HackerNews/API
// Endpoint for list of stories: https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
// Endpoint for detail for a story /v0/item/<id>.json (the .json at the end is required, e.g. 
//   https://hacker-news.firebaseio.com/v0/item/8863.json