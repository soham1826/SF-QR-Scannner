import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity,Dimensions } from 'react-native';
import { Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';





export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [newtext,setNewText] = useState('')

  
  

  const openURI = async () => {
    const url = text;
    await Linking.openURL(url); // It will open the URL on browser.
    
  }

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    setNewText('Click for link')
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <Text style = {{fontSize:20,color:'white'}}>{'SF QR-code scanner'}</Text>
      </View>
      <Text style = {{fontSize:25,textAlign:'center',margin:30}}>{"Scan and click on the link to get information about the plant"}</Text>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{height:300,width:300}} />
      </View>
      <TouchableOpacity onPress={openURI}>
      <Text style={styles.maintext} >{newtext}</Text>
      </TouchableOpacity>
      
      
      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false) & setNewText('')}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      // top: 0,
      // left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0.2, 0.2, 0.2, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    padding:10,
    // borderRadius :20,
    // borderWidth:5

  },
  barcodebox: {
    width: 300,
    height: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
     
     
    
  },
  header:{
    alignItems:'center',
    justifyContent:'center',
    height:40,
    width:'100%',
    marginTop:0,
    backgroundColor:'tomato'
  },
  button:{
    margin:5,
    padding:5,
  },
  headericon:{
    width:3,
    height:3
  }
  
});
