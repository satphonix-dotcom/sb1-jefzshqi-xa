import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/slices/authSlice';
import { useForm } from '../../hooks/useForm';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { values, handleChange, handleSubmit, errors } = useForm(
    {
      username: user?.username || '',
      email: user?.email || ''
    },
    async (formData) => {
      await dispatch(updateProfile(formData)).unwrap();
      setIsEditing(false);
    }
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      {errors.form && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{user?.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{user?.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <p className="mt-1 text-gray-900 capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;