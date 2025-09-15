import { View, Image } from 'react-native';
import { Button } from '@/Components/Button';

import { styles } from './styles';
import { Input } from '@/Components/Input';
import { Filter } from '@/Components/Filter';
import { FilterStatus } from '@/types/FilterStatus';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} />

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?'/>
        <Button title="Adicionar"/>
      </View> 

      <View style={styles.content}>
        <Filter status={FilterStatus.DONE} isActive={true}/>
        <Filter status={FilterStatus.PENDING} isActive={false}/>
      </View>
      
    </View>
  );
}
