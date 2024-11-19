import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DQ_BaseHeader from '../../components/DQ_BaseHeader'
import { GetRequests } from './service/get-requests';
import _shared from '../common';
import { GetRequestsRequestData } from '../../Shared/Types';
import DQ_RequestCard from '../../components/DQ_RequestCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RequestsScreen({navigation, route}:any) {
    const [requests, setRequests] = useState<GetRequestsRequestData[]>([])
    
    useEffect(()=>{
        const {policyNo} = route.params || {};
        const Get_Requests = async()=>{
            const result = await GetRequests(_shared.userId, _shared.pin, _shared.role,policyNo??null)
            const _requests = result?.requestsData.policies;
            setRequests(_requests ?? []);

        };
        Get_Requests()
    },[route.params])

  return (
    <SafeAreaView >
      <DQ_BaseHeader
      variant='textCenter'
      textCenter="MY REQUESTS"
      press={()=>{navigation.goBack()}}
      />
     <View style={styles.RequestsContainer}>
            <FlatList
                data={requests}
                renderItem={({ item, index }) => (
                    <View>
                        <FlatList
                            data={item.activeRequests}
                            renderItem={({ item: subItem }:any) => (
                                <DQ_RequestCard
                                item={subItem}
                                policyNo={item.policyNo}
                                press={()=>navigation.navigate('ViewRequest',{item: subItem, policyNo: item.policyNo, productName:item.productName})}/>
                            )}
                            keyExtractor={() => item.policyNo.toString()+ index}
                        />
                    </View>
                )}
                keyExtractor={item => item.policyNo.toString()}
            />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    RequestsContainer:{
        padding:15,
    }
})