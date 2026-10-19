import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ScanLine,
  Sprout,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { historyService } from '../services/historyService';
import { authService } from '../services/authService';
import type { AnalysisRecord } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [history, setHistory] = useState<AnalysisRecord[]>([]);

  useEffect(() => {
    setHistory(historyService.getAll());
  }, []);

  const stats = historyService.getStats();

  // Chart 1: Most analyzed plants
  const barChartData = [
    { name: 'Cabai', count: 42 },
    { name: 'Tomat', count: 31 },
    { name: 'Terong', count: 25 },
    { name: 'Sawi', count: 18 },
    { name: 'Kangkung', count: 12 },
  ];

  // Chart 2: Plant Health Condition Donut
  const donutData = [
    { name: 'Sehat', value: 70, color: '#008F63' },
    { name: 'Terindikasi Penyakit', value: 25, color: '#F59E0B' },
    { name: 'Tidak Dikenali', value: 5, color: '#9CA3AF' },
  ];

  const totalAnalyzed = stats.total > 0 ? stats.total : 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
              Dashboard
            </h1>
          </div>
          <p className="text-base font-semibold text-[#17352E] mt-1 flex items-center gap-1.5">
            Selamat datang, {user.name.split(' ')[0]} <span className="animate-wiggle">👋</span>
          </p>
          <p className="text-sm text-[#6B7C76]">
            Berikut adalah ringkasan aktivitas analisis tanaman Anda.
          </p>
        </div>

        <Link
          to="/analisis"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
        >
          <ScanLine className="w-4 h-4" />
          <span>Analisis Baru</span>
        </Link>
      </div>

      {/* 3 Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat 1: Total Analisis */}
        <div className="app-card-static p-6 bg-white rounded-2xl border border-[#E4ECE8] relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7C76]">
                Total Analisis
              </p>
              <h3 className="text-3xl font-extrabold text-[#17352E] mt-2 tracking-tight">
                128
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#E8F7F1] flex items-center justify-center text-[#008F63]">
              <ScanLine className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[#16A66A]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12% dari minggu lalu</span>
          </div>
        </div>

        {/* Stat 2: Tanaman Teridentifikasi */}
        <div className="app-card-static p-6 bg-white rounded-2xl border border-[#E4ECE8] relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7C76]">
                Tanaman Teridentifikasi
              </p>
              <h3 className="text-3xl font-extrabold text-[#17352E] mt-2 tracking-tight">
                14
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#E8F7F1] flex items-center justify-center text-[#008F63]">
              <Sprout className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[#16A66A]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4 minggu ini</span>
          </div>
        </div>

        {/* Stat 3: Penyakit Terdeteksi */}
        <div className="app-card-static p-6 bg-white rounded-2xl border border-[#E4ECE8] relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7C76]">
                Penyakit Terdeteksi
              </p>
              <h3 className="text-3xl font-extrabold text-[#17352E] mt-2 tracking-tight">
                3
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B]">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[#F59E0B]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>1 dari minggu lalu</span>
          </div>
        </div>
      </div>

      {/* Charts Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Tanaman Paling Sering Dianalisis */}
        <div className="lg:col-span-7 app-card-static p-6 sm:p-7 bg-white rounded-2xl border border-[#E4ECE8]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-bold text-[#17352E] tracking-tight">
              Tanaman Paling Sering Dianalisis
            </h3>
            <span className="text-xs font-medium text-[#6B7C76] bg-[#F8FAF9] px-2.5 py-1 rounded-lg border border-[#E4ECE8]">
              Bulan Ini
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  stroke="#6B7C76"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#E4ECE8' }}
                />
                <YAxis
                  stroke="#6B7C76"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#E4ECE8' }}
                />
                <Tooltip
                  cursor={{ fill: '#F3FBF7' }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    borderColor: '#E4ECE8',
                    boxShadow: '0 4px 20px -2px rgba(0,63,50,0.08)',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#008F63" radius={[8, 8, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Status Kesehatan Tanaman (Donut) */}
        <div className="lg:col-span-5 app-card-static p-6 sm:p-7 bg-white rounded-2xl border border-[#E4ECE8] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-bold text-[#17352E] tracking-tight">
              Status Kesehatan Tanaman
            </h3>
            <span className="text-xs font-medium text-[#6B7C76] bg-[#F8FAF9] px-2.5 py-1 rounded-lg border border-[#E4ECE8]">
              Proporsi
            </span>
          </div>

          <div className="h-48 w-full relative flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val}%`, '']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    borderColor: '#E4ECE8',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Total Counter */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] font-semibold text-[#6B7C76] uppercase tracking-wider">Total</span>
              <span className="text-2xl font-extrabold text-[#17352E]">{totalAnalyzed}</span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="space-y-2 pt-2 border-t border-[#E4ECE8]">
            <div className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#008F63]"></span>
                <span className="text-[#17352E]">Sehat</span>
              </div>
              <span className="font-bold text-[#17352E]">70%</span>
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                <span className="text-[#17352E]">Terindikasi Penyakit</span>
              </div>
              <span className="font-bold text-[#17352E]">25%</span>
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]"></span>
                <span className="text-[#17352E]">Tidak Dikenali</span>
              </div>
              <span className="font-bold text-[#17352E]">5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Analysis Section */}
      <div className="app-card-static p-6 sm:p-7 bg-white rounded-2xl border border-[#E4ECE8]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#17352E] tracking-tight">
              Riwayat Terbaru
            </h3>
            <p className="text-xs text-[#6B7C76] mt-0.5">
              Analisis tanaman terkini yang telah dievaluasi oleh sistem
            </p>
          </div>
          <Link
            to="/riwayat"
            className="text-xs sm:text-sm font-semibold text-[#008F63] hover:text-[#005A45] flex items-center gap-1 group"
          >
            <span>Lihat semua</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* List of recent items */}
        <div className="divide-y divide-[#E4ECE8]">
          {history.slice(0, 3).map((item) => {
            const isHealthy = item.condition === 'healthy';
            return (
              <div
                key={item.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F3FBF7]/50 p-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.plant}
                    className="w-14 h-14 rounded-xl object-cover ring-1 ring-[#E4ECE8]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#17352E] flex items-center gap-1.5">
                      <span>{item.plant}</span>
                      <span className="text-xs text-[#6B7C76] font-normal italic">
                        ({item.scientificName})
                      </span>
                    </h4>
                    <p className="text-xs text-[#6B7C76] mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.createdAt).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      isHealthy
                        ? 'bg-[#E8F7F1] text-[#008F63]'
                        : 'bg-red-50 text-[#EF4444]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isHealthy ? 'bg-[#008F63]' : 'bg-[#EF4444]'
                      }`}
                    ></span>
                    <span>{isHealthy ? 'Sehat' : item.disease || 'Terindikasi Penyakit'}</span>
                  </span>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#17352E]">
                      {item.confidence.toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-[#6B7C76] block">Confidence</span>
                  </div>

                  <button
                    onClick={() => navigate(`/analisis/${item.id}`)}
                    className="px-3.5 py-1.5 rounded-xl border border-[#E4ECE8] hover:border-[#008F63] hover:text-[#008F63] text-xs font-semibold text-[#17352E] transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Lihat detail</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
