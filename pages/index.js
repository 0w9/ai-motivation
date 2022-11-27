import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import { Modal, Text } from '@nextui-org/react';

const Home = () => {

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const modalCloseHandler = () => {
    setModalOpened(false)
  }

  const [apiOutput, setApiOutput] = useState('')
  const [apiTLDR, setApiTLDR] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [userInput, setUserInput] = useState('');
  const [modelOpened, setModalOpened] = useState(false);
  

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();

    console.log("OpenAI replied...", data.tldr.text)
  
    setApiOutput(`${data.output.text}`);
    setApiTLDR(`${data.tldr.text}`)
    setIsGenerating(false);
    setModalOpened(true)
  }


  return (
    <>
    
    <Modal
      closeButton
      open={modelOpened}
      onClose={modalCloseHandler}

      css={{
        backgroundColor: "rgb(0, 0, 0)",
        color: "White" 
      }}
    >
      <Modal.Header>
        <Text h3 css={{
          color: "White" 
        }}>
          Your advice
        </Text>
      </Modal.Header>

      <Modal.Body>
        <Text h3 css={{
          color: "White" 
        }}>
          What to do?
        </Text>
        <Text p css={{
          color: "White" 
        }}>
          {apiTLDR}
        </Text>

        <Text h3 css={{
          color: "White" 
        }}>
          More details
        </Text>

        <Text p css={{
          color: "White" 
        }}>
          {apiOutput}
        </Text>
      </Modal.Body>
    </Modal>
    <div className="root">
        <div className="container">
          <div className="header">
            <div className="header-title">
              <h1>Having a tough day?</h1>
            </div>
            <div className="header-subtitle">
              <h2>Get instant advice from AI. Feel free to write down what's going through your mind right now, or what happened last month when you had stress with your friends. We don't store any data nor show it to anons.</h2>
            </div>
          </div>
          <div className="prompt-container">
            <textarea
              placeholder="Last week I failed my class test. I'm scared that i will never make it..."
              className="prompt-box"
              value={userInput}
              onChange={onUserChangedText} />
          </div>

          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>

        </div>
        <div className="badge-container grow">
          <a
            href="https://buildspace.so/builds/ai-writer"
            target="_blank"
            rel="noreferrer"
          >
            <div className="badge">
              <Image src={buildspaceLogo} alt="buildspace logo" />
              <p>build with buildspace</p>
            </div>
          </a>
        </div>
      </div></>
  );
};

export default Home; 
