import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import { Button } from '@/Components/Button';

import { styles } from './styles';
import { Input } from '@/Components/Input';
import { Filter } from '@/Components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/Components/Item';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];

const ITEMS = [
  { id: '1', description: 'Café',     status: FilterStatus.DONE },
  { id: '2', description: 'Arroz',    status: FilterStatus.PENDING },
  { id: '3', description: 'Feijão',   status: FilterStatus.PENDING },
  { id: '4', description: 'Macarrão', status: FilterStatus.DONE },
  { id: '5', description: 'Leite',    status: FilterStatus.PENDING },
  { id: '6', description: 'Pão',      status: FilterStatus.DONE },
];

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

        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item 
              data={item}
              onRemove={() => console.log('Remover item')}
              onStatus={() => console.log('Mudar status')}
            />
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={ styles.listContent }  
          ListEmptyComponent={() => (
            <Text style={styles.empty}>
              Você ainda não tem itens na sua lista de compras
            </Text>
          )}
        />


      </View>
    </View>
  );
}
