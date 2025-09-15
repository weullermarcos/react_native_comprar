import React from 'react';
import { View } from 'react-native';
import { FilterStatus } from '@/types/FilterStatus';
import { CircleCheck, CircleDashed } from 'lucide-react-native';

// Fazendo uma tipagem inline
export function StatusIcon({status} : {status: FilterStatus}) {
  return status === FilterStatus.DONE ? 
  (<CircleCheck size={18} color='#2C46B1' />) : 
  (<CircleDashed size={18} color='#000' />);
}