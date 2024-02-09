
import { Stack, router } from 'expo-router';
import { User, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useRef, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { doc, getDoc, } from 'firebase/firestore';
import { Alert, LogBox } from 'react-native';
import  { chain } from 'mathjs'
import { useDebounce } from 'usehooks-ts'

LogBox.ignoreAllLogs(); // Ignore log notification by message

export default function RootLayout() {
  return <RootLayoutNav />;
}

// made functions below
function round(value: number) {
  return Math.round(value * 10) / 10
}
// all context TYPES defined below
type CountContextType = {
  count: number
  multiplier: number
  autoClickerValue: number
  setCount: React.Dispatch<React.SetStateAction<number>>
  setMultiplier: React.Dispatch<React.SetStateAction<number>>
  setAutoClickerValue: React.Dispatch<React.SetStateAction<number>>
  countIncrement: () => void
  // shop functions and variables here
  price: number
  price2: number
  price3: number
  price4: number
  price5: number

  setPrice: React.Dispatch<React.SetStateAction<number>>
  setPrice2: React.Dispatch<React.SetStateAction<number>>
  setPrice3: React.Dispatch<React.SetStateAction<number>>
  setPrice4: React.Dispatch<React.SetStateAction<number>>
  setPrice5: React.Dispatch<React.SetStateAction<number>>

  autoPrice: number
  autoPrice2: number
  autoPrice3: number
  autoPrice4: number
  autoPrice5: number
  
  setAutoPrice: React.Dispatch<React.SetStateAction<number>>
  setAutoPrice2: React.Dispatch<React.SetStateAction<number>>
  setAutoPrice3: React.Dispatch<React.SetStateAction<number>>
  setAutoPrice4: React.Dispatch<React.SetStateAction<number>>
  setAutoPrice5: React.Dispatch<React.SetStateAction<number>>

  multiIncrement: () => void
  multiIncrement2: () => void
  multiIncrement3: () => void
  multiIncrement4: () => void
  multiIncrement5: () => void

  autoClickerIncrement: () => void
  autoClickerIncrement2: () => void
  autoClickerIncrement3: () => void
  autoClickerIncrement4: () => void
  autoClickerIncrement5: () => void

};

type UserContextType = {
  username: string | undefined
  setUsername: React.Dispatch<React.SetStateAction<string>> | any
  character: number | any // !! IT IS A NUMBER TO MAKE CODING FASTER THE CHOICES ARE 1 OR 2 1 BEING KNIGHT 2 BEING ASSASSSIN !!
  setCharacter: React.Dispatch<React.SetStateAction<number>>  | any
  // map user contexts

  capture1: boolean
  capture2: boolean
  capture3: boolean
  capture4: boolean
  capture5: boolean
  capture6: boolean
  capture7: boolean
  capture8: boolean
  capture9: boolean
  capture10: boolean
  capture11: boolean
  capture12: boolean

  setCapture1: React.Dispatch<React.SetStateAction<boolean>>
  setCapture2: React.Dispatch<React.SetStateAction<boolean>>
  setCapture3: React.Dispatch<React.SetStateAction<boolean>>
  setCapture4: React.Dispatch<React.SetStateAction<boolean>>
  setCapture5: React.Dispatch<React.SetStateAction<boolean>>
  setCapture6: React.Dispatch<React.SetStateAction<boolean>>
  setCapture7: React.Dispatch<React.SetStateAction<boolean>>
  setCapture8: React.Dispatch<React.SetStateAction<boolean>>
  setCapture9: React.Dispatch<React.SetStateAction<boolean>>
  setCapture10: React.Dispatch<React.SetStateAction<boolean>>
  setCapture11: React.Dispatch<React.SetStateAction<boolean>>
  setCapture12: React.Dispatch<React.SetStateAction<boolean>>

  captures: number
  setCaptures: React.Dispatch<React.SetStateAction<number>>

  win: boolean
  setWin: React.Dispatch<React.SetStateAction<boolean>>

  handleCapture1: () => void
  handleCapture2: () => void
  handleCapture3: () => void
  handleCapture4: () => void
  handleCapture5: () => void
  handleCapture6: () => void
  handleCapture7: () => void
  handleCapture8: () => void
  handleCapture9: () => void
  handleCapture10: () => void
  handleCapture11: () => void
  handleCapture12: () => void
}

type TransmutatorContextType = {
  darkSteel: number
  attack: number 
  defense: number
  troops: number
  power: number
  setDarkSteel: React.Dispatch<React.SetStateAction<number>>
  setAttack: React.Dispatch<React.SetStateAction<number>>
  setDefense: React.Dispatch<React.SetStateAction<number>>
  setTroops: React.Dispatch<React.SetStateAction<number>>
  setPower: React.Dispatch<React.SetStateAction<number>>
  convert1: () => void
  convert2: () => void
  convert3: () => void
  convert4: () => void
  convert5: () => void
  smallAttackUPG: () => void
  bigAttackUPG: () => void
  smallDefenseUPG: () => void
  bigDefenseUPG: () => void
  troopUPG: () => void
}
// defines and exports contexts below (Use context for better preformance)
export const CountContext = createContext< null | CountContextType>(null)
export const UserContext = createContext< null | UserContextType>(null)
export const TransmutatorContext = createContext<null | TransmutatorContextType>(null)

function RootLayoutNav() {

  // everything to do with contexts is here
    // count context
      // count context states
  const [ count, setCount ] = useState(0);
  const [ multiplier, setMultiplier] = useState(1);
  const [ autoClickerValue, setAutoClickerValue] = useState(0)
  const [ active, setActive] = useState(0)
      // count context price states
  const [ price, setPrice ] = useState(25);
  const [ price2, setPrice2 ] = useState(250);
  const [ price3, setPrice3 ] = useState(500);
  const [ price4, setPrice4 ] = useState(10000);
  const [ price5, setPrice5 ] = useState(75000);

  const [ autoPrice, setAutoPrice ] = useState(100);
  const [ autoPrice2, setAutoPrice2 ] = useState(1500);
  const [ autoPrice3, setAutoPrice3 ] = useState(10000);
  const [ autoPrice4, setAutoPrice4 ] = useState(25000);
  const [ autoPrice5, setAutoPrice5 ] = useState(100000); 

  
      // count context functions
        // Count functions

  function countIncrement() {
      setCount(count + multiplier)
  }
        // Multiplier functions

  function multiIncrement() { 
    if (count >= price) {
      setMultiplier(multiplier + 1)
      setCount(count - price)
      setPrice(price * 1.5)
    }
  }

  function multiIncrement2() { 
    if (count >= price2) {
      setMultiplier(multiplier + 5)
      setCount(count - price2)
      setPrice2(price2 * 3)
    }
  }

  function multiIncrement3() { 
    if (count >= price3) {
      setMultiplier(multiplier + 10)
      setCount(count - price3)
      setPrice3(price3 * 5)
    }
  }

  function multiIncrement4() { 
    if (count >= price4) {
      setMultiplier(multiplier + 100)
      setCount(count - price4)
      setPrice4(price4 * 25)
    }
  }

  function multiIncrement5() { 
    if (count >= price5) {
      setMultiplier(multiplier + 500)
      setCount(count - price5)
      setPrice5(price5 * 100)
    }
  }

        // AutoClicker functions


  function autoClickerIncrement() {
    if (count >= autoPrice) {
      setAutoClickerValue(autoClickerValue + .1);
      setCount(count - autoPrice);
      setAutoPrice(autoPrice + (autoPrice * 0.15));
    }
  }


  function autoClickerIncrement2() {
    if (count >= autoPrice2) {
      setAutoClickerValue(autoClickerValue + 1);
      setCount(count - autoPrice2);
      setAutoPrice2(autoPrice2 + (autoPrice2 * 1));
    }
  }

  function autoClickerIncrement3() {
    if (count >= autoPrice3) {
      setAutoClickerValue(autoClickerValue + 5);
      setCount(count - autoPrice3);
      setAutoPrice3(autoPrice3 + (autoPrice3 * 2));
    }
  }

  function autoClickerIncrement4() {
    if (count >= autoPrice4) {
      setAutoClickerValue(autoClickerValue + 10);
      setCount(count - autoPrice4);
      setAutoPrice4(autoPrice4 + (autoPrice4 * 5));
    }
  }

  function autoClickerIncrement5() {
    if (count >= autoPrice5) {
      setAutoClickerValue(autoClickerValue + 100);
      setCount(count - autoPrice5);
      setAutoPrice5(autoPrice5 + (autoPrice5 * 10));
    }
  }
  // to keep all counts that may hit decimals always rounded
  useEffect(() => {
    setCount(round(count))
  }, [count])
  useEffect(() => {
    setAutoClickerValue(round(autoClickerValue))
  },[autoClickerValue])
  useEffect(() => {
    setPrice(Math.round(price))
  }, [price])
  useEffect(() => {
    setPrice2(Math.round(price2))
  },[price2])
  useEffect(() => {
    setPrice3(Math.round(price3))
  },[price3])
  useEffect(() => {
    setPrice4(Math.round(price4))
  },[price4])
  useEffect(() => {
    setPrice5(Math.round(price5))
  },[price5])
  useEffect(() => {
    setAutoPrice(Math.round(autoPrice))
  },[autoPrice])
  useEffect(() => {
    setAutoPrice2(Math.round(autoPrice2))
  },[autoPrice2])
  useEffect(() => {
    setAutoPrice3(Math.round(autoPrice3))
  },[autoPrice3])
  useEffect(() => {
    setAutoPrice4(Math.round(autoPrice4))
  },[autoPrice4])
  useEffect(() => {
    setAutoPrice5(Math.round(autoPrice5))
  },[autoPrice5])
      // count context values (to be exported)
  const countValues = {
    count,
    multiplier,
    autoClickerValue,
    setCount,
    setMultiplier,
    setAutoClickerValue,
    countIncrement,
    // shop items here
    price,
    price2,
    price3,
    price4,
    price5,

    setPrice,
    setPrice2,
    setPrice3,
    setPrice4,
    setPrice5,
    
    autoPrice,
    autoPrice2,
    autoPrice3,
    autoPrice4,
    autoPrice5,
    
    setAutoPrice,
    setAutoPrice2,
    setAutoPrice3,
    setAutoPrice4,
    setAutoPrice5,

    multiIncrement,
    multiIncrement2,
    multiIncrement3,
    multiIncrement4,
    multiIncrement5,

    autoClickerIncrement,
    autoClickerIncrement2,
    autoClickerIncrement3,
    autoClickerIncrement4,
    autoClickerIncrement5,
  }
    // user context
      // user context states
    const [ username, setUsername] = useState('')
    const [ character, setCharacter] = useState(0)
      // user context states for the map and winning
      const [ capture1, setCapture1] = useState(false); 
      const [ capture2, setCapture2] = useState(false);
      const [ capture3, setCapture3] = useState(false);
      const [ capture4, setCapture4] = useState(false);
      const [ capture5, setCapture5] = useState(false);
      const [ capture6, setCapture6] = useState(false);
      const [ capture7, setCapture7] = useState(false);
      const [ capture8, setCapture8] = useState(false);
      const [ capture9, setCapture9] = useState(false);
      const [ capture10, setCapture10] = useState(false);
      const [ capture11, setCapture11] = useState(false);
      const [ capture12, setCapture12] = useState(false);

      const [ captures, setCaptures] = useState(0)
      const [ win, setWin ] = useState(false);
      // user context functions

      // all button handles to capture land
    const handleCapture1 = () => {
      if ( power >= 10) {
          Alert.alert("You successfully captured the first of the Assassin's land!")
          setCapture1(true)
          setCaptures(captures + 1)
      } else {
          Alert.alert('You tried too attack with too little power and lost 10% of your armys strength')
          setAttack(attack - attack/10)
          setDefense(defense - defense/10)
      }
  };
  const handleCapture2 = () => {
      if ( power >= 25) {
          Alert.alert("You successfully captured a Assassin's Hideout!")
          setCapture2(true)
          setCaptures(captures + 1)
      } else {
          Alert.alert('You tried too attack with too little power and lost 15% of your armys strength')
          setAttack(attack - attack/6.667)
          setDefense(defense -defense/6.667)
      }
  };
  const handleCapture3 = () => {
      if ( power >= 40) {
          Alert.alert("You successfully captured a second Assassin's Hideout!")
          setCapture3(true)
          setCaptures(captures + 1)
      } else {
          Alert.alert('You tried too attack with too little power and lost 15% of your armys strength')
          setAttack(attack - attack/6.667)
          setDefense(defense -defense/6.667)
      }
  };
  const handleCapture4 = () => {
      if ( power >= 50) {
          Alert.alert('You successfully captured a Assassin Watchtower!')
          setCapture4(true)
          setCaptures(captures + 1)
      } else {
          Alert.alert('You tried too attack with too little power and lost 20% of your armys strength')
          setAttack(attack - attack/5)
          setDefense(defense -defense/5)
      }
  };
  const handleCapture5 = () => {
      if ( power >= 75) {
          Alert.alert('You Lost 25 attack in this victory!')
          setCapture5(true)
          setCaptures(captures + 1)
          setAttack(attack - 25)
      } else {
          Alert.alert('You tried too attack with too little power and lost 20% of your armys strength')
          setAttack(attack - attack/4)
          setDefense(defense -defense/4)
      }
  };
  const handleCapture6 = () => {
      if ( power >= 100) {
          Alert.alert('You successfully captured a Assassin outpost!')
          setCapture6(true)
          setCaptures(captures + 1)
      } else {
          Alert.alert('You tried too attack with too little power and lost 25% of your armys strength')
          setAttack(attack - attack/4)
          setDefense(defense -defense/4)
      }
  };
  const handleCapture7 = () => {
      if ( power >= 125) {
          Alert.alert('You successfully captured a second Assassin outpost!')
          setCapture7(true)
          setCaptures(captures + 1)
      } else {
          Alert.alert('You tried too attack with too little power and lost 25% of your armys strength')
          setAttack(attack - attack/4)
          setDefense(defense -defense/4)
      }
  };
  const handleCapture8 = () => {
      if ( power >= 150) {
          Alert.alert('You lost 1 troop and 10 defense in the capture of a assassin town!')
          setCapture8(true)
          setCaptures(captures + 1)
          setTroops(troops - 1)
          setDefense(defense - 10)
      } else {
          Alert.alert('You tried too attack with too little power and lost 25% of your armys strength')
          setAttack(attack - attack/4)
          setDefense(defense -defense/4)
      }
  };
  const handleCapture9 = () => {
      if ( power >= 200) {
          Alert.alert('You successfully captured a second Assassin town!')
          setCapture9(true)
          setCaptures(captures + 1)
      } else {
          Alert.alert('You tried too attack with too little power and lost 25% of your armys strength')
          setAttack(attack - attack/4)
          setDefense(defense -defense/4)
      }
  };
  const handleCapture10 = () => {
      if ( power >= 250) {
          Alert.alert('You lost 2 troops in the victory for this Assassin city!')
          setCapture10(true)
          setCaptures(captures + 1)
          setTroops( troops - 2)
      } else {
          Alert.alert('You tried too attack with too little power and lost 25% of your armys strength')
          setAttack(attack - attack/4)
          setDefense(defense -defense/4)
      }
  };
  const handleCapture11 = () => {
      if ( power >= 500) {
          Alert.alert('The attack of the Assassins base made you lose 2 troops and 100 defense!')
          setCapture11(true)
          setCaptures(captures + 1)
      } else {
          Alert.alert('You tried too attack with too little power and lost 50% of your armys strength')
          setAttack(attack/2)
          setDefense(defense/2)
      }
  };
  const handleCapture12 = () => {
      if ( power >= 1000) {
          Alert.alert('You successfully captured The assassins Guild!')
          setCapture12(true)
          setCaptures(captures + 1)
      } else {
          Alert.alert('You tried too attack with too little power and lost ALL of your army')
          setTroops(1)
          setAttack(0)
          setDefense(0)
      }
  };
    useEffect(() => {
      if (captures == 12) {
          setWin(true)
          Alert.alert('You conqured all the assassins now become the strongest knight!')
      }
  }, [captures])
    const userValues = {
      username,
      character,
      setUsername,
      setCharacter,

      capture1,
      capture2,
      capture3,
      capture4,
      capture5,
      capture6,
      capture7,
      capture8,
      capture9,
      capture10,
      capture11,
      capture12,
    
      setCapture1,
      setCapture2,
      setCapture3,
      setCapture4,
      setCapture5,
      setCapture6,
      setCapture7,
      setCapture8,
      setCapture9,
      setCapture10,
      setCapture11,
      setCapture12,
    
      captures,
      setCaptures,
    
      win,
      setWin,

      handleCapture1,
      handleCapture2,
      handleCapture3,
      handleCapture4,
      handleCapture5,
      handleCapture6,
      handleCapture7,
      handleCapture8,
      handleCapture9,
      handleCapture10,
      handleCapture11,
      handleCapture12,
    }

    // Transmutator context
      // Transmutator context states
    const [ darkSteel, setDarkSteel ] = useState(0);
    const [ attack, setAttack ] = useState(0);
    const [ defense, setDefense ] = useState(0);
    const [ troops, setTroops ] = useState(1);
    const [power, setPower] = useState(0);

      // Transmutator context functions
        // conversion UPGS below
      function convert1() {
        if (count >= 100) {
          setCount(count - 100)
          setDarkSteel(darkSteel + 1)
        }
      }

      function convert2() {
        if (count >= 1000) {
          setCount(count - 1000)
          setDarkSteel(darkSteel + 10)
        }
      }

      function convert3() {
        if (count >= 10000) {
          setCount(count - 10000)
          setDarkSteel(darkSteel + 100)
        }
      }

      function convert4() {
        if (count >= 50000) {
          setCount(count - 50000)
          setDarkSteel(darkSteel + 500)
        }
      }

      function convert5() {
        if (count >= 100000) {
          setCount(count - 100000)
          setDarkSteel(darkSteel + 1000)
        }
      }
        // power UPGS below
      function smallAttackUPG() {
        if (darkSteel >= 50) {
          setDarkSteel(darkSteel - 50)
          setAttack(attack + 1)
        }
      }

      function bigAttackUPG() {
        if (darkSteel >= 500) {
          setDarkSteel(darkSteel - 500)
          setAttack(attack + 12)
        }
      }

      function smallDefenseUPG() {
        if (darkSteel >= 50) {
          setDarkSteel(darkSteel - 50)
          setDefense(defense + 1)
        }
      }

      function bigDefenseUPG() {
        if (darkSteel >= 500) {
          setDarkSteel(darkSteel - 500)
          setDefense(defense + 12)
        }
      }

      function troopUPG() {
        if (darkSteel >= 1000) {
          setDarkSteel(darkSteel - 1000)
          setTroops(troops + 1)
        }
      }
      //   // misc functions
      useEffect(() => {
        setPower(chain(attack).add(defense).multiply(troops).done())
      },[attack, defense, troops, darkSteel])

      // transmutator context values
    const transmutatorValues = {
      darkSteel,
      attack,
      defense,
      troops,
      power,
      setDarkSteel,
      setAttack,
      setDefense,
      setTroops,
      setPower,
      convert1,
      convert2,
      convert3,
      convert4,
      convert5,
      smallAttackUPG,
      bigAttackUPG,
      smallDefenseUPG,
      bigDefenseUPG,
      troopUPG,
    }
  // all needed functions and other items :

  const auth = FIREBASE_AUTH; // to use firebase authentication

  const [ user, setUser ] = useState<User | null>(null)
  const getData = async () => { // grabs users data and then saves it to context
    const getCount = await getDoc <any, string | any > (doc(FIREBASE_DB, 'count', auth.currentUser?.email)).then((doc) => { // doc is defined here as it can only be accessed when user auth is defined
      console.log('Data retrived at (/_layout) ' + doc.data())
      // gets count
      if (doc.data().count >= 0) {
        setCount(doc.data().count) // adds user count to count context
        console.log('Has Count Data ' + doc.data().count)
      } else {
        setCount(0)
        console.log('No Count Data Found ' + doc.data().count )
      }
      // gets multipler 
      if (doc.data().multiplier >= 1) {
        setMultiplier(doc.data().multiplier) // adds user count to count context
        console.log('Has Multiplier Data ' + doc.data().multiplier)
      } else {
        setMultiplier(1)
        console.log('No Multiplier Data ' + doc.data().multiplier )
      }
      // gets autoclicker value
      if (doc.data().autoClickerValue >= 0) {
        setAutoClickerValue(doc.data().autoClickerValue) // adds user count to count context
        console.log('Has AutoClickerValue Data ' + doc.data().autoClickerValue)
      } else {
        setAutoClickerValue(0)
        console.log('No AutoClickerValue Data ' + doc.data().autoClickerValue )
      }
      // gets darksteel 
      if (doc.data().DarkSteel >= 0) {
        setDarkSteel(doc.data().DarkSteel) // adds user count to count context
        console.log('Has DarkSteel Data ' + doc.data().DarkSteel)
      } else {
        setDarkSteel(0)
        console.log('No DarkSteel Data ' + doc.data().DarkSteel )
      }
      // gets attack
      if (doc.data().Attack >= 0) {
        setAttack(doc.data().Attack) // adds user count to count context
        console.log('Has Attack Data ' + doc.data().Attack)
      } else {
        setAttack(0)
        console.log('No Attack Data ' + doc.data().Attack )
      }
      // gets defense
      if (doc.data().Defense >= 0) {
        setDefense(doc.data().Defense) // adds user count to count context
        console.log('Has Defense Data ' + doc.data().Defense)
      } else {
        setDefense(0)
        console.log('No Defense Data ' + doc.data().Defense )
      }
      // gets troops
      if (doc.data().Troops >= 0) {
        setTroops(doc.data().Troops) // adds user count to count context
        console.log('Has Troops Data ' + doc.data().Troops)
      } else {
        setTroops(0)
        console.log('No Troops Data ' + doc.data().Troops )
      }
      // gets power
      if (doc.data().Power >= 0) {
        setPower(doc.data().Power)
        console.log('Has Power Data ' + doc.data().Power)
      } else {
        setPower(0)
        console.log('No Power Data ' + doc.data().Power )
      }
      // gets username
      let time = setTimeout(() => {
        setUsername(doc.data().Username)
        console.log('Got Username ' + username)
      }, 250)
      // gets character
      let time2 = setTimeout(() => {
        setCharacter(doc.data().Character)
        console.log('Character ' + doc.data().Character)
      }, 250)
      // gets captures
      if (doc.data().Captures >= 0) {
        setCaptures(doc.data().Captures)
        console.log('Has Captures Data ' + doc.data().Captures)
        if (doc.data().Captures >= 1) { // this will set the players captures based on their capture data to keep everything saved and up to date
          setCapture1(true)
        }
        if (doc.data().Captures >= 2) {
          setCapture2(true)
        }
        if (doc.data().Captures >= 3) {
          setCapture3(true)
        }
        if (doc.data().Captures >= 4) {
          setCapture4(true)
        }
        if (doc.data().Captures >= 5) {
          setCapture5(true)
        }
        if (doc.data().Captures >= 6) {
          setCapture6(true)
        }
        if (doc.data().Captures >= 7) {
          setCapture7(true)
        }
        if (doc.data().Captures >= 8) {
          setCapture8(true)
        }
        if (doc.data().Captures >= 9) {
          setCapture9(true)
        }
        if (doc.data().Captures >= 10) {
          setCapture10(true)
        }
        if (doc.data().Captures >= 11) {
          setCapture11(true)
        }
        if (doc.data().Captures >= 12) {
          setCapture12(true)
        }
      } else {
        setCaptures(0)
        console.log('No Captures Data ' + doc.data().Captures )
      }
    })
  }

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user' + user);
      setUser(user);
      if (user) {
        router.replace('/Username')
        console.log('Getting Data...')
        getData(); // gets data when user is defined to not grab non existant data 
        console.log('Got Data for ' + auth.currentUser?.email)
      }
    });
  }, [])
  

  return (
    <UserContext.Provider value={userValues}>
      <CountContext.Provider value={countValues}>
        <TransmutatorContext.Provider value={transmutatorValues}>
          <Stack>
              <Stack.Screen name='index' options={{ headerShown: false}} />
              <Stack.Screen name='Username' options={{ headerShown: false, presentation: 'modal'}}/>
              <Stack.Screen name='(drawer)' options={{ headerShown: false,}}/>
              <Stack.Screen name='Info' options={{ presentation: 'transparentModal', headerShown: false,}}/>
              <Stack.Screen name='CharChoice' options={{ headerShown: true}}/>
              <Stack.Screen name='Assassin' options={{ headerShown: true}} />
              <Stack.Screen name='Knight' options={{ headerShown: true}} />
          </Stack>
        </TransmutatorContext.Provider>
      </CountContext.Provider>
    </UserContext.Provider>
  );
}


