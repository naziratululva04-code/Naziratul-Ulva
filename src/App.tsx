/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Calendar as CalendarIcon, 
  MapPin, 
  Music, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Users, 
  MessageSquare, 
  Share2, 
  Settings, 
  Eye, 
  EyeOff, 
  Gift, 
  Clock, 
  Plus, 
  Trash2, 
  ExternalLink,
  Play,
  Pause,
  ChevronRight,
  Sparkles,
  Award,
  FileText
} from 'lucide-react';

// Interfaces
interface Wish {
  id: string;
  name: string;
  status: 'Hadir' | 'Tidak Hadir' | 'Ragu-ragu';
  message: string;
  timestamp: string;
  likes: number;
}

interface RSVPRecord {
  id: string;
  name: string;
  status: 'Hadir' | 'Tidak Hadir' | 'Ragu-ragu';
  guestsCount: number;
  wishes: string;
  timestamp: string;
}

// Preset Couple Photos from Unsplash (Premium Aesthetic Wedding Pics)
const PHOTO_PRESETS = [
  {
    id: 'couple-classic',
    name: 'Classic Elegant Couple',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'couple-holding-hands',
    name: 'Rings & Hands Romantic',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'couple-forest',
    name: 'Forest Warm Couple',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'wedding-altar',
    name: 'Aesthetic Floral Altar',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1000'
  }
];

// Preset Songs (Instrumentals that load instantly and sound romantic)
const SONG_PRESETS = [
  {
    id: 'canon',
    name: 'Pachelbel Canon in D (Piano)',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 'acoustic',
    name: 'Acoustic Guitar Sweet Breeze',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 'violin',
    name: 'Romantic Violin & Soft Piano',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  },
  {
    id: 'lounge',
    name: 'Beautiful Lounge Symphony',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: 'orchestral',
    name: 'Classical Romance Symphony',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'
  }
];

// Default Initial Wishes
const DEFAULT_WISHES: Wish[] = [
  {
    id: 'w-1',
    name: 'Budi Santoso',
    status: 'Hadir',
    message: 'Selamat menempuh hidup baru Aditiya & Kirana! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Amin! Lancar acaranya.',
    timestamp: 'Baru saja',
    likes: 8
  },
  {
    id: 'w-2',
    name: 'Siska Amelia',
    status: 'Hadir',
    message: 'Happy wedding guys! Lancar sampai hari H dan bahagia selamanya! So happy for you both!',
    timestamp: '2 jam yang lalu',
    likes: 5
  },
  {
    id: 'w-3',
    name: 'Dian Pratama',
    status: 'Tidak Hadir',
    message: 'Selamat ya! Sangat senang melihat kalian berdua bersanding di pelaminan. Maaf belum bisa hadir langsung karena dinas luar kota, kirim kado lewat kado digital ya!',
    timestamp: '5 jam yang lalu',
    likes: 3
  },
  {
    id: 'w-4',
    name: 'Ahmad Fauzi',
    status: 'Hadir',
    message: 'Barakallahu lakum wa baraka \'alaikum wa jama\'a bainakuma fii khair. Selamat menempuh ibadah terlama ya sob!',
    timestamp: '1 hari yang lalu',
    likes: 12
  }
];

