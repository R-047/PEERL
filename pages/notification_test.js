import React, {useEffect} from 'react'
// import wp from 'web-push';


function NotificationTest() {

  useEffect(() => {
    const InitWorker = async () => {
        // let sw = await navigator.serviceWorker.register('/sw.js')
        // console.log(sw)
        console.log('Registering service worker');
        const registration = await navigator.serviceWorker.register('/sw.js', {scope: '/'});
        console.log('Registered service worker');
      
        console.log('Registering push');
        const subscription = await registration.pushManager.
          subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BARBX6QEn2bbHLOtRLNSreDlHNRH7XqkDB2oJ4Kwrxz_Clbq1jlteQigCN6VP7p0sg1mXmywHDTYfirxWN9gIR0')
          });

        console.log(subscription)
    }
    InitWorker()
  }, [])
  

  const subscribe = async (e) => {
      let sw = await navigator.serviceWorker.ready;
      console.log(sw)
      let push = await sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('BARBX6QEn2bbHLOtRLNSreDlHNRH7XqkDB2oJ4Kwrxz_Clbq1jlteQigCN6VP7p0sg1mXmywHDTYfirxWN9gIR0')
      })
      //send this to api and store in DB, we ll have lots of this 
      console.log(push)
  }

  return (
    <div>NotificationTest
        <button onClick={subscribe}>send notification</button>
    </div>
    
  )
}


function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  console.log(outputArray)
  return outputArray;
}

export default NotificationTest