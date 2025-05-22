import React, { useState } from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'

function App() {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const {register, handleSubmit, watch, formState: {errors}} = useForm()

  const selectedMethod = watch('method')

  const submit = (data)=>{
    setResponse(null)
    setError(null)
    setLoading(true)
    setImageUrl(null)

    if(!data){
      setLoading(false)
      return
    }
    else{
      const config = {
        method: data.method,
        url: data.url,
        headers: data.headers ? JSON.parse(data.headers) : undefined,
      }
      if(!['get', 'delete'].includes(data.method.toLowerCase())) 
      config.data = data.body ? JSON.parse(data.body) : undefined;

      if(data.headers && data.headers.includes('image'))
      config.responseType = 'arraybuffer'

      axios.request(config)
      .then(res => { 
        const contentType = res.headers['content-type']
        if(contentType && contentType.startsWith('image/')){
          const blob = new Blob([res.data], {type: contentType})
          const imgurl = URL.createObjectURL(blob)
          setImageUrl(imgurl)

        }
        setResponse(res)
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false))
      return
    }
  }

  return (
    <div className='w-screen h-screen p-15 bg-stone-950 text-amber-100'>
        <div className='bg-amber-100 w-full h-full flex justify-center shadow-2xl shadow-stone-800'>
          <div className='w-1/2 h-full bg-amber-100 text-stone-950 p-5 space-y-2'>
              <div className='text-2xl font-bold border-b-2 pb-3'>HTTP Playground</div>
              <div>
                <form onSubmit={handleSubmit(submit)} className='flex flex-col space-y-2 mt-8'>
                  <label htmlFor="url" className='p-3 bg-stone-950 text-amber-100 flex'>
                    URL : <input type="text" placeholder='Enter URL' {...register('url', {required: true}) } className='flex-1 outline-none ml-2'/>
                  </label>
                  <label htmlFor="method" className='p-3 bg-stone-950 text-amber-100 '>
                    Method : <select {...register('method', {required: true})} className='outline-none'>
                      <option className='text-stone-950 bg-amber-100' value="get">GET</option>
                      <option className='text-stone-950 bg-amber-100' value="post">POST</option>
                      <option className='text-stone-950 bg-amber-100' value="put">PUT</option>
                      <option className='text-stone-950 bg-amber-100' value="patch">PATCH</option>
                      <option className='text-stone-950 bg-amber-100' value="delete">DELETE</option>
                    </select>
                  </label>
                  <label htmlFor="headers" className='p-3 bg-stone-950 text-amber-100'>
                    <textarea 
                    className='w-full h-25 outline-none' 
                    {...register('headers',{validate: value=>{
                      if(!value) return true;
                      try {
                        JSON.parse(value)
                        return true
                      } catch (error) {
                        return 'invalid json'
                      }
                    }})} 
                    placeholder='Headers (as JSON, e.g., {"Authorization": "Bearer xyz"}), note: {"content-type": "image/(image-format)"} must be provided for image responses.'/>
                    {errors.headers && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.headers.message}
                      </p>
                    )}
                  </label>
                  {selectedMethod !== 'get' && selectedMethod !== 'delete' && <label htmlFor="body" className='p-3 bg-stone-950 text-amber-100'>
                    <textarea 
                    className='w-full h-25 outline-none' 
                    {...register('body',{validate: value=>{
                      if(!value) return true;
                      try {
                        JSON.parse(value)
                        return true
                      } catch (error) {
                        return 'invalid json'
                      }
                    }})}
                    placeholder="Request Body (raw json)"/>
                    {errors.body && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.body.message}
                      </p>
                    )}
                  </label>}
                  <input className='p-3 bg-stone-950 text-amber-100' type="submit" value='Submit'/>
                </form>
              </div>
          </div>
          <div className='w-1/2 h-full bg-stone-950 p-5 flex flex-col'>
            <div className='w-full h-fit p-2 flex justify-between border-b-1'>
              <div className='font-bold text-lg'>Response</div>
              {loading && <div className="text-yellow-400 p-3">Loading...</div>}
              {!loading && <div className='flex space-x-1.5 items-center'>
                <div className={`w-3 h-3 rounded-full ${response ? 'bg-green-500' : error ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                <span>{response ? response.status : error ? error.status : ''}</span>
              </div>}
            </div>
            {response && !imageUrl && (<pre className='bg-stone-900 text-sm p-4 overflow-x-auto h-auto'>
              {typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data}
            </pre>)}
            {response && imageUrl && <img src={imageUrl} className='max-w-[500px] max-h-[330px]'/>}
            {error && <pre className='bg-stone-900 text-sm p-4 overflow-x-auto h-auto'>
              {error.message}
            </pre>}
            {response && <div>
              <div className='w-full h-fit p-2 flex justify-between border-b-1'>
                <div className='font-bold text-lg'>Headers</div>
              </div>
              <pre className='bg-stone-900 text-sm p-4 overflow-x-auto h-auto'>
                {JSON.stringify(response.headers, null, 2)}
              </pre>
            </div>}
            
          </div>
        </div>
    </div>
  )
}

export default App
