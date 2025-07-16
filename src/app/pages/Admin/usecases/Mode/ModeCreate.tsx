import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState } from '../../../../Utils/navigationUtils';
import type { ModeRequest } from '../../models/RequestObject';
import { createModeAPI } from '../../services/FetchAPI';
// import { createModeAPI } from '../../services/FetchAPI'; // Uncomment when API is available

const ModeCreate = () => {
    const [form, setForm] = useState<ModeRequest>({
        name: '',
        description: '',
        active: true
    });
    const nav = useNavigate();
    const loc = useLocation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (!form.name.trim()) {
            toast.error('Mode name is required');
            return;
        }

        const createMode = async () => {
            const response = await createModeAPI(form);
            if (response.status === 200 || response.status === 201) {
                toast.success(response.message || 'Mode created successfully');
                const store = getNavigationState(loc, 'store');
                const userInfo = getNavigationState(loc, 'userInfo');
                nav("/admin/mode-management",
                    {
                        state: {
                            store: store,
                            userInfo: userInfo
                        }
                    }
                );
            } else {
                toast.error(response.message || 'Failed to create mode');
            }
        }
        createMode();
    };

    const handleGoBack = () => {
        nav(-1);
    };

    return (
        <div className='min-h-screen max-h-screen bg-gray-50 py-8 px-4 overflow-y-auto'>
            <div className='max-w-2xl mx-auto'>
                {/* Header */}
                <div className='bg-white rounded-lg shadow-md mb-6 p-6 sticky top-8 z-10'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-3xl font-bold text-gray-800'>Create Mode</h2>
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

                    <div className='flex gap-3'>
                        <button
                            onClick={handleSave}
                            className='px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
                        >
                            Create Mode
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <div className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Mode Name <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                placeholder='Enter mode name'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Description
                            </label>
                            <textarea
                                name='description'
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                placeholder='Enter mode description'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeCreate;