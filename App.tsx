import {StatusBar} from 'expo-status-bar';
import Navigation from "./navigation/MainNavigator";


export default function App() {
  return (
    <>
      <Navigation/>
      <StatusBar style="auto"/>
    </>

  );
}


// export default function App() {
//     return (
//         // <View >
//         <View style={styles.background}>
//             {/*<View >*/}
//             <View style={styles.logoContainer}>
//                 <Image
//                     style={styles.logo}
//                     source={require('./assets/novaPost.png')}
//                 />
//             </View>
//             {/*<View >*/}
//             <View style={styles.content}>
//                 <Navigation/>
//                 <StatusBar style="auto"/>
//             </View>
//         </View>
//     );
// }


// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         backgroundColor: 'rgba(243, 29, 37, 1)',
//     },
//     container: {
//         flex: 1,
//         // backgroundColor: 'rgba(243, 29, 37, 1)', // красный цвет фона
//         justifyContent: 'center', // выравнивание по центру по вертикали
//         alignItems: 'center', // выравнивание по центру по горизонтали
//     },
//     logoContainer: {
//         position: 'absolute',
//         top: 240,
//         left: '50%',
//         marginLeft: -100, // половина ширины логотипа
//         marginTop: -100, // половина высоты логотипа
//         width: 200, // ширина логотипа
//         height: 200, // высота логотипа
//         backgroundColor: '#fff', // белый цвет фона контейнера логотипа
//         borderRadius: 45,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     logo: {
//         width: 190, // ширина изображения логотипа
//         height: 190, // высота изображения логотипа
//         resizeMode: 'contain', // масштабирование изображения логотипа для сохранения пропорций
//     },
//     content: {
//         flex: 1,
//         padding: 10,
//         alignItems:"center",
//     },
// });