export default function App() {
  // --- INVITATION STATES (Editable / Personalizable) ---
  const [groom, setGroom] = useState('Juanda');
  const [groomFull, setGroomFull] = useState('Juanda, S.T');
  const [groomParents, setGroomParents] = useState('Putra dari Bapak Budi');
  
  const [bride, setBride] = useState('Mutia');
  const [brideFull, setBrideFull] = useState('Mutia Fahrina, S.Pd.');
  const [brideParents, setBrideParents] = useState('Putri dari Bapak Bahagia');

  const [date, setDate] = useState('2026-07-25');
  const [time, setTime] = useState('10:00');
  const [timezone, setTimezone] = useState('WIB');
  
  const [locationName, setLocationName] = useState('Gedung Pernikahan');
  const [locationAddress, setLocationAddress] = useState('Jl. Syiah Kuala, Kecamatan Kuta Alam, Kota Banda Aceh');
  const [mapsUrl, setMapsUrl] = useState('https://maps.google.com/?q=Jl.+Syiah+Kuala,+Kecamatan+Kuta+Alam,+Kota+Banda+Aceh');

  const [bgPhoto, setBgPhoto] = useState(PHOTO_PRESETS[0].url);
  const [songPresetKey, setSongPresetKey] = useState('canon');
  const [customSongUrl, setCustomSongUrl] = useState('');
  const [quote, setQuote] = useState('Mencintai adalah perjalanan tanpa akhir yang kita mulai hari ini.');

  // Gifts
  const [bank1Name, setBank1Name] = useState('Bank Central Asia (BCA)');
  const [bank1Number, setBank1Number] = useState('1234567890');
  const [bank1Holder, setBank1Holder] = useState('Aditiya Pratama');

  const [bank2Name, setBank2Name] = useState('Bank Mandiri');
  const [bank2Number, setBank2Number] = useState('0987654321');
  const [bank2Holder, setBank2Holder] = useState('Kirana Larasati');

  // RSVP List & Guest Wishes
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);

  // --- APP-WIDE LOGIC STATES ---
  const [guestName, setGuestName] = useState('Sahabat & Kerabat');
  const [hasCover, setHasCover] = useState(true); // Gate page open by default
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(true); // Left side editor panel
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false); // Collapsible Apps Script guide
  const [isMusicGuideOpen, setIsMusicGuideOpen] = useState(false); // Collapsible music guide
  
  // Custom Share Tool States
  const [copiedText, setCopiedText] = useState<{ [key: string]: boolean }>({});
  const [customGuestInput, setCustomGuestInput] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  // Form State
  const [formName, setFormName] = useState('');
  const [formStatus, setFormStatus] = useState<'Hadir' | 'Tidak Hadir' | 'Ragu-ragu'>('Hadir');
  const [formGuests, setFormGuests] = useState(1);
  const [formMessage, setFormMessage] = useState('');
  const [rsvpFeedback, setRsvpFeedback] = useState<string | null>(null);
  const [rsvpSending, setRsvpSending] = useState(false);
  const [rsvpSendError, setRsvpSendError] = useState<string | null>(null);

  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- API STATE VARIABLES ---
  const [readApiUrl, setReadApiUrl] = useState(() => localStorage.getItem('wedding_read_api_url') || 'https://script.google.com/macros/s/AKfycbzIJtChV0WYu68vZT40x0ohhfpWaIbbJBr6-SKNuf0P978E9pb2oEF63vmKQAmi3nsO/exec');
  const [writeApiUrl, setWriteApiUrl] = useState(() => localStorage.getItem('wedding_write_api_url') || 'https://script.google.com/macros/s/AKfycbzIJtChV0WYu68vZT40x0ohhfpWaIbbJBr6-SKNuf0P978E9pb2oEF63vmKQAmi3nsO/exec');

  const updateReadApiUrl = (val: string) => {
    setReadApiUrl(val);
    localStorage.setItem('wedding_read_api_url', val);
  };

  const updateWriteApiUrl = (val: string) => {
    setWriteApiUrl(val);
    localStorage.setItem('wedding_write_api_url', val);
  };
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccessMessage, setApiSuccessMessage] = useState<string | null>(null);

  const fetchRsvpsAndWishes = async () => {
    if (!writeApiUrl) return;
    try {
      const response = await fetch(writeApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        const parsedWishes: Wish[] = [];
        const parsedRsvps: RSVPRecord[] = [];

        json.data.forEach((row: any, index: number) => {
          const findValue = (keys: string[]) => {
            for (const key of keys) {
              for (const k of Object.keys(row)) {
                if (k.toLowerCase().trim() === key.toLowerCase().trim()) {
                  return row[k];
                }
              }
            }
            return undefined;
          };

          const name = String(findValue(['nama tamu', 'nama_tamu', 'nama', 'name', 'nama lengkap']) || 'Anonim').trim();
          const rawStatus = String(findValue(['kehadiran', 'status', 'status kehadiran']) || 'Hadir').trim();
          const status: 'Hadir' | 'Tidak Hadir' | 'Ragu-ragu' = 
            rawStatus.toLowerCase().includes('tidak') ? 'Tidak Hadir' : 
            rawStatus.toLowerCase().includes('ragu') ? 'Ragu-ragu' : 'Hadir';

          const guestsCount = parseInt(String(findValue(['jumlah tamu', 'jumlah_tamu', 'guests', 'jumlah'])) || '1', 10) || 1;
          const message = String(findValue(['ucapan & doa', 'ucapan', 'wishes', 'message', 'doa restu', 'ucapan atau doa restu']) || '').trim();
          
          const rawTime = findValue(['tanggal submit', 'tanggal_submit', 'timestamp', 'tanggal']);
          let timestamp = 'Baru saja';
          if (rawTime) {
            timestamp = String(rawTime);
          }

          const id = `sheet-${index}-${Date.now()}`;

          if (message) {
            parsedWishes.push({
              id: 'w-' + id,
              name,
              status,
              message,
              timestamp,
              likes: 0
            });
          }

          parsedRsvps.push({
            id: 'r-' + id,
            name,
            status,
            guestsCount,
            wishes: message,
            timestamp
          });
        });

        parsedWishes.reverse();
        parsedRsvps.reverse();

        if (parsedWishes.length > 0) {
          setWishes(parsedWishes);
          localStorage.setItem('wedding_wishes_key', JSON.stringify(parsedWishes));
        }
        
        if (parsedRsvps.length > 0) {
          setRsvps(parsedRsvps);
          localStorage.setItem('wedding_rsvps_key', JSON.stringify(parsedRsvps));
        }
      }
    } catch (err) {
      console.error('Failed to fetch RSVPs from Google Sheets:', err);
    }
  };

  const fetchWeddingData = async () => {
    if (!readApiUrl) {
      setApiError('URL API Membaca Data kosong.');
      return;
    }
    setApiLoading(true);
    setApiError(null);
    try {
      const response = await fetch(readApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (json.status === 'success' && json.data && json.data.length > 0) {
        const d = json.data[0];
        
        // Map groom
        if (d["nama pengantin pria"]) {
          const full = d["nama pengantin pria"];
          setGroomFull(full);
          const short = full.split(' ')[0] || full;
          setGroom(short);
        }
        
        // Map bride
        if (d["nama pengantin wanita"]) {
          const full = d["nama pengantin wanita"];
          setBrideFull(full);
          const short = full.split(' ')[0] || full;
          setBride(short);
        }
        
        // Map parents
        if (d["Nama ortu pengantin pria "]) {
          setGroomParents(d["Nama ortu pengantin pria "]);
        }
        if (d["nama ortu pengantin wanita"]) {
          setBrideParents(d["nama ortu pengantin wanita"]);
        }
        
        // Map location
        if (d["Lokasi pesta"]) {
          setLocationName(d["Lokasi pesta"]);
        }
        
        // Map date & time: "25/07/2026 : 10:00 wib"
        if (d["Tanggal pesta"]) {
          const raw = d["Tanggal pesta"];
          
          // Match date format DD/MM/YYYY
          const dateMatch = raw.match(/(\d{2})\/(\d{2})\/(\d{4})/);
          if (dateMatch) {
            const day = dateMatch[1];
            const month = dateMatch[2];
            const year = dateMatch[3];
            setDate(`${year}-${month}-${day}`); // ISO YYYY-MM-DD
          }
          
          // Match time format HH:MM
          const timeMatch = raw.match(/(\d{2}):(\d{2})/);
          if (timeMatch) {
            setTime(`${timeMatch[1]}:${timeMatch[2]}`);
          }
          
          // Match timezone
          if (raw.toLowerCase().includes('wib')) {
            setTimezone('WIB');
          } else if (raw.toLowerCase().includes('wita')) {
            setTimezone('WITA');
          } else if (raw.toLowerCase().includes('wit')) {
            setTimezone('WIT');
          }
        }
        
        setApiSuccessMessage('Data pernikahan berhasil disinkronkan langsung dari Google Sheets!');
        setTimeout(() => setApiSuccessMessage(null), 5000);
      } else {
        throw new Error('Format data tidak valid dari server.');
      }
    } catch (err: any) {
      console.error('Failed to fetch wedding data:', err);
      setApiError('Gagal mengunduh data otomatis: ' + err.message);
    } finally {
      setApiLoading(false);
    }
  };

  // --- PARSE INITIAL PARAMETERS ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam) {
      setGuestName(toParam);
      setFormName(toParam);
    }

    // Prioritize URL query parameters if they are explicitly passed, otherwise fetch from Google Apps Script
    const hasOverride = params.get('groom') || params.get('bride') || params.get('date');
    if (!hasOverride) {
      fetchWeddingData();
    } else {
      if (params.get('groom')) setGroom(params.get('groom')!);
      if (params.get('bride')) setBride(params.get('bride')!);
      if (params.get('groomFull')) setGroomFull(params.get('groomFull')!);
      if (params.get('brideFull')) setBrideFull(params.get('brideFull')!);
      if (params.get('groomParents')) setGroomParents(params.get('groomParents')!);
      if (params.get('brideParents')) setBrideParents(params.get('brideParents')!);
      if (params.get('date')) setDate(params.get('date')!);
      if (params.get('time')) setTime(params.get('time')!);
      if (params.get('timezone')) setTimezone(params.get('timezone')!);
      if (params.get('locationName')) setLocationName(params.get('locationName')!);
      if (params.get('locationAddress')) setLocationAddress(params.get('locationAddress')!);
      if (params.get('mapsUrl')) setMapsUrl(params.get('mapsUrl')!);
      if (params.get('bgPhoto')) setBgPhoto(params.get('bgPhoto')!);
      if (params.get('song')) setSongPresetKey(params.get('song')!);
      if (params.get('customSong')) setCustomSongUrl(params.get('customSong')!);
      if (params.get('quote')) setQuote(params.get('quote')!);
      
      if (params.get('bank1')) setBank1Name(params.get('bank1')!);
      if (params.get('norek1')) setBank1Number(params.get('norek1')!);
      if (params.get('an1')) setBank1Holder(params.get('an1')!);
      if (params.get('bank2')) setBank2Name(params.get('bank2')!);
      if (params.get('norek2')) setBank2Number(params.get('norek2')!);
      if (params.get('an2')) setBank2Holder(params.get('an2')!);
    }

    // Load customizer initial open/close state based on if they are visiting a guest link
    if (toParam) {
      setIsCustomizerOpen(false); // Guest mode: close the editor sidebar
    }
  }, []);

  // --- LOCAL STORAGE DATA LOAD ---
  useEffect(() => {
    // Load Wishes
    const savedWishes = localStorage.getItem('wedding_wishes_key');
    if (savedWishes) {
      try {
        setWishes(JSON.parse(savedWishes));
      } catch (e) {
        setWishes(DEFAULT_WISHES);
      }
    } else {
      setWishes(DEFAULT_WISHES);
      localStorage.setItem('wedding_wishes_key', JSON.stringify(DEFAULT_WISHES));
    }

    // Load RSVPs
    const savedRsvps = localStorage.getItem('wedding_rsvps_key');
    if (savedRsvps) {
      try {
        setRsvps(JSON.parse(savedRsvps));
      } catch (e) {}
    }

    // Live background sync from Google Sheets
    fetchRsvpsAndWishes();
  }, []);

  // --- RE-CALCULATE LIVE GUEST LINK ---
  useEffect(() => {
    const params = new URLSearchParams();
    if (customGuestInput) params.set('to', customGuestInput);
    params.set('groom', groom);
    params.set('bride', bride);
    params.set('groomFull', groomFull);
    params.set('brideFull', brideFull);
    params.set('groomParents', groomParents);
    params.set('brideParents', brideParents);
    params.set('date', date);
    params.set('time', time);
    params.set('timezone', timezone);
    params.set('locationName', locationName);
    params.set('locationAddress', locationAddress);
    params.set('mapsUrl', mapsUrl);
    params.set('bgPhoto', bgPhoto);
    params.set('quote', quote);
    params.set('song', songPresetKey);
    if (customSongUrl) params.set('customSong', customSongUrl);
    
    params.set('bank1', bank1Name);
    params.set('norek1', bank1Number);
    params.set('an1', bank1Holder);
    params.set('bank2', bank2Name);
    params.set('norek2', bank2Number);
    params.set('an2', bank2Holder);

    const baseUrl = window.location.origin + window.location.pathname;
    setGeneratedLink(`${baseUrl}?${params.toString()}`);
  }, [
    customGuestInput, groom, bride, groomFull, brideFull, groomParents, brideParents,
    date, time, timezone, locationName, locationAddress, mapsUrl, bgPhoto, quote,
    songPresetKey, customSongUrl, bank1Name, bank1Number, bank1Holder, bank2Name,
    bank2Number, bank2Holder
  ]);

  // --- AUDIO LOGIC ---
  const getCurrentSongUrl = () => {
    if (customSongUrl) return customSongUrl;
    const found = SONG_PRESETS.find(s => s.id === songPresetKey);
    return found ? found.url : SONG_PRESETS[0].url;
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error('Audio play failed:', err);
      });
    }
  };

  // Trigger audio on entering invitation from Cover
  const handleOpenInvitation = () => {
    setHasCover(false);
    // Give browser brief window to register user click, then trigger play
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('Auto play blocked or failed. User can play manually.', err);
        });
      }
    }, 150);
  };

  // Change song src dynamically
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.src = getCurrentSongUrl();
      if (wasPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [songPresetKey, customSongUrl]);

  // --- UTILS ---
  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedText(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const formatDateIndonesian = (dateStr: string) => {
    const fallback = {
      dayName: 'Sabtu',
      fullDate: '25 Juli 2026',
      dayNum: 25,
      monthName: 'Juli',
      year: 2026
    };
    if (!dateStr) return fallback;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return fallback;
    
    try {
      const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      if (isNaN(dateObj.getTime())) return fallback;
      
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      
      const dayName = days[dateObj.getDay()];
      const dayNum = dateObj.getDate();
      const monthName = months[dateObj.getMonth()];
      const year = dateObj.getFullYear();
      
      return {
        dayName,
        fullDate: `${dayNum} ${monthName} ${year}`,
        dayNum,
        monthName,
        year
      };
    } catch (e) {
      return fallback;
    }
  };

  const getGoogleCalendarUrl = () => {
    try {
      const [y, m, d] = date.split('-');
      const [h, min] = time.split(':');
      // Set to UTC+7 (Jakarta) equivalent
      const eventDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d), parseInt(h), parseInt(min));
      const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours later
      
      const formatTime = (dt: Date) => {
        return dt.toISOString().replace(/-|:|\.\d\d\d/g, "");
      };
      
      const title = encodeURIComponent(`The Wedding of ${groom} & ${bride}`);
      const details = encodeURIComponent(`Mengharap doa restu Anda dalam acara pernikahan kami:\n\nPengantin: ${groomFull} & ${brideFull}\nWaktu: ${time} ${timezone}\nTempat: ${locationName}\n\nTerima kasih!`);
      const locationStr = encodeURIComponent(`${locationName}, ${locationAddress}`);
      const dates = `${formatTime(eventDate)}/${formatTime(endDate)}`;
      
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${locationStr}&sf=true&output=xml`;
    } catch (e) {
      return '#';
    }
  };

  // --- FORM RSVP SUBMIT ---
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Silakan masukkan nama Anda.');
      return;
    }

    setRsvpSending(true);
    setRsvpSendError(null);

    const messageContent = formMessage.trim() || 'Selamat untuk Aditiya & Kirana!';

    const newWish: Wish = {
      id: 'w-user-' + Date.now(),
      name: formName,
      status: formStatus,
      message: messageContent,
      timestamp: 'Baru saja',
      likes: 0
    };

    const newRsvp: RSVPRecord = {
      id: 'r-user-' + Date.now(),
      name: formName,
      status: formStatus,
      guestsCount: formGuests,
      wishes: messageContent,
      timestamp: new Date().toLocaleString('id-ID')
    };

    // Update local wishes list first so it appears immediately on-screen
    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('wedding_wishes_key', JSON.stringify(updatedWishes));

    // Update RSVP records list locally
    const updatedRsvps = [newRsvp, ...rsvps];
    setRsvps(updatedRsvps);
    localStorage.setItem('wedding_rsvps_key', JSON.stringify(updatedRsvps));

    // Build query parameters for Google Apps Script Web App
    const params = new URLSearchParams();
    params.set('nama', formName);
    params.set('kehadiran', formStatus);
    params.set('jumlah_tamu', String(formGuests));
    params.set('ucapan', messageContent);
    // English compatibility params just in case their script expects them
    params.set('name', formName);
    params.set('status', formStatus);
    params.set('guests', String(formGuests));
    params.set('message', messageContent);

    const sheetApiUrl = writeApiUrl ? `${writeApiUrl}${writeApiUrl.includes('?') ? '&' : '?'}${params.toString()}` : '';

    try {
      if (sheetApiUrl) {
        // Use no-cors mode as Apps Script returns standard 302 redirects which trigger preflight issues in standard mode
        await fetch(sheetApiUrl, {
          method: 'GET',
          mode: 'no-cors',
        });
        setRsvpFeedback('Terima kasih! Konfirmasi kehadiran Anda telah dikirim dan tersimpan dengan indah di Google Sheets.');
      } else {
        setRsvpFeedback('Terima kasih! RSVP Anda telah disimpan secara lokal (URL API Menyimpan RSVP belum diatur).');
      }
      setFormMessage('');
      // Refresh the list of RSVPs/wishes from Google Sheets after a short delay
      setTimeout(() => {
        fetchRsvpsAndWishes();
      }, 1500);
    } catch (err: any) {
      console.error('Failed to submit RSVP to Apps Script:', err);
      setRsvpSendError('Gagal mengirim ke Google Sheets secara langsung, tetapi data tersimpan secara lokal.');
      setRsvpFeedback('Terima kasih! RSVP Anda telah disimpan secara lokal.');
    } finally {
      setRsvpSending(false);
      setTimeout(() => {
        setRsvpFeedback(null);
        setRsvpSendError(null);
      }, 5000);
    }
  };

  const handleLikeWish = (wishId: string) => {
    const updated = wishes.map(w => {
      if (w.id === wishId) {
        return { ...w, likes: w.likes + 1 };
      }
      return w;
    });
    setWishes(updated);
    localStorage.setItem('wedding_wishes_key', JSON.stringify(updated));
  };

  const handleResetRSVPs = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset semua data RSVP dan komentar uji coba?')) {
      setWishes(DEFAULT_WISHES);
      setRsvps([]);
      localStorage.setItem('wedding_wishes_key', JSON.stringify(DEFAULT_WISHES));
      localStorage.removeItem('wedding_rsvps_key');
    }
  };

  const dateDetails = formatDateIndonesian(date);

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col lg:flex-row relative overflow-x-hidden antialiased text-[#2d2d2d]" id="app-root">
      
      {/* Hidden background music player */}
      <audio 
        ref={audioRef} 
        loop 
        className="hidden"
        src={getCurrentSongUrl()}
      />

      {/* ==========================================
          GATEWAY COVER (FULLSCREEN OVERLAY)
          ========================================== */}
      {hasCover && (
        <div 
          id="invitation-cover"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 text-center transition-all duration-700 bg-[#fdfbf7]"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(253, 251, 247, 0.94), rgba(244, 241, 234, 0.98)), url(${bgPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Decorative frame elements */}
          <div className="absolute inset-8 border border-[#e5e1da] rounded-[2.5rem] pointer-events-none hidden md:block"></div>
          <div className="absolute inset-10 border border-[#c5a059]/20 rounded-[2.2rem] pointer-events-none hidden md:block"></div>

          <div className="max-w-xl px-6 py-12 rounded-[2.5rem] bg-white/60 backdrop-blur-md border border-white/80 shadow-2xl relative">
            <span className="font-cursive text-5xl text-[#c5a059] block mb-2">The Wedding of</span>
            <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-[#4a5d4e] tracking-wide font-bold mb-8">
              {groom} <span className="text-[#c5a059]">&</span> {bride}
            </h1>

            <div className="w-12 h-px bg-[#c5a059] mx-auto mb-8"></div>

            <p className="text-xs uppercase tracking-widest text-[#8a8a8a] mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <div className="inline-block px-6 py-3 bg-[#f4f1ea] border border-[#e5e1da] rounded-2xl mb-8">
              <h2 className="font-serif italic text-2xl text-[#4a5d4e] font-semibold">{guestName}</h2>
            </div>
            
            <p className="text-xs text-[#5a6356] leading-relaxed max-w-sm mx-auto mb-10">
              Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di hari bahagia pernikahan kami.
            </p>

            <button
              onClick={handleOpenInvitation}
              id="btn-open-invitation"
              className="px-8 py-4 bg-[#4a5d4e] hover:bg-[#3e4d41] active:scale-95 text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all shadow-lg flex items-center justify-center gap-3 mx-auto cursor-pointer"
            >
              <Music className="w-4 h-4 animate-bounce" />
              Buka Undangan
            </button>
          </div>
        </div>
      )}


      {/* ==========================================
          LEFT COLLAPSIBLE CUSTOMIZER DRAWER
          ========================================== */}
      <div 
        id="customizer-panel"
        className={`bg-white border-r border-[#e5e1da] flex-shrink-0 transition-all duration-300 z-30 ${
          isCustomizerOpen ? 'w-full lg:w-[410px]' : 'w-0 overflow-hidden border-r-0 lg:w-0'
        }`}
      >
        <div className="h-full flex flex-col max-h-screen overflow-y-auto w-full lg:w-[410px]">
          
          {/* Header Panel */}
          <div className="p-6 border-b border-[#e5e1da] sticky top-0 bg-white z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#c5a059]/10 flex items-center justify-center">
                <Settings className="w-4 h-4 text-[#c5a059]" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight">Kustomisasi Undangan</h3>
                <p className="text-[10px] text-[#8a8a8a] uppercase tracking-widest">Ubah Detil Live Secara Realtime</p>
              </div>
            </div>
            <button 
              onClick={() => setIsCustomizerOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-[#fafafa] text-[#8a8a8a]"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="p-6 space-y-6">
            
            {/* Google Sheets Live Database Connection */}
            <div className="bg-[#4a5d4e]/5 p-5 rounded-3xl border border-[#4a5d4e]/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#4a5d4e] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" /> Google Sheets Cloud API
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${
                  apiLoading ? 'bg-amber-100 text-amber-800 animate-pulse' :
                  apiError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {apiLoading ? 'Menghubungkan' : apiError ? 'Gagal' : 'Tersinkron'}
                </span>
              </div>

              <p className="text-[10px] text-[#5a6356] leading-normal">
                Koneksi dua-arah langsung dengan Spreadsheet Anda untuk memuat data pengantin secara dinamis dan merekam RSVP tamu secara real-time.
              </p>

              {/* Dynamic Inputs for API URLs */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[9px] font-bold text-[#4a5d4e] uppercase mb-1 flex items-center gap-1">
                    <span>1. URL API Membaca Data</span>
                    <span className="text-gray-400 font-normal lowercase">(GET)</span>
                  </label>
                  <input 
                    type="text" 
                    value={readApiUrl} 
                    onChange={(e) => updateReadApiUrl(e.target.value)}
                    placeholder="https://script.google.com/.../exec"
                    className="w-full text-[10px] px-2.5 py-1.5 bg-white border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059] font-mono text-gray-600 truncate"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-[#4a5d4e] uppercase mb-1 flex items-center gap-1">
                    <span>2. URL API Menyimpan RSVP</span>
                    <span className="text-gray-400 font-normal lowercase">(GET/POST)</span>
                  </label>
                  <input 
                    type="text" 
                    value={writeApiUrl} 
                    onChange={(e) => updateWriteApiUrl(e.target.value)}
                    placeholder="https://script.google.com/.../exec"
                    className="w-full text-[10px] px-2.5 py-1.5 bg-white border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059] font-mono text-gray-600 truncate"
                  />
                </div>
              </div>

              {apiLoading && (
                <div className="py-2 flex items-center justify-center gap-2 text-[10px] text-[#4a5d4e] bg-white/50 rounded-xl border border-dashed border-[#4a5d4e]/20">
                  <div className="w-3.5 h-3.5 border-2 border-[#4a5d4e] border-t-transparent rounded-full animate-spin"></div>
                  <span>Memuat data dari Google Sheets...</span>
                </div>
              )}

              {apiSuccessMessage && (
                <div className="p-2.5 bg-green-50 text-green-800 text-[10px] rounded-xl border border-green-200 font-medium animate-fadeIn">
                  {apiSuccessMessage}
                </div>
              )}

              {apiError && (
                <div className="p-2.5 bg-red-50 text-red-800 text-[10px] rounded-xl border border-red-200 animate-fadeIn">
                  {apiError}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    await fetchWeddingData();
                    await fetchRsvpsAndWishes();
                  }}
                  disabled={apiLoading}
                  className="flex-1 py-2 bg-[#4a5d4e] hover:bg-[#3e4d41] disabled:opacity-50 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Clock className={`w-3 h-3 ${apiLoading ? 'animate-spin' : ''}`} />
                  {apiLoading ? 'Sinkron...' : 'Tarik Data'}
                </button>

                <button
                  onClick={() => setIsGuideOpen(!isGuideOpen)}
                  className="px-3 py-2 bg-[#c5a059]/10 hover:bg-[#c5a059]/20 text-[#c5a059] rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  title="Lihat Panduan Integrasi Google Sheets"
                >
                  <FileText className="w-3 h-3" />
                  <span>{isGuideOpen ? 'Tutup Kode' : 'Panduan'}</span>
                </button>
              </div>

              {/* Expandable Apps Script Guide */}
              {isGuideOpen && (
                <div className="bg-white p-3.5 rounded-2xl border border-[#e5e1da] space-y-3 animate-slideDown">
                  <div className="flex items-center justify-between border-b border-[#f4f1ea] pb-2">
                    <span className="text-[9px] font-bold text-gray-700 uppercase">Kode Google Apps Script</span>
                    <button
                      onClick={() => {
                        const code = `function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return createJsonResponse({
        "status": "error",
        "message": "Script ini harus dibuat melalui menu 'Ekstensi > Apps Script' di dalam Google Sheets Anda agar saling terhubung."
      });
    }
    
    // Pastikan sheet RSVP_Tamu ada
    var sheet = ss.getSheetByName("RSVP_Tamu");
    if (!sheet) {
      sheet = ss.insertSheet("RSVP_Tamu");
      sheet.appendRow(["Tanggal Submit", "Nama Tamu", "Kehadiran", "Jumlah Tamu", "Ucapan & Doa"]);
    }

    // Jika ada parameter nama/kehadiran atau name/status, simpan RSVP
    if (e && e.parameter && (e.parameter.nama || e.parameter.name || e.parameter.kehadiran || e.parameter.status)) {
      return simpanRsvp(e.parameter);
    }

    // Jika tidak ada parameter rsvp, kembalikan daftar ucapan/RSVP dari Google Sheets
    var data = [];
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    
    if (lastRow > 1 && lastCol > 0) {
      var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      var rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
      
      for (var r = 0; r < rows.length; r++) {
        var rowData = {};
        for (var c = 0; c < headers.length; c++) {
          var headerName = headers[c] ? headers[c].toString().toLowerCase().trim() : ("column_" + c);
          rowData[headerName] = rows[r][c];
        }
        data.push(rowData);
      }
    }

    return createJsonResponse({
      "status": "success",
      "data": data
    });
    
  } catch(err) {
    return createJsonResponse({
      "status": "error",
      "message": "Terjadi kesalahan: " + err.toString()
    });
  }
}

