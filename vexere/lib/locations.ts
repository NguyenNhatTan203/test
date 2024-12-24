export interface Location {
  id: string;
  name: string;
  code: string;
  type: 'airport' | 'train_station';
  region?: string;
}

export const locations: Location[] = [
  // Airports
  { id: 'SGN', name: 'Hồ Chí Minh (SGN)', code: 'SGN', type: 'airport', region: 'Miền Nam' },
  { id: 'HAN', name: 'Hà Nội (HAN)', code: 'HAN', type: 'airport', region: 'Miền Bắc' },
  { id: 'DAD', name: 'Đà Nẵng (DAD)', code: 'DAD', type: 'airport', region: 'Miền Trung' },
  { id: 'CXR', name: 'Nha Trang (CXR)', code: 'CXR', type: 'airport', region: 'Miền Trung' },
  { id: 'PQC', name: 'Phú Quốc (PQC)', code: 'PQC', type: 'airport', region: 'Miền Nam' },
  { id: 'VCA', name: 'Cần Thơ (VCA)', code: 'VCA', type: 'airport', region: 'Miền Nam' },
  { id: 'UIH', name: 'Quy Nhơn (UIH)', code: 'UIH', type: 'airport', region: 'Miền Trung' },
  { id: 'VDO', name: 'Vân Đồn (VDO)', code: 'VDO', type: 'airport', region: 'Miền Bắc' },
  { id: 'DLI', name: 'Đà Lạt (DLI)', code: 'DLI', type: 'airport', region: 'Miền Nam' },
  { id: 'HPH', name: 'Hải Phòng (HPH)', code: 'HPH', type: 'airport', region: 'Miền Bắc' },
  { id: 'HUI', name: 'Huế (HUI)', code: 'HUI', type: 'airport', region: 'Miền Trung' },
  { id: 'VCL', name: 'Chu Lai (VCL)', code: 'VCL', type: 'airport', region: 'Miền Trung' },
  { id: 'VCS', name: 'Côn Đảo (VCS)', code: 'VCS', type: 'airport', region: 'Miền Nam' },
  { id: 'THD', name: 'Thanh Hóa (THD)', code: 'THD', type: 'airport', region: 'Miền Bắc' },
  { id: 'VDH', name: 'Đồng Hới (VDH)', code: 'VDH', type: 'airport', region: 'Miền Trung' },
  
  // Train Stations
  { id: 'HNO', name: 'Ga Hà Nội', code: 'HNO', type: 'train_station', region: 'Miền Bắc' },
  { id: 'SGO', name: 'Ga Sài Gòn', code: 'SGO', type: 'train_station', region: 'Miền Nam' },
  { id: 'DNT', name: 'Ga Đà Nẵng', code: 'DNT', type: 'train_station', region: 'Miền Trung' },
  { id: 'HUT', name: 'Ga Huế', code: 'HUT', type: 'train_station', region: 'Miền Trung' },
  { id: 'NHT', name: 'Ga Nha Trang', code: 'NHT', type: 'train_station', region: 'Miền Trung' },
  { id: 'VNH', name: 'Ga Vinh', code: 'VNH', type: 'train_station', region: 'Miền Bắc' },
  { id: 'LBI', name: 'Ga Long Biên', code: 'LBI', type: 'train_station', region: 'Miền Bắc' },
  { id: 'GLA', name: 'Ga Gia Lâm', code: 'GLA', type: 'train_station', region: 'Miền Bắc' },
  { id: 'DAN', name: 'Ga Đông Anh', code: 'DAN', type: 'train_station', region: 'Miền Bắc' },
  { id: 'YVI', name: 'Ga Yên Viên', code: 'YVI', type: 'train_station', region: 'Miền Bắc' },
  { id: 'HPG', name: 'Ga Hải Phòng', code: 'HPG', type: 'train_station', region: 'Miền Bắc' },
  { id: 'THH', name: 'Ga Thanh Hóa', code: 'THH', type: 'train_station', region: 'Miền Bắc' },
  { id: 'NDB', name: 'Ga Nam Định', code: 'NDB', type: 'train_station', region: 'Miền Bắc' },
  { id: 'QNH', name: 'Ga Quy Nhơn', code: 'QNH', type: 'train_station', region: 'Miền Trung' },
  { id: 'BHO', name: 'Ga Biên Hòa', code: 'BHO', type: 'train_station', region: 'Miền Nam' },
];

export const getLocationsByType = (type: 'airport' | 'train_station'): Location[] => {
  console.log('Getting locations by type:', type) // Debug log
  if (!Array.isArray(locations)) {
    console.error('Locations data is not an array');
    return [];
  }
  const filteredLocations = locations.filter(location => location && location.type === type);
  console.log('Filtered locations:', filteredLocations) // Debug log
  return filteredLocations;
};

