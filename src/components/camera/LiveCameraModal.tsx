import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Camera,
  RefreshCw,
  Check,
  AlertCircle,
  FlipHorizontal,
} from 'lucide-react';

interface LiveCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

export const LiveCameraModal: React.FC<LiveCameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  // Check available camera devices
  useEffect(() => {
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        setHasMultipleCameras(videoInputs.length > 1);
      });
    }
  }, []);

  // Start video stream when modal opens or facingMode changes
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedImage(null);
      setErrorMessage(null);
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopCamera();
    setIsInitializing(true);
    setErrorMessage(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage(
        'Browser Anda tidak mendukung akses kamera langsung (MediaDevices API) atau koneksi tidak aman (HTTPS/localhost diperlukan).'
      );
      setIsInitializing(false);
      return;
    }

    try {
      // First try with preferred facingMode
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (e) {
        // Fallback to basic video constraint (common on laptop webcams without environment mode)
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch((err) => {
          console.warn('Video play interrupted:', err);
        });
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage(
          'Izin akses kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda untuk memindai tanaman secara langsung.'
        );
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setErrorMessage('Perangkat kamera tidak ditemukan pada laptop atau HP Anda.');
      } else {
        setErrorMessage('Gagal membuka kamera: ' + (err.message || 'Kesalahan tidak diketahui'));
      }
    } finally {
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // If using user-facing camera on laptop/front phone, unmirror for natural capture
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    setCapturedImage(dataUrl);
    stopCamera();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      handleClose();
    }
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setErrorMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Hidden canvas for image extraction */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative w-full max-w-2xl bg-[#003F32] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/10 text-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#008F63] flex items-center justify-center text-white">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">Kamera Langsung AI</h3>
              <p className="text-[11px] text-white/70">
                Pindai daun langsung dari laptop atau kamera HP Anda
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasMultipleCameras && !capturedImage && (
              <button
                onClick={switchCamera}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Ganti Kamera Depan/Belakang"
              >
                <FlipHorizontal className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewfinder Video Area */}
        <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-black flex items-center justify-center overflow-hidden">
          {errorMessage ? (
            <div className="p-8 text-center max-w-md space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-500/20 text-[#EF4444] flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Tidak Dapat Mengakses Kamera</h4>
                <p className="text-xs text-white/80 leading-relaxed">{errorMessage}</p>
              </div>
              <button
                onClick={startCamera}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-xs font-semibold cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Coba Lagi</span>
              </button>
            </div>
          ) : capturedImage ? (
            /* Snapshot Preview */
            <div className="relative w-full h-full">
              <img
                src={capturedImage}
                alt="Tangkapan Kamera"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#008F63] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                <Check className="w-3.5 h-3.5" />
                <span>Foto Berhasil Diambil</span>
              </div>
            </div>
          ) : (
            /* Live Stream Video */
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />

              {/* Viewfinder Targeting Frame (matching screenshot hero aesthetics) */}
              <div className="absolute inset-8 sm:inset-12 border-2 border-white/60 rounded-3xl pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between">
                  <span className="w-6 h-6 border-t-3 border-l-3 border-[#008F63]"></span>
                  <span className="w-6 h-6 border-t-3 border-r-3 border-[#008F63]"></span>
                </div>

                {/* Animated Green Scanline */}
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#16A66A] to-transparent animate-scan shadow-sm"></div>

                <div className="flex justify-between">
                  <span className="w-6 h-6 border-b-3 border-l-3 border-[#008F63]"></span>
                  <span className="w-6 h-6 border-b-3 border-r-3 border-[#008F63]"></span>
                </div>
              </div>

              {/* Guide Pill */}
              <div className="absolute bottom-5 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium text-white/90 border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16A66A] animate-pulse"></span>
                <span>Posisikan daun di dalam bingkai hijau</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="px-6 py-4 bg-black/50 border-t border-white/10 flex items-center justify-center gap-4">
          {capturedImage ? (
            <>
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Foto Ulang</span>
              </button>

              <button
                onClick={handleConfirm}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Gunakan Foto Ini</span>
              </button>
            </>
          ) : (
            !errorMessage && (
              <button
                onClick={takeSnapshot}
                disabled={isInitializing}
                className="group relative flex items-center justify-center p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all cursor-pointer disabled:opacity-50"
                title="Ambil Foto"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#003F32] shadow-xl group-hover:scale-105 transition-transform">
                  <Camera className="w-7 h-7 text-[#008F63]" />
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
