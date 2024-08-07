import React , {useContext,useState,useEffect,useRef} from 'react';
import {Platform} from 'react-native';
import { MyContext } from '../../store/context.js'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import styles from "../../style"
import BarSelection from '../DrinkSelectionScreens/BarSelection.js'
import DrinkMenu from '../DrinkSelectionScreens/DrinkMenu.js'
import DrinkSelection from '../DrinkSelectionScreens/DrinkSelection.js'
import { FAB } from 'react-native-paper';
import BathroomList from "../InClubScreens/BathroomList.js"
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Button} from "react-native-paper"
import VIPService from "../VIPScreensScreens/VIPServices"
import Receipt from "../DrinkSelectionScreens/Receipt"
import Message from '../InClubScreens/Messages.js';
import { useRoute } from '@react-navigation/native';
import { Alert } from "react-native";
import { saveOrder,loadOrder ,updateOrder,isAccepted,clearOrder} from '../../store/asyncStorage';
// import * as Application from 'expo-application';
import {statusUpdates} from '../../StaticData'
import * as SecureStore from 'expo-secure-store';



//make it so if there is only 1 bar navigate directly to the menu
const Tab = createBottomTabNavigator();

function ClubMain() {

    const navigation = useNavigation();
    const {state,inScreenOrdersUpdate,screenRemoveOrder,setActiveOrders,acceptedOrder} = useContext(MyContext);
    const [currentOrders, setCurrentOrders] = useState([]);
    const wsRef = useRef(null);

    console.log(state.inScreenOrders)
    
    function removeSpecialCharacters(str) {
      return str.replace(/[^a-zA-Z0-9 ]/g, '');
    }

    useEffect(() => {
      let ws;
        const initWebSocket = async () => {
          try {
            const id = await SecureStore.getItemAsync('secure_deviceid');
            console.log('DeviceID:' + id);

            console.log(id);

      
            console.log(typeof(id))
            ws = new WebSocket(`wss://6jmqtda5q8.execute-api.us-east-1.amazonaws.com/dev?entityId=${id}`);
            wsRef.current = ws;

            console.log(ws)
      
            ws.addEventListener('open', (event) => {
              console.log('WebSocket connection opened:' + event);
              // Send a message to the server
              ws.send('Hello from Mobile: ' + id);
            });
      
      
            ws.addEventListener('message', async(event) => {
              const payload = JSON.parse(JSON.parse(event.data));
              console.log('start of the socket:')
              console.log(payload);
      
      
              // Handle different events
              switch (payload.event) {
                case 'newOrder': {

                    var inScreenDataObject = {...payload.data.order,barName:payload.data.bar.name,barDescription:payload.data.bar.description}

                    await inScreenOrdersUpdate(inScreenDataObject);
                    await setActiveOrders(true)
                    console.log('new state?')
                    console.log(state)

                    Alert.alert('Order finalized');
                  
                  break;
                }
                case 'acceptOrder': {
                 acceptedOrder(payload.order.readable_ID)
                  Alert.alert('Order accepted, proceed to pickup!',payload.order.acceptance_notes);
                  break;
                }
                case 'completeOrder': {
                    clearOrder(payload.order.readable_ID)
                    screenRemoveOrder(payload.order.readable_ID)
                    var currentOrders = await loadOrder();
                    setCurrentOrders(currentOrders)
                    if(currentOrders.length===0){
                        setActiveOrders(false);
                    }
                    Alert.alert('Order:' + payload.order.readable_ID+ ' complete!' )
                  break;
                }
                case 'cancelOrder': {
                  console.log('cancelled order:')
                  console.log(payload)
                    clearOrder(payload.order.readable_ID)
                    console.log('should be removed from ASync')
                    screenRemoveOrder(payload.order.readable_ID)
                    console.log('should be removed from screen')
                    Alert.alert('Order Cancelled!',payload.order.cancel_reason);
                    var currentOrders = await loadOrder();
                    if(currentOrders.length===0){
                        setActiveOrders(false);
                    }
                  break;
                }
                default:
                  console.log('Incorrect statement sent from server')
                  break;
              }
            });
      
      
            ws.onerror = (error) => {
              console.error('WebSocket error:', error);
            };
      
      
            ws.onclose = () => {
              console.log('WebSocket closed');
            };

            


            console.log('socket')
            console.log('wsRef.current (inside initWebSocket):', wsRef.current);
            console.log(ws)
      
            
          } catch (error) {
            console.error('Error initializing WebSocket:', error);
          }
        };
      
      
        initWebSocket();

        return () => {
          if (wsRef.current) {
              wsRef.current.close();
              console.log('WebSocket connection closed in cleanup');
          }
      };
      }, []);

      useEffect(() => {
        (async () => {
          console.log('state has changed in main')
          const data = await loadOrder();
          setCurrentOrders(data)
        })();
      }, [state]);




    React.useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            const isActive = state.inScreenOrders.length> 0
            console.log('Current in screen orders = '+ state.inScreenOrders.length)
            if(isActive){
                Alert.alert('You have active orders!', 'Please complete or cancel your active orders before leaving this screen.');
                e.preventDefault();
            }           
        });
        // Cleanup function
        return unsubscribe;
      }, [navigation]);
      

    return (
        <Tab.Navigator>
        <Tab.Screen labeled={false}  name="Bar Selection" component={BarSelection}
        options={{
            tabBarLabel: 'Bar',
            tabBarIcon: ({}) => (
                <Ionicons name="wine-sharp" class="tabIcon" size={24} color="#4F47C7" />
            ),
            headerShown:false
          }}
          />
        <Tab.Screen name="Bathroom" component={BathroomList} 
        options={{
            tabBarLabel:"Bathroom",
            tabBarIcon: ({}) =>(
                <MaterialCommunityIcons name="toilet" size={24} color="#4F47C7" />
            ),
            headerShown:false
        }}/>
        <Tab.Screen name="Message" component={Message} 
        options={{
            tabBarLabel:"Message",
            tabBarIcon: ({}) =>(
                <MaterialCommunityIcons name="chat" size={24} color="#4F47C7" />
            ),
            headerShown:false
        }}/>
        {/*  <Tab.Screen name="VIP" component={VIPService} 
        options={{
            tabBarLabel:"VIP",
            tabBarIcon: ({}) =>(
                <MaterialCommunityIcons name="star" size={24} color="#4F47C7" />
            ),
            headerShown:false
        }}/>*/}
        <Tab.Screen name="Receipt"
        options={{
            tabBarLabel:"Receipt",
            tabBarIcon: ({}) =>(
                <MaterialCommunityIcons name="receipt" size={24} color="#4F47C7" />
            ),
            headerShown:false
        }}>
            {() => <Receipt navigation= {navigation} />}
        </Tab.Screen>
      </Tab.Navigator>                              
    );
  
}

export default ClubMain