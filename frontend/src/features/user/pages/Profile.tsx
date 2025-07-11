import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <div className="flex justify-center items-center h-[calc(100vh-62px)] overflow-auto">Loading profile...</div>;
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 flex flex-col h-[calc(100vh-62px)] overflow-auto">
      {/* Header with fixed height */}
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center space-x-4 mb-4">
          {/* Profile Picture */}
          <div className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden">
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="font-bold text-lg dark:text-white">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">@{user.username}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-around mb-4">
          <div className="text-center">
            <p className="font-bold dark:text-white">13k</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">supporters</p>
          </div>
          <div className="text-center">
            <p className="font-bold dark:text-white">984</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">supporting</p>
          </div>
          <div className="text-center">
            <p className="font-bold dark:text-white">256</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">posts</p>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm dark:text-white mb-3">{user.bio}</p>
        )}

        {/* Edit Profile Button */}
        <button className="w-full py-1.5 border border-gray-300 dark:border-gray-600 rounded-md font-medium dark:text-white text-sm">
          Edit Profile
        </button>
      </div>

      {/* Tabs - Fixed height */}
      <div className="border-t border-b border-gray-200 dark:border-gray-800 flex overflow-x-auto no-scrollbar flex-shrink-0">
        <button className="flex-shrink-0 px-4 py-3 font-medium text-sm text-gray-800 dark:text-white border-t-2 border-black dark:border-white">
          Gallery
        </button>
        <button className="flex-shrink-0 px-4 py-3 font-medium text-sm text-gray-500 dark:text-gray-400">
          Favorites
        </button>
        <button className="flex-shrink-0 px-4 py-3 font-medium text-sm text-gray-500 dark:text-gray-400">
          Posts
        </button>
        <button className="flex-shrink-0 px-4 py-3 font-medium text-sm text-gray-500 dark:text-gray-400">
          Shop
        </button>
        <button className="flex-shrink-0 px-4 py-3 font-medium text-sm text-gray-500 dark:text-gray-400">
          About
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-0.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
              {/* Dummy Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-sm">Post {item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;