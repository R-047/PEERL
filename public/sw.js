console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "new resource posted check it out",
    icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fnotification%2Bicon&psig=AOvVaw1XEMGrBa8eZc2qjtXuFkXi&ust=1652766115054000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiZ2tyn4_cCFQAAAAAdAAAAABAD"
  });
});

//title: hey user_name, user_name has uploaded a new resource, check it out!!
//body: resource title, room name
//icon: peerl