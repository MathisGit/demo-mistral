import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AddIcon from '@mui/icons-material/Add';
import IosShareIcon from '@mui/icons-material/IosShare';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import jsPDF from 'jspdf';


export default function Home() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [displayingMessage, setDisplayingMessage] = useState(false);
  const resetApp = () => {
    setMessages([]);
    setIsLoading(false);
    setCurrentMessage('');
    setDisplayingMessage(false);
  };
  
  useEffect(() => {
    fetch('/waiting.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);
  const buttonStyle = {
    height: '40px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '14px',
  };
  
  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
      .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italic
      .replace(/\n/g, '<br>') // Line breaks
      .replace(/^(\d+)\.\s(.*)/gm, '<div style="margin-left: 20px;"><b>$1.</b> $2</div>') // Numbered lists
      .replace(/^- (.*)/gm, '<div style="margin-left: 20px;">• $1</div>') // Bulleted lists
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: #007BFF;">$1</a>'); // Links
  };
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const toggleConfirmationPopup = () => setIsConfirmationOpen((prev) => !prev);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const showConfirmationPopup = () => {
    setIsConfirmationVisible(true);
    setTimeout(() => setIsConfirmationVisible(false), 1000); // Cache la popup après 1 seconde
  };
  
  const displayMessage = (message) => {
    setDisplayingMessage(true);
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: '' },
    ]);
    setCurrentMessage('');
    let index = -1;
  
    const interval = setInterval(() => {
      setCurrentMessage((prev) => prev + message[index]);
      index++;
  
      if (index >= message.length) {
        clearInterval(interval);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: message },
        ]);
        // erase every empty message
        setMessages((prev) => prev.filter((msg) => msg.content !== ''));
        setDisplayingMessage(false);
        scrollToBottom();
      }
    }, 10); // Ajustez la vitesse en millisecondes (ici 50ms par lettre)
  };  

  const copyChatToClipboard = () => {
    if (!messages || messages.length === 0) {
      alert('Aucun message à copier.');
      return;
    }
  
    const text = messages
      .map(msg => `${msg.role === 'user' ? 'Vous' : 'Le Chien'} : ${msg.content}`)
      .join('\n');
    navigator.clipboard.writeText(text)
      .then(() => showConfirmationPopup())
      .catch(() => alert('Erreur lors de la copie dans le presse-papiers.'));
  };
  
  const sendMessage = async (input) => {
    if (!input) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setIsLoading(true);
    

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      displayMessage(data.reply);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Erreur : impossible de joindre le bot.' },
      ]);
      console.error(error);
    }
    scrollToBottom();
    setIsLoading(false);

  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '8px', backgroundColor: '#FAFAFA' }}>
      <div style={{ display:'flex', flexDirection:'row', padding: '20px 40px', backgroundColor: '#fff', color: '#fff', borderRadius: '4px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
          <div style={{ position: 'relative', height: '100%', aspectRatio: '1/1', cursor: 'pointer' }} onClick={resetApp} onMouseEnter={(e) => e.currentTarget.querySelector('span').style.visibility = 'visible'} onMouseLeave={(e) => e.currentTarget.querySelector('span').style.visibility = 'hidden'}>
            <CollectionsBookmarkIcon style={{ color: "#A1A1AA" }} />
            <span style={{ position: 'absolute', width:'120px', top: '150%', left: '120%', transform: 'translateX(-50%)', backgroundColor: '#fff', color: '#000', padding: '8px 8px', borderRadius: '4px', fontSize: '16px', visibility: 'hidden', opacity: 1,border: '1px solid #ddd',borderRadius: '5px',boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)', textAlign:'center' }}>Bientôt...</span>
          </div>
          <div style={{ position: 'relative', height: '100%', aspectRatio: '1/1', cursor: 'pointer' }} onClick={resetApp} onMouseEnter={(e) => e.currentTarget.querySelector('span').style.visibility = 'visible'} onMouseLeave={(e) => e.currentTarget.querySelector('span').style.visibility = 'hidden'}>
            <AddIcon style={{ color: "#A1A1AA" }} />
            <span style={{ position: 'absolute', width:'150px', top: '150%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', color: '#000', padding: '8px 8px', borderRadius: '4px', fontSize: '16px', visibility: 'hidden', opacity: 1,border: '1px solid #ddd',borderRadius: '5px',boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)', textAlign:'center' }}>Parler d'autre chose</span>
          </div>
        </div>
        <div style={{ position: 'relative', height: '100%', aspectRatio: '1/1', cursor: 'pointer' }}>
          <IosShareIcon
            style={{ color: "#A1A1AA", cursor: 'pointer' }}
            onClick={copyChatToClipboard}
          />

          {/* Popup de confirmation */}
          {isConfirmationVisible && (
            <span style={{ position: 'absolute', width:'120px', top: '150%', left: '-80%', transform: 'translateX(-50%)', backgroundColor: '#fff', color: '#000', padding: '8px 8px', borderRadius: '4px', fontSize: '16px', opacity: 1,border: '1px solid #ddd',borderRadius: '5px',boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)', textAlign:'center' }}>Conversation copiée !</span>
          )}
        </div>

      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <div style={{ width: '100%', height:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 200px)',
              paddingBottom: '20px',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}
            className="custom-scrollbar"
          >
            {messages.length === 0 ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img src="/home.png" alt="Home" style={{ width: '360px', height: '100px' }} />
              </div>
            ) : (
            <div style={{display: 'flex', width: '60%', flexDirection: 'column', gap: '40px', paddingLeft: '20px'}}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{display: 'flex', gap: '10px'}}
                >
                  <div style={{width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {message.role === 'user' ? 
                      <div style={{width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden'}}>
                        <img src={'/user.png'} alt="Avatar" style={{width:'100%', height:'100%'}} />
                      </div>
                    : 
                      <div style={{width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={'/dog.png'} alt="Avatar" style={{width:'80%', height:'75%'}} />
                      </div>
                    }
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      borderRadius: '15px',
                      padding: '0px 15px',
                      fontSize: '18px',
                      letterSpacing: '0.2px',
                      lineHeight: '30px',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(index === messages.length - 1 && displayingMessage ? currentMessage : message.content),
                    }}
                  ></span>
                </div>
              ))}
              {isLoading && animationData && (
                <div
                  style={{display: 'flex', gap: '10px'}}
                >
                  <div style={{width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <img src={'/dog.png'} alt="Avatar" style={{width:'80%', height:'75%'}} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Lottie
                      loop
                      animationData={animationData}
                      play
                      style={{ width: 40, height: 40, marginLeft: 5 }}
                    />
                  </div>
                </div>
              )}


              <div ref={messagesEndRef} />
            </div>)}
          </div>
          <div style={{height:'80px',display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginBottom: '20px'}}>
            <div style={{height:'60%', width:'60%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
              <div
                style={{
                  display: 'flex',
                  padding: '10px',
                  backgroundColor: '#fff',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <input
                  type="text"
                  placeholder="Demander au Chien..."
                  disabled={displayingMessage || isLoading}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    color: '#000',
                  cursor: displayingMessage || isLoading ? 'not-allowed' : 'pointer',

                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  style={{
                    width: '50px',
                    height: '50px',
                    padding: '12px 8px 10px 10px',
                    marginLeft: '10px',
                    color: displayingMessage || isLoading ? '#ccc' : '#8acdfc',
                    backgroundColor: displayingMessage || isLoading ? '#f0f0f0' : 'rgb(242, 249, 255)',
                    border: `1px solid ${displayingMessage || isLoading ? '#ccc' : '#8acdfc'}`,
                    borderRadius: '4px',
                    cursor: displayingMessage || isLoading ? 'not-allowed' : 'pointer',
                  }}
                  disabled={displayingMessage || isLoading}
                  onClick={() => {
                    const inputField = document.querySelector('input');
                    sendMessage(inputField.value);
                    inputField.value = '';
                  }}
                >
                  <ArrowForwardIcon />
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
