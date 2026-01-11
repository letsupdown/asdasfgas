// SENİN FIREBASE BİLGİLERİN: Bu bölümü bir sonraki adımda alacağın bilgilerle değiştir.
const firebaseConfig = {
  apiKey: "AIzaSyBxnoCoDvvOKDmnO6xgr9u5uI6hT2hY1q4",
  authDomain: "anonimchat-c6726.firebaseapp.com",
  projectId: "anonimchat-c6726",
  storageBucket: "anonimchat-c6726.firebasestorage.app",
  messagingSenderId: "1014845888268",
  appId: "1:1014845888268:web:073ef1a4246b4225825b29",
  measurementId: "G-CL9QWZTWLB"
};


// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// HTML elementlerini seç
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const output = document.getElementById('output');

// "Gönder" butonuna tıklandığında mesajı veritabanına kaydet
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() === '') return; // Boş mesaj gönderme

    // Mesajı veritabanına "messages" altına yeni bir anahtarla ekle
    database.ref('messages').push().set({
        text: message
    });

    messageInput.value = ''; // Mesaj kutusunu temizle
});

// Veritabanına yeni bir mesaj eklendiğinde bunu ekranda göster
database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('p');
    messageElement.innerText = message.text;
    output.appendChild(messageElement);

    // Yeni mesaj geldiğinde sohbet penceresini en alta kaydır
    document.getElementById('chat-window').scrollTop = output.scrollHeight;
});
