import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateProfile } from '../../store/slices/authSlice';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{user.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <p className="mt-1 text-gray-900 capitalize">{user.role}</p>
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