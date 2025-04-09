import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

function MaintenanceRequestForm() {
  const [formData, setFormData] = useState({
    location: '',
    issueType: '',
    description: '',
    priority: 'medium',
    attachments: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { currentUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // API call to submit maintenance request
      const response = await fetch('/api/maintenance/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({
          ...formData,
          reportedBy: currentUser.id,
          reportedAt: new Date()
        })
      })
      
      if (response.ok) {
        // Reset form and show success message
        setFormData({
          location: '',
          issueType: '',
          description: '',
          priority: 'medium',
          attachments: []
        })
        alert('Maintenance request submitted successfully!')
      }
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">Report Maintenance Issue</h2>
      
      {/* Form fields would go here */}
      <div className="flex flex-col">
        <label className="font-medium">Location</label>
        <select 
          className="border rounded p-2"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        >
          <option value="">Select location</option>
          {/* Options would be populated from API */}
        </select>
      </div>
      
      {/* Other form fields */}
      
      <button 
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  )
}

export default MaintenanceRequestForm 