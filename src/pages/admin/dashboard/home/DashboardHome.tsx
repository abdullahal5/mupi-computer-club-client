import {
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaFileAlt,
  FaProjectDiagram,
  FaRegClipboard,
} from "react-icons/fa";

const DashboardHome = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#000030] text-white">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome to Your Dashboard
        </h1>
        <p className="mt-2 text-sm md:text-base text-white/80">
          Manage your events, committees, sessions, projects, articles, and
          executives in one place.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-[#2a2d3f] to-[#1e2233] text-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <FaCalendarAlt className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Events</h2>
            <p className="text-gray-300 text-sm">8 Scheduled</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2a2d3f] to-[#1e2233] text-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <FaClipboardList className="text-green-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Sessions</h2>
            <p className="text-gray-300 text-sm">42 Completed</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2a2d3f] to-[#1e2233] text-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <FaProjectDiagram className="text-purple-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Projects</h2>
            <p className="text-gray-300 text-sm">5 Ongoing</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2a2d3f] to-[#1e2233] text-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <FaFileAlt className="text-orange-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Articles</h2>
            <p className="text-gray-300 text-sm">12 Published</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2a2d3f] to-[#1e2233] text-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <FaUsers className="text-teal-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Executives</h2>
            <p className="text-gray-300 text-sm">3 Active</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2a2d3f] to-[#1e2233] text-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <FaRegClipboard className="text-yellow-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Committees</h2>
            <p className="text-gray-300 text-sm">2 Created</p>
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-gradient-to-r from-[#2a2d3f] to-[#1e2233] text-white rounded-lg shadow-lg p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <table className="min-w-[600px] w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#33384b]">
              <th className="py-2 px-4 border">Activity</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-[#444c62]">
              <td className="py-2 px-4 border">Session "Tech Talk"</td>
              <td className="py-2 px-4 border">April 1, 2025</td>
              <td className="py-2 px-4 border text-green-600 font-medium">
                Completed
              </td>
            </tr>
            <tr className="hover:bg-[#444c62]">
              <td className="py-2 px-4 border">Committee Created</td>
              <td className="py-2 px-4 border">March 29, 2025</td>
              <td className="py-2 px-4 border text-blue-600 font-medium">
                New
              </td>
            </tr>
            <tr className="hover:bg-[#444c62]">
              <td className="py-2 px-4 border">Event Planning</td>
              <td className="py-2 px-4 border">March 27, 2025</td>
              <td className="py-2 px-4 border text-yellow-600 font-medium">
                Pending
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
