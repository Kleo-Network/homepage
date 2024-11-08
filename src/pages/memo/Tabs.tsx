import React, { useState } from 'react'

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Profile')

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <p>This is the Profile content.</p>
      case 'Dashboard':
        return <p>This is the Dashboard content.</p>
      case 'Settings':
        return <p>This is the Settings content.</p>
      case 'Invoice':
        return <p>This is the Invoice content.</p>
      default:
        return null
    }
  }

  return (
    <div className="my-5">
      {/* Mobile Select Dropdown for Tabs */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select your tab
        </label>
        <select
          id="tabs"
          className="bg-grayblue-200 border border-grayblue-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          <option>Profile</option>
          <option>Dashboard</option>
          <option>Settings</option>
          <option>Invoice</option>
        </select>
      </div>

      {/* Tab List for larger screens */}
      <ul className="hidden sm:flex text-sm font-medium text-center text-gray-900 rounded-lg divide-x border border-grayblue-300 divide-grayblue-300">
        <li className="w-full focus-within:z-10">
          <a
            href="#"
            onClick={() => setActiveTab('Profile')}
            className={`inline-block w-full p-4 text-lg ${
              activeTab === 'Profile' ? 'bg-grayblue-200' : 'bg-grayblue-100'
            } border-grayblue-100 rounded-s-lg hover:bg-grayblue-300`}
          >
            Profile
          </a>
        </li>
        <li className="w-full focus-within:z-10">
          <a
            href="#"
            onClick={() => setActiveTab('Dashboard')}
            className={`inline-block w-full p-4 text-lg ${
              activeTab === 'Dashboard' ? 'bg-grayblue-200' : 'bg-grayblue-100'
            } border-grayblue-100 hover:bg-grayblue-300`}
          >
            Dashboard
          </a>
        </li>
        <li className="w-full focus-within:z-10">
          <a
            href="#"
            onClick={() => setActiveTab('Settings')}
            className={`inline-block w-full p-4 text-lg ${
              activeTab === 'Settings' ? 'bg-grayblue-200' : 'bg-grayblue-100'
            } border-grayblue-100 hover:bg-grayblue-300`}
          >
            Settings
          </a>
        </li>
        <li className="w-full focus-within:z-10">
          <a
            href="#"
            onClick={() => setActiveTab('Invoice')}
            className={`inline-block w-full p-4 text-lg ${
              activeTab === 'Invoice' ? 'bg-grayblue-200' : 'bg-grayblue-100'
            } border-grayblue-100 rounded-e-lg hover:bg-grayblue-300`}
          >
            Invoice
          </a>
        </li>
      </ul>

      {/* Content Section */}
      <div className="p-4 bg-grayblue-100 mt-4 rounded-lg shadow text-gray-900">
        {renderContent()}
      </div>
    </div>
  )
}