function doPost(e) {
  var params = {};
  if (e && e.postData && e.postData.contents) {
    try {
      params = JSON.parse(e.postData.contents);
    } catch(err) {
      params = e.parameter;
    }
  } else if (e) {
    params = e.parameter;
  }
  return simpanRsvp(params);
}

function simpanRsvp(p) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Google Spreadsheet tidak aktif atau script dibuat sebagai standalone.");
    }
    
    var sheet = ss.getSheetByName("RSVP_Tamu");
    if (!sheet) {
      sheet = ss.insertSheet("RSVP_Tamu");
      sheet.appendRow(["Tanggal Submit", "Nama Tamu", "Kehadiran", "Jumlah Tamu", "Ucapan & Doa"]);
    }
    
    var nama = p.nama || p.name || "Anonim";
    var kehadiran = p.kehadiran || p.status || "Hadir";
    var jumlahTamu = p.jumlah_tamu || p.guests || "1";
    var ucapan = p.ucapan || p.message || "";
    var timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    
    sheet.appendRow([timestamp, nama, kehadiran, jumlahTamu, ucapan]);
    
    return createJsonResponse({
      "status": "success",
      "message": "RSVP berhasil disimpan secara otomatis ke Google Sheets!"
    });
  } catch(err) {
    return createJsonResponse({
      "status": "error",
      "message": "Gagal menyimpan ke Google Sheets: " + err.toString()
    });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}`;
                        navigator.clipboard.writeText(code);
                        setCopiedText(prev => ({ ...prev, appsscript: true }));
                        setTimeout(() => setCopiedText(prev => ({ ...prev, appsscript: false })), 2000);
                      }}
                      className="px-2 py-1 bg-[#4a5d4e] text-white hover:bg-[#3e4d41] rounded-lg text-[8px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {copiedText['appsscript'] ? 'Tersalin!' : 'Salin Kode'}
                    </button>
                  </div>
                  
                  <div className="text-[9px] text-gray-600 space-y-1.5 leading-relaxed">
                    <p className="font-semibold text-gray-800">Langkah-langkah:</p>
                    <ol className="list-decimal pl-3 space-y-1">
                      <li>Buka Google Spreadsheet Anda.</li>
                      <li>Pilih menu <strong className="text-gray-800">Ekstensi &gt; Apps Script</strong>.</li>
                      <li>Hapus semua kode bawaan lalu paste kode yang disalin di atas.</li>
                      <li>Klik ikon <strong className="text-gray-800">Simpan</strong> (floppy disk).</li>
                      <li>Klik tombol <strong className="text-gray-800">Terapkan &gt; Penerapan Baru</strong>.</li>
                      <li>Pilih jenis <strong className="text-gray-800">Aplikasi Web</strong>.</li>
                      <li>Ubah akses ke <strong className="text-gray-800">"Siapa saja"</strong> (Anyone), lalu klik Terapkan.</li>
                      <li>Salin URL Aplikasi Web yang diberikan ke kolom URL di atas!</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {/* Groom Details */}
            <div className="space-y-3 bg-[#fafafa] p-4 rounded-2xl border border-[#e5e1da]/60">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-1.5">
                <Heart className="w-3 h-3 fill-current" /> Detail Mempelai Pria
              </span>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Nama Panggilan Pria</label>
                <input 
                  type="text" 
                  value={groom} 
                  onChange={(e) => setGroom(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Nama Lengkap & Gelar</label>
                <input 
                  type="text" 
                  value={groomFull} 
                  onChange={(e) => setGroomFull(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Nama Orang Tua</label>
                <input 
                  type="text" 
                  value={groomParents} 
                  onChange={(e) => setGroomParents(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>
            </div>

            {/* Bride Details */}
            <div className="space-y-3 bg-[#fafafa] p-4 rounded-2xl border border-[#e5e1da]/60">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-1.5">
                <Heart className="w-3 h-3 fill-current" /> Detail Mempelai Wanita
              </span>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Nama Panggilan Wanita</label>
                <input 
                  type="text" 
                  value={bride} 
                  onChange={(e) => setBride(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Nama Lengkap & Gelar</label>
                <input 
                  type="text" 
                  value={brideFull} 
                  onChange={(e) => setBrideFull(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Nama Orang Tua</label>
                <input 
                  type="text" 
                  value={brideParents} 
                  onChange={(e) => setBrideParents(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>
            </div>

            {/* Quotes & Story */}
            <div className="space-y-3 bg-[#fafafa] p-4 rounded-2xl border border-[#e5e1da]/60">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#4a5d4e] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Kutipan Cinta (Quote)
              </span>
              <div>
                <textarea 
                  rows={2}
                  value={quote} 
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4a5d4e] resize-none"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-3 bg-[#fafafa] p-4 rounded-2xl border border-[#e5e1da]/60">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#4a5d4e] flex items-center gap-1.5">
                <CalendarIcon className="w-3 h-3" /> Waktu Acara
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Tanggal</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Jam Mulai</label>
                  <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Zona Waktu</label>
                <select 
                  value={timezone} 
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl bg-white"
                >
                  <option value="WIB">WIB (Waktu Indonesia Barat)</option>
                  <option value="WITA">WITA (Waktu Indonesia Tengah)</option>
                  <option value="WIT">WIT (Waktu Indonesia Timur)</option>
                </select>
              </div>
            </div>

            {/* Location & Navigation */}
            <div className="space-y-3 bg-[#fafafa] p-4 rounded-2xl border border-[#e5e1da]/60">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#4a5d4e] flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> Lokasi Resepsi
              </span>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Nama Tempat</label>
                <input 
                  type="text" 
                  value={locationName} 
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Alamat Lengkap</label>
                <textarea 
                  rows={2}
                  value={locationAddress} 
                  onChange={(e) => setLocationAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Link Google Maps</label>
                <input 
                  type="text" 
                  value={mapsUrl} 
                  onChange={(e) => setMapsUrl(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Custom Background Photo Selection */}
            <div className="space-y-3 bg-[#fafafa] p-4 rounded-2xl border border-[#e5e1da]/60">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-1.5">
                <Eye className="w-3 h-3" /> Desain Foto Latar
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PHOTO_PRESETS.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setBgPhoto(photo.url)}
                    className={`p-1.5 rounded-xl border text-left transition-all ${
                      bgPhoto === photo.url ? 'border-[#c5a059] bg-[#c5a059]/5' : 'border-[#e5e1da] bg-white'
                    }`}
                  >
                    <img 
                      src={photo.url} 
                      alt={photo.name} 
                      className="w-full h-16 object-cover rounded-lg mb-1" 
                    />
                    <span className="block text-[9px] font-semibold text-center text-[#5a6356] truncate">{photo.name}</span>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase mb-1">Atau Gunakan URL Foto Custom</label>
                <input 
                  type="text" 
                  placeholder="https://example.com/couple.jpg"
                  value={bgPhoto.startsWith('http') && !PHOTO_PRESETS.find(p=>p.url === bgPhoto) ? bgPhoto : ''}
                  onChange={(e) => {
                    if (e.target.value.trim()) {
                      setBgPhoto(e.target.value.trim());
                    }
                  }}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Favorite Song Customizer */}
            <div className="space-y-3 bg-[#fafafa] p-4 rounded-2xl border border-[#e5e1da]/60">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-1.5">
                <Music className="w-3 h-3" /> Lagu Latar Belakang
              </span>
              <div className="space-y-1.5">
                {SONG_PRESETS.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => {
                      setSongPresetKey(song.id);
                      setCustomSongUrl('');
                    }}
                    className={`w-full text-left text-xs px-3 py-2 rounded-xl border flex items-center justify-between transition-all ${
                      songPresetKey === song.id && !customSongUrl ? 'border-[#c5a059] bg-[#c5a059]/5 font-semibold text-[#c5a059]' : 'border-[#e5e1da] bg-white'
                    }`}
                  >
                    <span>{song.name}</span>
                    <Play className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[10px] font-bold text-[#8a8a8a] uppercase">Atau URL MP3 Mandiri</label>
                  <button
                    type="button"
                    onClick={() => setIsMusicGuideOpen(!isMusicGuideOpen)}
                    className="text-[9px] text-[#c5a059] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3 h-3" />
                    <span>{isMusicGuideOpen ? 'Sembunyikan Panduan' : 'Cara & Link Musik'}</span>
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="https://domain.com/music.mp3"
                  value={customSongUrl}
                  onChange={(e) => {
                    setCustomSongUrl(e.target.value);
                  }}
                  className="w-full text-xs px-3 py-2 border border-[#e5e1da] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>

              {/* Expandable Music Guide */}
              {isMusicGuideOpen && (
                <div className="bg-white p-3.5 rounded-2xl border border-[#e5e1da] space-y-3 animate-slideDown mt-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#4a5d4e] block border-b border-[#f4f1ea] pb-1.5">
                    🎵 Panduan & Rekomendasi Link Musik
                  </span>

                  <div className="text-[9.5px] text-gray-600 space-y-2 leading-relaxed">
                    <p>
                      Untuk mengganti musik latar belakang undangan dengan lagu pilihan Anda sendiri, Anda membutuhkan sebuah <strong>Tautan MP3 Langsung (Direct Link)</strong>.
                    </p>

                    <div className="bg-[#4a5d4e]/5 p-2.5 rounded-xl border border-[#4a5d4e]/10 space-y-1">
                      <p className="font-bold text-gray-800">💡 Cara Menggunakan Google Drive:</p>
                      <ol className="list-decimal pl-3 space-y-0.5 text-[9px]">
                        <li>Unggah file MP3 Anda ke Google Drive.</li>
                        <li>Ubah setelan berbagi menjadi <strong>"Siapa saja yang memiliki link dapat melihat"</strong>.</li>
                        <li>Salin link bagikannya, lalu ambil ID file uniknya (kode panjang di tengah link).</li>
                        <li>Gunakan format tautan langsung ini:<br/>
                          <code className="bg-white px-1 py-0.5 rounded border text-[8px] font-mono break-all inline-block mt-1">
                            https://docs.google.com/uc?export=download&id=ID_FILE_ANDA
                          </code>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-[#4a5d4e]/5 p-2.5 rounded-xl border border-[#4a5d4e]/10 space-y-1">
                      <p className="font-bold text-gray-800">💡 Cara Menggunakan Dropbox:</p>
                      <ol className="list-decimal pl-3 space-y-0.5 text-[9px]">
                        <li>Unggah file MP3 Anda ke Dropbox.</li>
                        <li>Salin link bagikannya (contoh: <code className="text-[8px] font-mono">.../s/xyz/lagu.mp3?dl=0</code>).</li>
                        <li>Ganti ujung tautan <code className="text-[8px] font-mono font-bold text-[#c5a059]">?dl=0</code> menjadi <code className="text-[8px] font-mono font-bold text-green-700">?dl=1</code> atau <code className="text-[8px] font-mono font-bold text-green-700">&raw=1</code>.</li>
                        <li>Tempelkan link yang telah diubah tersebut ke kolom URL MP3 Mandiri di atas.</li>
                      </ol>
                    </div>

                    <div className="space-y-1.5">
                      <p className="font-bold text-gray-800">✨ Rekomendasi Link Musik Siap Pakai:</p>
                      <div className="grid grid-cols-1 gap-1.5">
                        <div className="flex items-center justify-between p-2 bg-[#fafafa] rounded-lg border border-[#e5e1da] text-[9px]">
                          <div>
                            <span className="font-bold block text-gray-700">Piano Klasik Romantis</span>
                            <span className="text-[8px] text-gray-400 font-mono block truncate max-w-[150px]">SoundHelix Song 2</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomSongUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
                              setSongPresetKey('');
                            }}
                            className="px-2 py-1 bg-[#c5a059] text-white hover:bg-[#b08d4b] rounded-lg font-bold text-[8px] uppercase tracking-wider cursor-pointer"
                          >
                            Gunakan
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-[#fafafa] rounded-lg border border-[#e5e1da] text-[9px]">
                          <div>
                            <span className="font-bold block text-gray-700">Gitar Akustik Menenangkan</span>
                            <span className="text-[8px] text-gray-400 font-mono block truncate max-w-[150px]">SoundHelix Song 4</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomSongUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3');
                              setSongPresetKey('');
                            }}
                            className="px-2 py-1 bg-[#c5a059] text-white hover:bg-[#b08d4b] rounded-lg font-bold text-[8px] uppercase tracking-wider cursor-pointer"
                          >
                            Gunakan
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-[#fafafa] rounded-lg border border-[#e5e1da] text-[9px]">
                          <div>
                            <span className="font-bold block text-gray-700">Biola Romantis & Syahdu</span>
                            <span className="text-[8px] text-gray-400 font-mono block truncate max-w-[150px]">SoundHelix Song 8</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomSongUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
                              setSongPresetKey('');
                            }}
                            className="px-2 py-1 bg-[#c5a059] text-white hover:bg-[#b08d4b] rounded-lg font-bold text-[8px] uppercase tracking-wider cursor-pointer"
                          >
                            Gunakan
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-[#fafafa] rounded-lg border border-[#e5e1da] text-[9px]">
                          <div>
                            <span className="font-bold block text-gray-700">Sinfoni Klasik Agung</span>
                            <span className="text-[8px] text-gray-400 font-mono block truncate max-w-[150px]">SoundHelix Song 10</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomSongUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3');
                              setSongPresetKey('');
                            }}
                            className="px-2 py-1 bg-[#c5a059] text-white hover:bg-[#b08d4b] rounded-lg font-bold text-[8px] uppercase tracking-wider cursor-pointer"
                          >
                            Gunakan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Kado Digital (Gifts Registry) */}
            <div className="space-y-3 bg-[#fafafa] p-4 rounded-2xl border border-[#e5e1da]/60">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-1.5">
                <Gift className="w-3 h-3" /> Integrasi Rekening Kado
              </span>
              
              {/* Bank 1 */}
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-[#8a8a8a] uppercase">Penerima 1 (Nama Bank)</label>
                <input 
                  type="text" 
                  value={bank1Name} 
                  onChange={(e) => setBank1Name(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 border border-[#e5e1da] rounded-xl focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <label className="block text-[8px] font-bold text-[#8a8a8a] uppercase">No Rekening 1</label>
                    <input 
                      type="text" 
                      value={bank1Number} 
                      onChange={(e) => setBank1Number(e.target.value)}
                      className="w-full text-xs px-2 py-1 border border-[#e5e1da] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-[#8a8a8a] uppercase">Nama Pemilik 1</label>
                    <input 
                      type="text" 
                      value={bank1Holder} 
                      onChange={(e) => setBank1Holder(e.target.value)}
                      className="w-full text-xs px-2 py-1 border border-[#e5e1da] rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Bank 2 */}
              <div className="space-y-1 pt-2 border-t border-[#e5e1da]/60">
                <label className="block text-[9px] font-bold text-[#8a8a8a] uppercase">Penerima 2 (Nama Bank)</label>
                <input 
                  type="text" 
                  value={bank2Name} 
                  onChange={(e) => setBank2Name(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 border border-[#e5e1da] rounded-xl focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <label className="block text-[8px] font-bold text-[#8a8a8a] uppercase">No Rekening 2</label>
                    <input 
                      type="text" 
                      value={bank2Number} 
                      onChange={(e) => setBank2Number(e.target.value)}
                      className="w-full text-xs px-2 py-1 border border-[#e5e1da] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-[#8a8a8a] uppercase">Nama Pemilik 2</label>
                    <input 
                      type="text" 
                      value={bank2Holder} 
                      onChange={(e) => setBank2Holder(e.target.value)}
                      className="w-full text-xs px-2 py-1 border border-[#e5e1da] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* --- LINK GENERATOR / SHARE --- */}
            <div className="space-y-3 bg-[#c5a059]/10 p-4 rounded-2xl border border-[#c5a059]/30">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Bagikan Undangan Personal
              </span>
              <p className="text-[10px] text-[#5a6356] leading-relaxed">
                Tulis nama calon tamu Anda di bawah untuk membuat tautan undangan khusus dengan nama mereka tertera di halaman muka.
              </p>
              <div>
                <label className="block text-[9px] font-bold text-[#c5a059] uppercase mb-1">Nama Tamu Undangan</label>
                <input 
                  type="text" 
                  placeholder="Misal: Bapak Joko Widodo"
                  value={customGuestInput}
                  onChange={(e) => setCustomGuestInput(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#c5a059]/30 bg-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>
              <button
                onClick={() => handleCopyText(generatedLink, 'guest-link')}
                className="w-full py-2.5 bg-[#c5a059] hover:bg-[#b08e4d] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
              >
                {copiedText['guest-link'] ? (
                  <>
                    <Check className="w-3 h-3" /> Berhasil Disalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Salin Link Undangan Tamu
                  </>
                )}
              </button>
            </div>

            {/* Simulated Admin Console */}
            <div className="bg-[#4a5d4e]/10 p-4 rounded-2xl border border-[#4a5d4e]/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#4a5d4e]">Admin Panel Tamu ({rsvps.length})</span>
                <button 
                  onClick={handleResetRSVPs}
                  className="text-[9px] font-semibold text-red-600 hover:underline flex items-center gap-0.5"
                >
                  <Trash2 className="w-2.5 h-2.5" /> Reset
                </button>
              </div>
              
              {rsvps.length === 0 ? (
                <p className="text-[9px] text-gray-500 italic">Belum ada RSVP baru dari tamu. Coba kirimkan formulir RSVP di sebelah kanan!</p>
              ) : (
                <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
                  {rsvps.map((r) => (
                    <div key={r.id} className="bg-white p-2 rounded-xl border border-gray-100 text-[10px] flex items-start justify-between">
                      <div>
                        <p className="font-bold">{r.name} <span className="font-normal text-gray-500">({r.guestsCount} org)</span></p>
                        <p className="text-gray-500 line-clamp-1">{r.wishes}</p>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                        r.status === 'Hadir' ? 'bg-green-100 text-green-800' :
                        r.status === 'Tidak Hadir' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Floating customize button for mobile */}
      <button 
        onClick={() => {
          setIsCustomizerOpen(!isCustomizerOpen);
          // If on cover page, open invitation first
          if (hasCover) setHasCover(false);
        }}
        id="btn-toggle-customizer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-[#c5a059] hover:bg-[#b08e4d] text-white rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2 cursor-pointer border border-white/20"
      >
        <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-xs font-bold uppercase tracking-widest pr-1">Kustomisasi</span>
      </button>


      {/* ==========================================
          RIGHT WORKSPACE (ACTUAL WEDDING INVITATION PREVIEW)
          ========================================== */}
      <div 
        id="invitation-preview"
        className="flex-1 min-h-screen py-6 md:py-12 px-4 md:px-8 flex flex-col justify-center items-center overflow-y-auto"
      >
        <div className="w-full max-w-5xl">
          
          {/* Top Info Banner for couple customization preview */}
          {isCustomizerOpen && (
            <div className="mb-6 bg-[#4a5d4e] text-white p-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border border-[#3e4d41]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Sparkles className="w-5 h-5 text-[#c5a059] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">Mode Editor Aktif</h4>
                  <p className="text-[11px] opacity-85">Gunakan panel kiri untuk merancang undangan impian Anda, lalu bagikan ke tamu!</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCustomizerOpen(false)}
                className="text-xs bg-white text-[#4a5d4e] px-4 py-2 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#f4f1ea] transition-all cursor-pointer shadow-sm"
              >
                Sembunyikan Panel
              </button>
            </div>
          )}

          {/* Invitation Container (Bento Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-max" id="bento-grid-container">
            
            {/* 1. HERO STORY CARD (col-span-4, large visual with couple names overlaid) */}
            <div 
              id="card-hero"
              className="md:col-span-4 md:row-span-2 min-h-[420px] md:min-h-[640px] rounded-[2.5rem] overflow-hidden border border-[#e5e1da] shadow-lg relative group bg-cover bg-center flex flex-col justify-end p-8"
              style={{ backgroundImage: `url(${bgPhoto})` }}
            >
              {/* Dark Gradient Overlay for optimal contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2720]/85 via-black/30 to-[#1e2720]/45 z-10"></div>
              
              <div className="absolute top-8 left-8 z-20 flex gap-1.5">
                <span className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md text-white text-[9px] uppercase tracking-widest rounded-full font-bold border border-white/10 flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 fill-white text-white animate-pulse" /> Official Invitation
                </span>
              </div>

              {/* Story Details overlay */}
              <div className="relative z-20 text-white space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Kisah Cinta Kami</p>
                
                <div>
                  <h3 className="font-serif text-3xl font-semibold italic text-white mb-2">
                    {groom} <span className="text-[#c5a059]">&</span> {bride}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#c5a059] mb-3"></div>
                  <p className="text-xs italic opacity-90 leading-relaxed font-serif">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-white/20 text-[10px] opacity-75 flex justify-between items-center">
                  <span>#TheWeddingOf{groom}{bride}</span>
                  <span>{dateDetails ? dateDetails.year : ''}</span>
                </div>
              </div>
            </div>

            {/* 2. MAIN TITLE CARD (col-span-8, wedding announcement and countdown) */}
            <div 
              id="card-title-header"
              className="md:col-span-8 bg-white rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between border border-[#e5e1da] shadow-sm relative overflow-hidden"
            >
              {/* Blur decorative background circles */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#f4f1ea] rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#c5a059]/10 rounded-full blur-2xl opacity-40"></div>

              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-[#c5a059] font-serif italic text-lg md:text-xl block mb-2">Maha Suci Allah, Kami Mengharap Doa Restu Anda</span>
                  <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a] font-bold mb-3">Pernikahan Suci Kami</p>
                  <h1 className="text-4xl md:text-6xl font-serif text-[#4a5d4e] font-bold tracking-tight mb-4">
                    {groom} <span className="text-[#c5a059] font-normal font-cursive text-5xl md:text-7xl">&</span> {bride}
                  </h1>
                </div>

                {/* Meet the Couple Detail (Indonesian standard) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#e5e1da]/60">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#4a5d4e]">{groomFull}</h3>
                    <p className="text-[10px] text-gray-500 leading-normal">{groomParents}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#4a5d4e]">{brideFull}</h3>
                    <p className="text-[10px] text-gray-500 leading-normal">{brideParents}</p>
                  </div>
                </div>

                {/* Date & Time indicators */}
                <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-6 border-t border-[#e5e1da]/60">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-[#8a8a8a] font-bold mb-1">Hari</span>
                    <span className="text-lg md:text-xl font-bold text-[#4a5d4e]">{dateDetails ? dateDetails.dayName : 'Sabtu'}</span>
                  </div>
                  <div className="w-px h-8 bg-[#e5e1da]"></div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-[#8a8a8a] font-bold mb-1">Tanggal</span>
                    <span className="text-lg md:text-xl font-bold text-[#4a5d4e]">{dateDetails ? dateDetails.fullDate : '25 Juli 2026'}</span>
                  </div>
                  <div className="w-px h-8 bg-[#e5e1da]"></div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-[#8a8a8a] font-bold mb-1">Waktu</span>
                    <span className="text-lg md:text-xl font-bold text-[#4a5d4e]">{time} {timezone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. RSVP CONFIRMATION CARD (col-span-4, interactive form) */}
            <div 
              id="card-rsvp"
              className="md:col-span-4 bg-[#4a5d4e] text-white rounded-[2.5rem] p-8 flex flex-col justify-between border border-[#3e4d41] shadow-md relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
                  </div>
                  <h4 className="text-xl font-serif italic">Konfirmasi Kehadiran</h4>
                </div>
                <p className="text-xs opacity-80 leading-relaxed mb-6">
                  Bantu kami mempersiapkan jamuan terbaik dengan mengonfirmasi kehadiran Anda di bawah.
                </p>

                {rsvpFeedback ? (
                  <div className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/10 text-center text-xs space-y-2 animate-fadeIn">
                    <Sparkles className="w-6 h-6 text-[#c5a059] mx-auto animate-bounce" />
                    <p className="font-semibold">{rsvpFeedback}</p>
                    {rsvpSendError && (
                      <p className="text-[10px] opacity-75 text-amber-200">{rsvpSendError}</p>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs text-left">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold opacity-75 mb-1">Nama Tamu</label>
                      <input 
                        type="text" 
                        required
                        disabled={rsvpSending}
                        placeholder="Nama Lengkap Anda"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 focus:border-[#c5a059] focus:outline-none rounded-xl px-3 py-2 text-white placeholder-white/50 disabled:opacity-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold opacity-75 mb-1">Status Kehadiran</label>
                        <select 
                          value={formStatus}
                          disabled={rsvpSending}
                          onChange={(e) => setFormStatus(e.target.value as any)}
                          className="w-full bg-white/10 border border-white/20 focus:border-[#c5a059] focus:outline-none rounded-xl px-2 py-2 text-white [&>option]:text-[#2d2d2d] disabled:opacity-50"
                        >
                          <option value="Hadir">Hadir</option>
                          <option value="Tidak Hadir">Tidak Hadir</option>
                          <option value="Ragu-ragu">Ragu-ragu</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold opacity-75 mb-1">Jumlah Orang</label>
                        <input 
                          type="number" 
                          min={1} 
                          max={10}
                          disabled={rsvpSending}
                          value={formGuests}
                          onChange={(e) => setFormGuests(parseInt(e.target.value) || 1)}
                          className="w-full bg-white/10 border border-white/20 focus:border-[#c5a059] focus:outline-none rounded-xl px-3 py-1.5 text-white disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold opacity-75 mb-1">Ucapan atau Doa Restu</label>
                      <textarea 
                        rows={2}
                        disabled={rsvpSending}
                        placeholder="Tulis ucapan selamat Anda di sini..."
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 focus:border-[#c5a059] focus:outline-none rounded-xl px-3 py-1.5 text-white placeholder-white/50 resize-none disabled:opacity-50"
                      />
                    </div>

                    {rsvpSendError && (
                      <p className="text-[10px] text-red-200 bg-red-900/40 p-2 rounded-lg border border-red-500/20">{rsvpSendError}</p>
                    )}

                    <button 
                      type="submit"
                      disabled={rsvpSending}
                      className="w-full bg-white hover:bg-[#f4f1ea] active:scale-95 disabled:opacity-75 text-[#4a5d4e] font-bold py-3 rounded-xl uppercase tracking-widest text-[10px] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      {rsvpSending ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-[#4a5d4e] border-t-transparent rounded-full animate-spin"></div>
                          <span>Mengirim RSVP...</span>
                        </>
                      ) : (
                        <span>Kirim RSVP & Ucapan</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* 4. LOCATION NAVIGATION CARD (col-span-4, details + google maps link) */}
            <div 
              id="card-location"
              className="md:col-span-4 bg-white rounded-[2.5rem] p-6 flex flex-col justify-between border border-[#e5e1da] shadow-sm relative overflow-hidden"
            >
              {/* Top Details */}
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#4a5d4e]">
                  <MapPin className="w-5 h-5 text-[#c5a059]" />
                  <h4 className="text-lg font-serif italic font-bold">Lokasi Acara</h4>
                </div>
                <h5 className="font-bold text-xs text-[#2d2d2d] mb-0.5">{locationName}</h5>
                <p className="text-[11px] text-[#8a8a8a] leading-relaxed mb-4">{locationAddress}</p>
              </div>

              {/* Simulated Map / Coordinates view */}
              <div className="flex-1 min-h-[140px] bg-[#f4f1ea] rounded-2xl flex flex-col items-center justify-center border border-[#e5e1da] relative overflow-hidden group">
                
                {/* Simulated Grid Grid Map graphic */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#4a5d4e_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Pulse visual centering */}
                <div className="relative z-10 text-center space-y-3 p-4">
                  <div className="w-10 h-10 bg-[#4a5d4e] rounded-full flex items-center justify-center mx-auto text-white shadow-md animate-bounce">
                    <MapPin className="w-5 h-5 text-[#c5a059] fill-current" />
                  </div>
                  
                  <a 
                    href={mapsUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#4a5d4e] tracking-widest border-b border-[#4a5d4e] pb-0.5 hover:text-[#c5a059] hover:border-[#c5a059] transition-all cursor-pointer"
                  >
                    Buka Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* 5. DIGITAL GIFTS / DONATION CARD (col-span-4, Bank details + copy text buttons) */}
            <div 
              id="card-gifts"
              className="md:col-span-4 bg-white rounded-[2.5rem] p-6 flex flex-col justify-between border border-[#e5e1da] shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-5 h-5 text-[#c5a059]" />
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#c5a059]">Kado Digital</h4>
                </div>
                <p className="text-[10px] text-gray-500 leading-normal mb-4">
                  Doa restu Anda adalah karunia terindah. Namun jika ingin memberikan tanda kasih secara digital, Anda dapat mentransfer ke:
                </p>
              </div>

              {/* Bank Accounts list */}
              <div className="space-y-2.5">
                {/* Bank Account 1 */}
                <div className="p-3 bg-[#fafafa] rounded-2xl border border-[#f0eee9] flex items-center justify-between hover:border-[#c5a059]/40 transition-all">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">{bank1Name}</span>
                    <span className="text-xs font-bold text-[#4a5d4e] tracking-wider block">{bank1Number}</span>
                    <span className="text-[9px] text-[#8a8a8a] block">a.n. {bank1Holder}</span>
                  </div>
                  <button 
                    onClick={() => handleCopyText(bank1Number, 'bank-1')}
                    className="px-3 py-1.5 bg-white border border-[#e5e1da] hover:bg-[#f4f1ea] active:scale-95 text-[9px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {copiedText['bank-1'] ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" /> Disalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-gray-400" /> Salin
                      </>
                    )}
                  </button>
                </div>

                {/* Bank Account 2 */}
                <div className="p-3 bg-[#fafafa] rounded-2xl border border-[#f0eee9] flex items-center justify-between hover:border-[#c5a059]/40 transition-all">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">{bank2Name}</span>
                    <span className="text-xs font-bold text-[#4a5d4e] tracking-wider block">{bank2Number}</span>
                    <span className="text-[9px] text-[#8a8a8a] block">a.n. {bank2Holder}</span>
                  </div>
                  <button 
                    onClick={() => handleCopyText(bank2Number, 'bank-2')}
                    className="px-3 py-1.5 bg-white border border-[#e5e1da] hover:bg-[#f4f1ea] active:scale-95 text-[9px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {copiedText['bank-2'] ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" /> Disalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-gray-400" /> Salin
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-[9px] text-center text-[#8a8a8a] mt-4 italic">
                Terima kasih mendalam atas doa & kado terbaik Anda
              </p>
            </div>

            {/* 6. SAVE EVENT CALENDAR CARD (col-span-4, google calendar synchronization) */}
            <div 
              id="card-calendar"
              className="md:col-span-4 bg-[#f9f7f2] rounded-[2.5rem] p-6 flex flex-col justify-between border border-[#e5e1da] shadow-sm relative overflow-hidden"
            >
              {/* Deco detail */}
              <div className="absolute right-0 top-0 w-24 h-24 bg-[#c5a059]/5 rounded-bl-full pointer-events-none"></div>

              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#4a5d4e] block mb-1">Simpan Agenda</span>
                <h4 className="text-base font-serif italic text-[#4a5d4e] font-semibold mb-2">Simpan Tanggal Bahagia</h4>
                <p className="text-[11px] leading-relaxed text-[#5a6356] mb-4">
                  Jangan lewatkan momen sakral pengucapan janji setia kami. Sinkronisasikan langsung ke Google Kalender Anda.
                </p>
              </div>

              <a 
                href={getGoogleCalendarUrl()}
                target="_blank" 
                rel="noopener noreferrer"
                id="btn-sync-calendar"
                className="w-full py-4 bg-[#c5a059] hover:bg-[#b08e4d] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4 fill-white" />
                Sync ke Google Kalender
              </a>
            </div>

            {/* 7. MUSIC AUDIO CARD (col-span-4, elegant music play/pause spin visual) */}
            <div 
              id="card-music-player"
              className="md:col-span-4 bg-[#d9c5b2] rounded-[2.5rem] p-6 flex flex-col items-center justify-center border border-[#c9b5a2] shadow-sm text-white text-center relative overflow-hidden min-h-[180px]"
            >
              {/* Decorative radial overlay */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/10 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                {/* Rotating Vinyl/Disc Graphic */}
                <button
                  onClick={handleTogglePlay}
                  id="btn-play-music"
                  className={`w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 shadow-md border border-white/30 focus:outline-none transition-all active:scale-90 hover:bg-white/30 cursor-pointer ${
                    isPlaying ? 'animate-spin' : 'animate-pulse'
                  }`}
                  style={{ animationDuration: isPlaying ? '12s' : '2s' }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white fill-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                  )}
                </button>

                <span className="text-[9px] uppercase font-bold tracking-widest text-[#4a5d4e] mb-1 block">
                  {isPlaying ? 'Sedang Memutar' : 'Musik Pengiring'}
                </span>
                <p className="text-xs italic font-serif font-bold max-w-[180px] truncate">
                  {customSongUrl ? 'Lagu Mandiri Tamu' : SONG_PRESETS.find(s => s.id === songPresetKey)?.name || 'Wedding Instrumental'}
                </p>

                {/* Soundwaves visual */}
                {isPlaying && (
                  <div className="flex gap-1 items-end h-3 mt-3">
                    <span className="w-0.5 bg-white/70 animate-music-bar-1 h-3 rounded-full"></span>
                    <span className="w-0.5 bg-white/70 animate-music-bar-2 h-1.5 rounded-full"></span>
                    <span className="w-0.5 bg-white/70 animate-music-bar-3 h-2.5 rounded-full"></span>
                    <span className="w-0.5 bg-white/70 animate-music-bar-1 h-2 rounded-full"></span>
                  </div>
                )}
              </div>
            </div>

            {/* ==========================================
                8. FULL WIDTH WISHES & UCAPAN LIST
                ========================================== */}
            <div 
              id="card-guestbook"
              className="md:col-span-12 bg-white rounded-[2.5rem] p-6 md:p-8 border border-[#e5e1da] shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e1da]/60 pb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#4a5d4e]/5 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#4a5d4e]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif italic text-[#4a5d4e] font-bold">Ucapan & Doa Restu</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Ungkapan Hangat dari Para Tamu</p>
                  </div>
                </div>

                {/* Stats board */}
                <div className="flex gap-4 text-xs">
                  <div className="px-3 py-1.5 bg-green-50 text-green-800 rounded-xl border border-green-100 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Hadir: <strong>{rsvps.filter(r => r.status === 'Hadir').length + 3}</strong></span>
                  </div>
                  <div className="px-3 py-1.5 bg-[#fdfbf7] text-[#c5a059] rounded-xl border border-[#e5e1da] flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-[#c5a059]" />
                    <span>Total Ucapan: <strong>{wishes.length}</strong></span>
                  </div>
                </div>
              </div>

              {/* Scrollable list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-2">
                {wishes.map((wish) => (
                  <div 
                    key={wish.id} 
                    className="p-5 bg-[#fafafa] rounded-2xl border border-[#e5e1da]/50 hover:border-[#c5a059]/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#4a5d4e]/10 text-[#4a5d4e] font-serif font-bold text-xs flex items-center justify-center">
                            {wish.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-[#2d2d2d] block">{wish.name}</span>
                            <span className="text-[8px] text-gray-400 block">{wish.timestamp}</span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                          wish.status === 'Hadir' ? 'bg-green-50 text-green-700 border border-green-200' :
                          wish.status === 'Tidak Hadir' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {wish.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#5a6356] leading-relaxed italic font-serif bg-white p-3.5 rounded-xl border border-gray-100">
                        &ldquo;{wish.message}&rdquo;
                      </p>
                    </div>

                    {/* Like Action */}
                    <div className="flex justify-end items-center mt-3 pt-2.5 border-t border-[#e5e1da]/35">
                      <button 
                        onClick={() => handleLikeWish(wish.id)}
                        className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-red-500 active:scale-90 transition-all font-semibold"
                      >
                        <Heart className="w-3.5 h-3.5 hover:fill-red-500 transition-colors" />
                        <span>Sukai ({wish.likes})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Footer layout credits (humble/minimal as requested) */}
          <div className="mt-12 text-center text-[11px] text-[#8a8a8a] py-6 border-t border-[#e5e1da]/60">
            <span className="font-serif italic font-bold text-[#4a5d4e] text-xs">Aditiya & Kirana</span>
            <p className="mt-1">Kami menanti kehadiran Anda di hari bahagia pernikahan kami.</p>
          </div>

        </div>
      </div>

      {/* Embedded Soundwave Animation CSS Utilities */}
      <style>{`
        @keyframes music-bar-1 {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        @keyframes music-bar-2 {
          0%, 100% { height: 8px; }
          50% { height: 4px; }
        }
        @keyframes music-bar-3 {
          0%, 100% { height: 12px; }
          50% { height: 6px; }
        }
        .animate-music-bar-1 { animation: music-bar-1 1s ease-in-out infinite; }
        .animate-music-bar-2 { animation: music-bar-2 0.8s ease-in-out infinite; }
        .animate-music-bar-3 { animation: music-bar-3 1.2s ease-in-out infinite; }
        
        /* Custom scrollbar style */
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: #fafafa;
        }
        ::-webkit-scrollbar-thumb {
          background: #e5e1da;
          border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #c5a059;
        }
      `}</style>
      
    </div>
  );
}
