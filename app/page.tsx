'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Image from 'next/image';


const Home = () => {
  // State to manage must-have ingredient, entered ingredients, and video data
  const [mustHave, setMustHave] = useState('')
  const [enteredIngredients, setEnteredIngredients] = useState<string[]>([])
  const [videos, setVideos] = useState<any[]>([]) // Renamed to reflect that we are fetching videos
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  // Popular ingredients to display
  const popularIngredients = ['Tomato', 'Chicken', 'Pasta', 'Garlic', 'Cheese']

  // Handler for selecting must-have ingredient and adding it
  const handleMustHaveChange = (event: any) => {
    const selectedIngredient = event.target?.value
    setMustHave(selectedIngredient)
    if (selectedIngredient) {
      addIngredient(selectedIngredient)
    }
  }

  // Handler for entering ingredients from the input
  const handleIngredientInput = (event: any) => {
    if (event.key === 'Enter' && event.target.value) {
      addIngredient(event.target.value) // Use the addIngredient function
      event.target.value = '' // Clear the input field
    }
  }

  // Handler for adding ingredients (either from popular or entered manually)
  const addIngredient = (ingredient: string) => {
    if (!enteredIngredients.includes(ingredient)) {
      setEnteredIngredients(prevIngredients => [...prevIngredients, ingredient])
    }
  }

  // Handler for removing an ingredient
  const removeIngredient = (ingredientToRemove: string) => {
    setEnteredIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient !== ingredientToRemove)
    )
  }

  // Fetch videos based on entered ingredients
  const fetchRecipes = async () => {
    setLoading(true)
    setError(null)

    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_KEY; // Add your YouTube API key here

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          enteredIngredients.join(',')
        )}&type=video&key=${apiKey}`
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      // YouTube API returns videos inside `items`
      setVideos(data.items || [])
    } catch (err: any) {
      setError('Error fetching videos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mx-auto p-6'>
      <h1 className='text-4xl font-bold text-center mb-6'>
        Welcome to Food Fantasy!
      </h1>
      <p className='text-lg text-gray-600 text-center mb-8'>
        Discover and create delicious recipes. Start by adding your favorite
        ingredients or browse through our collection!
      </p>

      {/* Flexbox container to align popular and must-have sections in a row */}
      <div className='w-[80%] flex flex-col justify-center items-start lg:flex-row mb-8 gap-16'>
        {/* Popular Ingredients Section */}
        <div className='flex flex-col items-center'>
          <h2 className='text-2xl font-semibold mb-4'>Popular Ingredients:</h2>
          <div className='flex flex-wrap gap-4'>
            {popularIngredients.map((ingredient, index) => (
              <button
                key={index}
                onClick={() => addIngredient(ingredient)} // Add popular ingredient to the list
                className='bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-2 rounded-md shadow-md'
              >
                + {ingredient}
              </button>
            ))}
          </div>
        </div>

        {/* Must Have Ingredient Section */}
        <div className='flex-1'>
          <h2 className='text-2xl font-semibold mb-4'>Must Have Ingredient:</h2>
          <select
            className='w-[80%] border border-gray-300 rounded-md py-2 px-4 text-gray-700'
            value={mustHave}
            onChange={handleMustHaveChange}
          >
            <option value=''>Select a must-have ingredient...</option>
            {popularIngredients.map((ingredient, index) => (
              <option key={index} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enter Ingredients Section */}
      <div className='mb-8 w-[80%]'>
        <h2 className='text-2xl font-semibold mb-4'>
          Enter more ingredients to find matching recipes:
        </h2>
        <input
          type='text'
          className='w-full border border-gray-300 rounded-md py-2 px-4 mb-4'
          placeholder='Enter an ingredient and press Enter...'
          onKeyDown={handleIngredientInput}
        />

        {/* Display Selected Ingredients (Popular + Manually Entered) */}
        <div className='flex flex-wrap gap-2 mt-4'>
          {enteredIngredients.map((ingredient, index) => (
            <div
              key={index}
              className='flex items-center bg-green-200 text-green-800 font-medium py-1 px-3 rounded-full shadow-sm'
            >
              <span>{ingredient}</span>
              <button
                className='ml-2 text-red-500 hover:text-red-700 font-bold text-sm'
                onClick={() => removeIngredient(ingredient)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fetch Recipes Button */}
      <button
        onClick={fetchRecipes}
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md mb-8'
      >
        Find Recipes
      </button>

      {/* Display Loading or Error */}
      {/* {loading && <p className='text-lg text-gray-600'>Loading videos...</p>} */}
      {error && <p className='text-lg text-red-600'>{error}</p>}

      {/* Display YouTube Video Results */}
      <div className='w-[80%]'>
        {/* <h2 className='text-2xl font-semibold mb-4'>Recipe Results:</h2> */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading ? <VideoCardSkeleton /> : videos.map((video, index) => (
            <div
              key={index}
              className='bg-white shadow-md rounded-md p-4 break-inside-avoid'
              style={{ breakInside: 'avoid' }} // Prevents breaks in the grid layout
            >
              <h3 className='text-xl font-semibold line-clamp-1 overflow-ellipsis'>
                {video.snippet.title}
              </h3>
              <p className='text-gray-600 mt-2 line-clamp-2'>
                {video.snippet.description}
              </p>
              {video.snippet.thumbnails?.medium && (
                <Image
                src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              width={320}  // Adjust based on desired width
          height={180}
                className=" rounded-md mt-4"
              />
              
              )}
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target='_blank'
                rel='noopener noreferrer'
                className='block mt-2 text-blue-500'
              >
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const VideoCardSkeleton = () => {
  return (
    <>
      {Array(6) // Display 6 skeletons for loading state
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className='animate-pulse bg-white border-2 border-gray-100 shadow-sm rounded-md p-4'
          >
            <div className='h-6 bg-gray-200 rounded w-3/4 mb-4'></div>{' '}
            {/* Simulating the title */}
            <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>{' '}
            {/* Simulating the description */}
            <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>{' '}
            {/* Simulating the description */}
            <div className='h-32 bg-gray-200 rounded-md mt-4'></div>{' '}
            {/* Simulating the thumbnail */}
          </div>
        ))}
    </>
  )
}

export default Home
