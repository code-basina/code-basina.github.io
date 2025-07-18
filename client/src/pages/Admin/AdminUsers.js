import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, UserPlus, Mail, Phone } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    // Simulate fetching users data
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'علی احمدی',
          email: 'ali@example.com',
          phone: '09123456789',
          role: 'student',
          status: 'active',
          joinedAt: '2024-01-10',
          coursesCount: 3,
          avatar: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A'
        },
        {
          id: 2,
          name: 'مریم کریمی',
          email: 'maryam@example.com',
          phone: '09187654321',
          role: 'instructor',
          status: 'active',
          joinedAt: '2024-01-08',
          coursesCount: 2,
          avatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=M'
        },
        {
          id: 3,
          name: 'سینا محمدی',
          email: 'sina@example.com',
          phone: '09111222333',
          role: 'admin',
          status: 'active',
          joinedAt: '2024-01-05',
          coursesCount: 5,
          avatar: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=S'
        },
        {
          id: 4,
          name: 'فاطمه رضایی',
          email: 'fateme@example.com',
          phone: '09144555666',
          role: 'student',
          status: 'inactive',
          joinedAt: '2024-01-03',
          coursesCount: 1,
          avatar: 'https://via.placeholder.com/40x40/EF4444/FFFFFF?text=F'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'instructor':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'admin':
        return 'مدیر';
      case 'instructor':
        return 'مدرس';
      case 'student':
        return 'دانشجو';
      default:
        return 'نامشخص';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'فعال';
      case 'inactive':
        return 'غیرفعال';
      default:
        return 'نامشخص';
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                مدیریت کاربران
              </h1>
              <p className="text-gray-600">
                {users.length} کاربر در سیستم ثبت شده است
              </p>
            </div>
            <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>افزودن کاربر جدید</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو در کاربران..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">همه کاربران</option>
                <option value="admin">مدیران</option>
                <option value="instructor">مدرسین</option>
                <option value="student">دانشجویان</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              لیست کاربران
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                        {getRoleText(user.role)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Phone className="w-4 h-4" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
                      <span>{user.coursesCount} دوره</span>
                      <span>عضویت: {new Date(user.joinedAt).toLocaleDateString('fa-IR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:text-green-800 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredUsers.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-gray-500">کاربری یافت نشد</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers; 