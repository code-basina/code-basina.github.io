import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Save, X, Image as ImageIcon, FileText, Megaphone } from 'lucide-react';

const AdminContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('banners');

  useEffect(() => {
    // Simulate fetching content data
    setTimeout(() => {
      setContents([
        {
          id: 1,
          type: 'banner',
          title: 'بنر اصلی صفحه اول',
          content: 'آموزش برنامه نویسی با بهترین اساتید',
          image: 'https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=Main+Banner',
          status: 'active',
          position: 'homepage',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-15'
        },
        {
          id: 2,
          type: 'announcement',
          title: 'اعلان جدید دوره React',
          content: 'دوره جدید React.js از مبتدی تا پیشرفته اضافه شد',
          status: 'active',
          position: 'top',
          createdAt: '2024-01-12',
          updatedAt: '2024-01-12'
        },
        {
          id: 3,
          type: 'static',
          title: 'درباره ما',
          content: 'ما یک پلتفرم آموزشی پیشرفته برای یادگیری برنامه نویسی هستیم...',
          status: 'active',
          position: 'about',
          createdAt: '2024-01-05',
          updatedAt: '2024-01-10'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'banner':
        return <ImageIcon className="w-5 h-5" />;
      case 'announcement':
        return <Megaphone className="w-5 h-5" />;
      case 'static':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'banner':
        return 'بنر';
      case 'announcement':
        return 'اعلان';
      case 'static':
        return 'محتوا ثابت';
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
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
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
      case 'draft':
        return 'پیش‌نویس';
      default:
        return 'نامشخص';
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
  };

  const handleSave = (updatedContent) => {
    setContents(contents.map(content => 
      content.id === updatedContent.id ? updatedContent : content
    ));
    setEditingContent(null);
  };

  const handleDelete = (contentId) => {
    if (window.confirm('آیا از حذف این محتوا اطمینان دارید؟')) {
      setContents(contents.filter(content => content.id !== contentId));
    }
  };

  const filteredContents = contents.filter(content => content.type === activeTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
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
                مدیریت محتوا
              </h1>
              <p className="text-gray-600">
                مدیریت محتوای سایت شامل بنرها، اعلان‌ها و محتوای ثابت
              </p>
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن محتوای جدید</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 space-x-reverse px-6">
              {[
                { key: 'banners', label: 'بنرها', icon: <ImageIcon className="w-4 h-4" /> },
                { key: 'announcements', label: 'اعلان‌ها', icon: <Megaphone className="w-4 h-4" /> },
                { key: 'static', label: 'محتوا ثابت', icon: <FileText className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 space-x-reverse py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content List */}
        <div className="space-y-6">
          {filteredContents.map((content) => (
            <div key={content.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getTypeIcon(content.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 space-x-reverse mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {content.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(content.status)}`}>
                          {getStatusText(content.status)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {getTypeText(content.type)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        {content.content.length > 100 
                          ? `${content.content.substring(0, 100)}...` 
                          : content.content
                        }
                      </p>
                      
                      {content.image && (
                        <img 
                          src={content.image} 
                          alt={content.title}
                          className="w-32 h-20 object-cover rounded-lg mb-3"
                        />
                      )}
                      
                      <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
                        <span>موقعیت: {content.position}</span>
                        <span>آخرین بروزرسانی: {new Date(content.updatedAt).toLocaleDateString('fa-IR')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleEdit(content)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="ویرایش"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(content.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {(showAddForm || editingContent) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingContent ? 'ویرایش محتوا' : 'افزودن محتوای جدید'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingContent(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع محتوا
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="banner">بنر</option>
                      <option value="announcement">اعلان</option>
                      <option value="static">محتوا ثابت</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      عنوان
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="عنوان محتوا"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      محتوا
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="محتوا را وارد کنید..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      موقعیت
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="مثال: homepage, top, about"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      وضعیت
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="active">فعال</option>
                      <option value="inactive">غیرفعال</option>
                      <option value="draft">پیش‌نویس</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingContent(null);
                      }}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>ذخیره</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContent; 