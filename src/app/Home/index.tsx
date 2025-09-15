import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Button } from '@/Components/Button';

import { styles } from './styles';
import { Input } from '@/Components/Input';
import { Filter } from '@/Components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/Components/Item';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} />

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?'/>
        <Button title="Adicionar"/>
      </View> 

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive/>
          ))}
          
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <Item 
          data={{status: FilterStatus.DONE, description: 'Café'}}
          onRemove={() => console.log('Remover item')}
          onStatus={() => console.log('Mudar status')}
        />

      </View>
    </View>
  );
}
