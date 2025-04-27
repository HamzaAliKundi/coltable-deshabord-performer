import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAddEventMutation } from '../../../apis/event'

interface EventFormData {
  title: string
  host: string
  type: string
  theme: string
  startTime: Date
  endTime: Date
  description: string
  isPrivate: boolean
}

const CreateEvent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>()
  const [createEvent, { isLoading }] = useAddEventMutation()

  const onSubmit = async (data: EventFormData) => {
    try {
      const startDate = new Date()
      const endDate = new Date()
      const [startHours, startMinutes] = data.startTime.toString().split(':')
      const [endHours, endMinutes] = data.endTime.toString().split(':')
      
      startDate.setHours(parseInt(startHours), parseInt(startMinutes))
      endDate.setHours(parseInt(endHours), parseInt(endMinutes))
      
      const formattedData = {
        ...data,
        startTime: startDate,
        endTime: endDate
      }

      await createEvent(formattedData).unwrap()
      toast.success('Event created successfully!')
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error('Failed to create event. Please try again.')
    }
  }

  return (
    <div className="p-4 md:px-8 py-16 bg-black">
      <div className="w-[100px] my-3 h-[4px] rounded-lg bg-[#FF00A2]"></div>
      <h1 className="text-white text-3xl font-space-grotesk mb-8">CREATE EVENT</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Title*
            </label>
            <input 
              {...register('title', { required: true })}
              type="text"
              placeholder="Event Title..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.title && <span className="text-red-500">Event title is required</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Host*
            </label>
            <input 
              {...register('host', { required: true })}
              type="text"
              placeholder="Event Host Name..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.host && <span className="text-red-500">Event host is required</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-white font-space-grotesk text-sm md:text-base">
            Event type*
          </label>
          <select 
            {...register('type', { required: true })}
            className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500 appearance-none"
          >
            <option value="drag-show">Drag show</option>
            <option value="comedy-show">Comedy Show</option>
            <option value="music-concert">Music Concert</option>
            <option value="dance-performance">Dance Performance</option>
            <option value="theater-show">Theater Show</option>
            <option value="other">Other</option>
          </select>
          <div className="absolute right-3 top-[45px] pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="#878787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {errors.type && <span className="text-red-500">Event type is required</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Theme*
            </label>
            <input 
              {...register('theme', { required: true })}
              type="text"
              placeholder="Event Theme..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.theme && <span className="text-red-500">Event theme is required</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Start Time*
            </label>
            <input 
              {...register('startTime', { required: true })}
              type="time"
              defaultValue="00:00"
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.startTime && <span className="text-red-500">Start time is required</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event End Time*
            </label>
            <input 
              {...register('endTime', { required: true })}
              type="time"
              defaultValue="00:00"
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.endTime && <span className="text-red-500">End time is required</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white font-space-grotesk text-sm md:text-base">
            Description*
          </label>
          <textarea 
            {...register('description', { required: true })}
            placeholder="Type..."
            rows={6}
            className="w-full bg-[#0D0D0D] rounded-lg p-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          {errors.description && <span className="text-red-500">Description is required</span>}
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input 
                {...register('isPrivate', { required: true })}
                type="radio" 
                value="false"
                defaultChecked
                className="appearance-none w-5 h-5 rounded-full border-2 border-white checked:border-white checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-white checked:before:m-[4px]"
              />
            </div>
            <span className="text-white font-space-grotesk text-sm md:text-base">Public Event</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input 
                {...register('isPrivate', { required: true })}
                type="radio" 
                value="true"
                className="appearance-none w-5 h-5 rounded-full border-2 border-white checked:border-white checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-white checked:before:m-[4px]"
              />
            </div>
            <span className="text-white font-space-grotesk text-sm md:text-base">Private Event</span>
          </label>
        </div>
        {errors.isPrivate && <span className="text-red-500">Please select event type</span>}
        <button 
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-[#FF00A2] text-white font-space-grotesk text-base py-2 px-12 rounded-full hover:bg-pink-600 transition-colors w-fit ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </div>
          ) : 'Submit Event'}
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
