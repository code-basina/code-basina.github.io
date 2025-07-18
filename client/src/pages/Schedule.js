import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, BookOpen } from 'lucide-react';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Simulate fetching schedule data
    setTimeout(() => {
      setSchedule([
        {
          id: 1,
          title: 'آموزش React.js - جلسه 5',
          course: 'React.js از مبتدی تا پیشرفته',
          instructor: 'سینا جعفرزاده',
          date: '2024-01-20',
          time: '18:00',
          duration: '90 دقیقه',
          type: 'online',
          participants: 25,
          maxParticipants: 30,
          status: 'upcoming'
        },
        {
          id: 2,
          title: 'بررسی پروژه‌های دانشجویان',
          course: 'JavaScript پیشرفته',
          instructor: 'سینا جعفرزاده',
          date: '2024-01-22',
          time: '16:00',
          duration: '60 دقیقه',
          type: 'online',
          participants: 15,
          maxParticipants: 20,
          status: 'upcoming'
        },
        {
          id: 3,
          title: 'آموزش Node.js - جلسه 3',
          course: 'Node.js و Express',
          instructor: 'سینا جعفرزاده',
          date: '2024-01-18',
          time: '19:00',
          duration: '120 دقیقه',
          type: 'online',
          participants: 30,
          maxParticipants: 30,
          status: 'completed'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming':
        return 'آینده';
      case 'completed':
        return 'تکمیل شده';
      case 'cancelled':
        return 'لغو شده';
      default:
        return 'نامشخص';
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            برنامه کلاسی
          </h1>
          <p className="text-gray-600">
            برنامه کلاس‌های آینده و گذشته شما
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                تقویم
              </h2>
              <div className="space-y-2">
                {schedule.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      new Date(item.date).toDateString() === selectedDate.toDateString()
                        ? 'bg-blue-100 border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedDate(new Date(item.date))}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(item.date).toLocaleDateString('fa-IR')}
                    </div>
                    <div className="text-xs text-gray-600">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Schedule List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  کلاس‌های {selectedDate.toLocaleDateString('fa-IR')}
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {schedule
                  .filter(item => new Date(item.date).toDateString() === selectedDate.toDateString())
                  .map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 space-x-reverse mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {getStatusText(item.status)}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">
                            {item.course} - مدرس: {item.instructor}
                          </p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{item.time}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{item.duration}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {item.type === 'online' ? 'آنلاین' : 'حضوری'}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {item.participants}/{item.maxParticipants}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <BookOpen className="w-4 h-4" />
                            <span>ورود به کلاس</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                
                {schedule.filter(item => new Date(item.date).toDateString() === selectedDate.toDateString()).length === 0 && (
                  <div className="p-6 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      کلاسی در این تاریخ ندارید
                    </h3>
                    <p className="text-gray-600">
                      برای مشاهده کلاس‌های دیگر، تاریخ دیگری را انتخاب کنید
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule; 