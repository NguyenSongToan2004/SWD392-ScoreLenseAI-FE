import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { BilliardTable } from '../../../models/DataObject'
import type { BilliardTableRequest } from '../models/RequestObject'
import { TableFactoryProvider } from '../models/RequestObject'
import { editTablesAPI } from '../services/FetchAPI'

const TableEdit = () => {
  const [form, setForm] = useState<BilliardTableRequest>()
  const [table, setTable] = useState<BilliardTable>();
  const nav = useNavigate();
  const loc = useLocation()

  useEffect(() => {
    const table = loc.state?.table as BilliardTable;
    if (table) {
      const factory = TableFactoryProvider.getFactory(table.tableType);
      const defaultRequest = factory.createTableRequest();
      
      setTable(table);
      setForm({
        ...defaultRequest,
        name: table.name,
        tableType: table.tableType,
        description: table.description,
        status: table.status,
        active: table.active,
        storeID: table.storeID,
        cameraUrl: table.cameraUrl ?? "",
      });
    } else {
      alert('Table is not valid');
    }
  }, []);

  const handleTableTypeChange = (newTableType: string) => {
    if (!form) return;
    
    const factory = TableFactoryProvider.getFactory(newTableType);
    const defaultRequest = factory.createTableRequest();
    
    setForm(prev => ({
      ...prev!,
      tableType: newTableType,
      description: defaultRequest.description, // Apply default description for new type
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (name === 'tableType') {
      handleTableTypeChange(value);
      return;
    }

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
        let store = loc.state?.store;
        // const user = loc.state?.userInfo
        nav("/admin/table-management", {
          state: {
            store
          }
        })
      }
    }
    editForm();
    // TODO: Call API to save the updated table here
  }

  if (!form) return null

  return (
    <div className='flex flex-col gap-4 p-6 max-w-xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Edit Billiard Table</h2>

      <input
        type='text'
        name='name'
        value={form.name}
        onChange={handleChange}
        placeholder='Name'
        className='border rounded p-2'
      />

      <input
        type='text'
        name='Camera Url'
        value={form.cameraUrl}
        onChange={handleChange}
        placeholder='Table Code'
        className='border rounded p-2'
      />

      <input
        type='text'
        name='tableType'
        value={form.tableType}
        onChange={handleChange}
        placeholder='Table Type'
        className='border rounded p-2'
      />

      <textarea
        name='description'
        value={form.description}
        onChange={handleChange}
        placeholder='Description'
        className='border rounded p-2'
      />

      <select
        name='status'
        value={form.status}
        onChange={handleChange}
        className='border rounded p-2'
      >
        <option value='available'>Available</option>
        <option value='inUse'>In Use</option>
        <option value='underMaintainance'>Under Maintenance</option>
      </select>

      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          name='active'
          checked={form.active}
          onChange={handleChange}
        />
        <label htmlFor='active'>Active</label>
      </div>

      <input
        type='text'
        name='storeID'
        value={form.storeID}
        onChange={handleChange}
        placeholder='Store ID'
        className='border rounded p-2'
      />

      <button
        onClick={handleSave}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Save
      </button>
    </div>
  )
}

export default TableEdit
