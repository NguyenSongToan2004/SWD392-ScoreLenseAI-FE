import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { BilliardTable } from '../../../../models/DataObject'
import type { BilliardTableRequest } from '../../models/RequestObject'
import { editTablesAPI } from '../../services/FetchAPI'
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils'

const TableEdit = () => {
  const [form, setForm] = useState<BilliardTableRequest>()
  const [table, setTable] = useState<BilliardTable>();
  const nav = useNavigate();
  const loc = useLocation()

  useEffect(() => {
    const table = getNavigationState<BilliardTable>(loc, 'table');

    if (table) {
      const {
        tableType,
        name,
        description,
        status,
        active,
        storeID,
        cameraUrl
      } = table;

      setTable(table);
      setForm({
        name,
        tableType,
        description,
        status,
        active,
        storeID,
        cameraUrl: cameraUrl ?? "",
      });
    } else {
      toast.error('Thông tin bàn không hợp lệ');
      nav(-1);
    }
  }, [loc.state, nav]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setForm(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: type === 'checkbox' ? target.checked : value,
      };
    });
  };

  const handleSave = () => {
    if (!form) return
    const editForm = async () => {
      const response = await editTablesAPI(form, table?.billardTableID as string);
      if (response.status === 200) {
        toast.success(response.message);
        const store = getNavigationState(loc, 'store');
        const userInfo = getNavigationState(loc, 'userInfo');
        navigateWithState(nav, "/admin/table-management", { store, userInfo });
      } else {
        toast.error(response.message);
      }
    }
    editForm();
  }

  const handleGoBack = () => {
    const store = getNavigationState(loc, 'store');
    const userInfo = getNavigationState(loc, 'userInfo');

    navigateWithState(nav, "/admin/table-management", {
      store,
      userInfo
    });
  }

  if (!form) return null

  return (
    <div className='min-h-screen max-h-screen bg-gray-50 py-8 px-4 overflow-y-auto'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-md mb-6 p-6 sticky top-8 z-10'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-3xl font-bold text-gray-800'>Edit Billiard Table</h2>
            <button
              onClick={handleGoBack}
              className='flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
          </div>
          <div className='h-1 bg-gradient-to-r from-green-700 to-green-500 rounded-full'></div>
        </div>

        {/* Form */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <div className='space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-2'>
            {/* Table Name */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Table Name
              </label>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Enter table name'
                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
              />
            </div>

            {/* Camera URL */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Camera URL
              </label>
              <input
                type='text'
                name='cameraUrl'
                value={form.cameraUrl}
                onChange={handleChange}
                placeholder='Enter camera URL'
                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
              />
            </div>

            {/* Table Type */}
            {/* <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Table Type
              </label>
              <input
                type='text'
                name='tableType'
                value={form.tableType}
                onChange={handleChange}
                placeholder='Enter table type'
                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
              />
            </div> */}

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Table Type
              </label>
              <select
                name='tableType'
                value={form.tableType}
                onChange={handleChange}
                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg bg-white'
              >
                <option value='Pool'>Pool</option>
                <option value='Carom'>Carom</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Description
              </label>
              <textarea
                name='description'
                value={form.description}
                onChange={handleChange}
                placeholder='Enter table description'
                rows={4}
                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg resize-none'
              />
            </div>

            {/* Status and Store ID Row */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Status */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Status
                </label>
                <select
                  name='status'
                  value={form.status}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg bg-white'
                >
                  <option value='available'>Available</option>
                  <option value='inUse'>In Use</option>
                  <option value='underMaintainance'>Under Maintenance</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Store ID
                </label>
                <input
                  readOnly
                  type='text'
                  name='storeID'
                  value={form.storeID}
                  onChange={handleChange}
                  placeholder='Enter store ID'
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
                />
              </div>
            </div>

            {/* Active Checkbox */}
            <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200'>
              <input
                type='checkbox'
                name='active'
                checked={form.active}
                onChange={handleChange}
                className='w-5 h-5 text-green-700 border-2 border-gray-300 rounded focus:ring-green-700 focus:ring-2'
              />
              <label className='text-lg font-medium text-gray-700'>
                Active Table
              </label>
            </div>

            {/* Save Button */}
            <div className='pt-4'>
              <button
                onClick={handleSave}
                className='w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableEdit
